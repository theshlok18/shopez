package com.shopez.service;

import com.shopez.dto.CartItemRequest;
import com.shopez.dto.CartItemResponse;
import com.shopez.dto.CartResponse;
import com.shopez.entity.Cart;
import com.shopez.entity.CartItem;
import com.shopez.entity.Product;
import com.shopez.entity.User;
import com.shopez.exception.BadRequestException;
import com.shopez.exception.ResourceNotFoundException;
import com.shopez.repository.CartItemRepository;
import com.shopez.repository.CartRepository;
import com.shopez.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {
    
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    
    public CartResponse getCart(User user) {
        Cart cart = getOrCreateCart(user);
        return mapToResponse(cart);
    }
    
    @Transactional
    public CartResponse addToCart(User user, CartItemRequest request) {
        Cart cart = getOrCreateCart(user);
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        
        if (product.getStock() < request.getQuantity()) {
            throw new BadRequestException("Insufficient stock");
        }
        
        CartItem existingItem = cartItemRepository.findByCartAndProduct(cart, product).orElse(null);
        
        if (existingItem != null) {
            int newQuantity = existingItem.getQuantity() + request.getQuantity();
            if (product.getStock() < newQuantity) {
                throw new BadRequestException("Insufficient stock");
            }
            existingItem.setQuantity(newQuantity);
            cartItemRepository.save(existingItem);
        } else {
            CartItem cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(request.getQuantity());
            cart.getItems().add(cartItem);
            cartItemRepository.save(cartItem);
        }
        
        return mapToResponse(cart);
    }
    
    @Transactional
    public CartResponse updateCartItem(User user, Long itemId, Integer quantity) {
        Cart cart = getOrCreateCart(user);
        CartItem cartItem = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));
        
        if (!cartItem.getCart().getId().equals(cart.getId())) {
            throw new BadRequestException("Cart item does not belong to user");
        }
        
        if (quantity <= 0) {
            cartItemRepository.delete(cartItem);
        } else {
            if (cartItem.getProduct().getStock() < quantity) {
                throw new BadRequestException("Insufficient stock");
            }
            cartItem.setQuantity(quantity);
            cartItemRepository.save(cartItem);
        }
        
        return mapToResponse(cart);
    }
    
    @Transactional
    public CartResponse removeFromCart(User user, Long itemId) {
        Cart cart = getOrCreateCart(user);
        CartItem cartItem = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));
        
        if (!cartItem.getCart().getId().equals(cart.getId())) {
            throw new BadRequestException("Cart item does not belong to user");
        }
        
        cartItemRepository.delete(cartItem);
        return mapToResponse(cart);
    }
    
    @Transactional
    public void clearCart(User user) {
        Cart cart = getOrCreateCart(user);
        cart.getItems().clear();
        cartRepository.save(cart);
    }
    
    private Cart getOrCreateCart(User user) {
        return cartRepository.findByUser(user).orElseGet(() -> {
            Cart cart = new Cart();
            cart.setUser(user);
            return cartRepository.save(cart);
        });
    }
    
    private CartResponse mapToResponse(Cart cart) {
        List<CartItemResponse> items = cart.getItems().stream()
                .map(this::mapItemToResponse)
                .collect(Collectors.toList());
        
        BigDecimal totalAmount = items.stream()
                .map(CartItemResponse::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        Integer totalItems = items.stream()
                .map(CartItemResponse::getQuantity)
                .reduce(0, Integer::sum);
        
        CartResponse response = new CartResponse();
        response.setId(cart.getId());
        response.setItems(items);
        response.setTotalAmount(totalAmount);
        response.setTotalItems(totalItems);
        return response;
    }
    
    private CartItemResponse mapItemToResponse(CartItem item) {
        CartItemResponse response = new CartItemResponse();
        response.setId(item.getId());
        response.setProductId(item.getProduct().getId());
        response.setProductName(item.getProduct().getName());
        response.setProductImage(item.getProduct().getImageUrl());
        response.setPrice(item.getProduct().getPrice());
        response.setQuantity(item.getQuantity());
        response.setSubtotal(item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        response.setAvailableStock(item.getProduct().getStock());
        return response;
    }
}
