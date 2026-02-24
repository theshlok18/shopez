package com.shopez.controller;

import com.shopez.dto.ApiResponse;
import com.shopez.dto.DashboardStats;
import com.shopez.dto.ProductRequest;
import com.shopez.dto.ProductResponse;
import com.shopez.service.AdminService;
import com.shopez.service.OrderService;
import com.shopez.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    
    private final ProductService productService;
    private final OrderService orderService;
    private final AdminService adminService;
    
    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse> getDashboardStats() {
        DashboardStats stats = adminService.getDashboardStats();
        return ResponseEntity.ok(new ApiResponse(true, "Dashboard stats retrieved", stats));
    }
    
    @PostMapping("/products")
    public ResponseEntity<ApiResponse> createProduct(@Valid @RequestBody ProductRequest request) {
        ProductResponse product = productService.createProduct(request);
        return ResponseEntity.ok(new ApiResponse(true, "Product created", product));
    }
    
    @PutMapping("/products/{id}")
    public ResponseEntity<ApiResponse> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequest request
    ) {
        ProductResponse product = productService.updateProduct(id, request);
        return ResponseEntity.ok(new ApiResponse(true, "Product updated", product));
    }
    
    @DeleteMapping("/products/{id}")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(new ApiResponse(true, "Product deleted"));
    }
    
    @PutMapping("/orders/{orderId}/status")
    public ResponseEntity<ApiResponse> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestParam String status
    ) {
        orderService.updateOrderStatus(orderId, status);
        return ResponseEntity.ok(new ApiResponse(true, "Order status updated"));
    }
}
