package com.shopez.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CheckoutRequest {
    
    @NotBlank(message = "Shipping address is required")
    private String shippingAddress;
    
    @NotBlank(message = "Phone is required")
    private String phone;
    
    @NotBlank(message = "Payment method is required")
    private String paymentMethod;
}
