package com.shopez.repository;

import com.shopez.entity.Order;
import com.shopez.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Page<Order> findByUserOrderByCreatedAtDesc(User user, Pageable pageable);
    List<Order> findByUserOrderByCreatedAtDesc(User user);
    
    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.status != 'CANCELLED'")
    BigDecimal getTotalRevenue();
    
    @Query("SELECT MONTH(o.createdAt) as month, SUM(o.totalAmount) as revenue " +
           "FROM Order o WHERE YEAR(o.createdAt) = YEAR(CURRENT_DATE) " +
           "AND o.status != 'CANCELLED' " +
           "GROUP BY MONTH(o.createdAt) ORDER BY month")
    List<Object[]> getMonthlyRevenue();
}
