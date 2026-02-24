package com.shopez.service;

import com.shopez.dto.*;
import com.shopez.entity.RefreshToken;
import com.shopez.entity.Role;
import com.shopez.entity.User;
import com.shopez.exception.BadRequestException;
import com.shopez.exception.ResourceNotFoundException;
import com.shopez.repository.RefreshTokenRepository;
import com.shopez.repository.RoleRepository;
import com.shopez.repository.UserRepository;
import com.shopez.security.JwtTokenProvider;
import com.shopez.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    
    @Value("${jwt.refresh-token-expiration}")
    private long refreshTokenExpiration;
    
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already exists");
        }
        
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        
        Role userRole = roleRepository.findByName(Role.RoleName.ROLE_USER)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));
        user.setRoles(new HashSet<>(Set.of(userRole)));
        
        User savedUser = userRepository.save(user);
        
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                UserPrincipal.create(savedUser), null, UserPrincipal.create(savedUser).getAuthorities());
        
        String accessToken = tokenProvider.generateAccessToken(authentication);
        String refreshToken = createRefreshToken(savedUser);
        
        return buildAuthResponse(savedUser, accessToken, refreshToken);
    }
    
    @Transactional
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        String accessToken = tokenProvider.generateAccessToken(authentication);
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        String refreshToken = createRefreshToken(user);
        
        return buildAuthResponse(user, accessToken, refreshToken);
    }
    
    @Transactional
    public AuthResponse refreshToken(RefreshTokenRequest request) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(request.getRefreshToken())
                .orElseThrow(() -> new BadRequestException("Invalid refresh token"));
        
        if (refreshToken.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(refreshToken);
            throw new BadRequestException("Refresh token expired");
        }
        
        User user = refreshToken.getUser();
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                UserPrincipal.create(user), null, UserPrincipal.create(user).getAuthorities());
        
        String newAccessToken = tokenProvider.generateAccessToken(authentication);
        
        return buildAuthResponse(user, newAccessToken, refreshToken.getToken());
    }
    
    private String createRefreshToken(User user) {
        // Delete existing refresh token for this user if any
        refreshTokenRepository.deleteByUser(user);
        refreshTokenRepository.flush();
        
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(user);
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenExpiration));
        
        RefreshToken savedToken = refreshTokenRepository.save(refreshToken);
        return savedToken.getToken();
    }
    
    private AuthResponse buildAuthResponse(User user, String accessToken, String refreshToken) {
        Set<String> roles = user.getRoles().stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toSet());
        
        return new AuthResponse(accessToken, refreshToken, user.getId(), 
                user.getEmail(), user.getFullName(), roles);
    }
}
