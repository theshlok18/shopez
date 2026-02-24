package com.shopez.controller;

import com.shopez.dto.ApiResponse;
import com.shopez.dto.CartItemRequest;
import com.shopez.dto.CartResponse;
import com.shopez.entity.User;
import com.shopez.repository.UserRepository;
import com.shopez.security.UserPrincipal;
import com.shopez.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {
    
    private final CartService cartService;
    private final UserRepository userRepository;
    
    @GetMapping
    public ResponseEntity<ApiResponse> getCart(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        User user = userRepository.findById(userPrincipal.getId()).orElseThrow();
        CartResponse cart = cartService.getCart(user);
        return ResponseEntity.ok(new ApiResponse(true, "Cart retrieved", cart));
    }
    
    @PostMapping("/items")
    public ResponseEntity<ApiResponse> addToCart(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody CartItemRequest request
    ) {
        User user = userRepository.findById(userPrincipal.getId()).orElseThrow();
        CartResponse cart = cartService.addToCart(user, request);
        return ResponseEntity.ok(new ApiResponse(true, "Item added to cart", cart));
    }
    
    @PutMapping("/items/{itemId}")
    public ResponseEntity<ApiResponse> updateCartItem(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long itemId,
            @RequestParam Integer quantity
    ) {
        User user = userRepository.findById(userPrincipal.getId()).orElseThrow();
        CartResponse cart = cartService.updateCartItem(user, itemId, quantity);
        return ResponseEntity.ok(new ApiResponse(true, "Cart updated", cart));
    }
    
    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<ApiResponse> removeFromCart(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long itemId
    ) {
        User user = userRepository.findById(userPrincipal.getId()).orElseThrow();
        CartResponse cart = cartService.removeFromCart(user, itemId);
        return ResponseEntity.ok(new ApiResponse(true, "Item removed", cart));
    }
}
