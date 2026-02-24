package com.shopez.controller;

import com.shopez.dto.ApiResponse;
import com.shopez.dto.CheckoutRequest;
import com.shopez.dto.OrderResponse;
import com.shopez.entity.User;
import com.shopez.repository.UserRepository;
import com.shopez.security.UserPrincipal;
import com.shopez.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    
    private final OrderService orderService;
    private final UserRepository userRepository;
    
    @PostMapping("/checkout")
    public ResponseEntity<ApiResponse> checkout(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody CheckoutRequest request
    ) {
        User user = userRepository.findById(userPrincipal.getId()).orElseThrow();
        OrderResponse order = orderService.checkout(user, request);
        return ResponseEntity.ok(new ApiResponse(true, "Order placed successfully", order));
    }
    
    @GetMapping
    public ResponseEntity<ApiResponse> getUserOrders(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        User user = userRepository.findById(userPrincipal.getId()).orElseThrow();
        Pageable pageable = PageRequest.of(page, size);
        Page<OrderResponse> orders = orderService.getUserOrders(user, pageable);
        return ResponseEntity.ok(new ApiResponse(true, "Orders retrieved", orders));
    }
    
    @GetMapping("/{orderId}")
    public ResponseEntity<ApiResponse> getOrderById(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long orderId
    ) {
        User user = userRepository.findById(userPrincipal.getId()).orElseThrow();
        OrderResponse order = orderService.getOrderById(user, orderId);
        return ResponseEntity.ok(new ApiResponse(true, "Order retrieved", order));
    }
}
