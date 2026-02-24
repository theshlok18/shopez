package com.shopez.service;

import com.shopez.dto.DashboardStats;
import com.shopez.repository.OrderRepository;
import com.shopez.repository.ProductRepository;
import com.shopez.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {
    
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    
    public DashboardStats getDashboardStats() {
        Long totalUsers = userRepository.count();
        Long totalProducts = productRepository.count();
        Long totalOrders = orderRepository.count();
        BigDecimal totalRevenue = orderRepository.getTotalRevenue();
        
        if (totalRevenue == null) {
            totalRevenue = BigDecimal.ZERO;
        }
        
        List<Object[]> monthlyData = orderRepository.getMonthlyRevenue();
        List<DashboardStats.MonthlyRevenue> monthlyRevenue = monthlyData.stream()
                .map(data -> new DashboardStats.MonthlyRevenue(
                        (Integer) data[0],
                        (BigDecimal) data[1]
                ))
                .collect(Collectors.toList());
        
        return new DashboardStats(totalUsers, totalProducts, totalOrders, totalRevenue, monthlyRevenue);
    }
}
