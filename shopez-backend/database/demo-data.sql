USE shopez_db;

-- Insert roles
INSERT INTO roles (name) VALUES ('ROLE_USER'), ('ROLE_ADMIN');

-- Insert users (password: password123)
INSERT INTO users (email, password, full_name, phone, address) VALUES
('admin@shopez.com', '$2a$10$xqKhLz3jqVqKqKqKqKqKqOqKqKqKqKqKqKqKqKqKqKqKqKqKqKqKq', 'Admin User', '555-0100', '123 Admin St, New York, NY 10001'),
('sarah.admin@shopez.com', '$2a$10$xqKhLz3jqVqKqKqKqKqKqOqKqKqKqKqKqKqKqKqKqKqKqKqKqKqKq', 'Sarah Johnson', '555-0101', '456 Management Ave, Los Angeles, CA 90001'),
('john.doe@email.com', '$2a$10$xqKhLz3jqVqKqKqKqKqKqOqKqKqKqKqKqKqKqKqKqKqKqKqKqKqKq', 'John Doe', '555-0102', '789 Oak Street, Chicago, IL 60601'),
('emma.wilson@email.com', '$2a$10$xqKhLz3jqVqKqKqKqKqKqOqKqKqKqKqKqKqKqKqKqKqKqKqKqKqKq', 'Emma Wilson', '555-0103', '321 Pine Road, Houston, TX 77001'),
('michael.brown@email.com', '$2a$10$xqKhLz3jqVqKqKqKqKqKqOqKqKqKqKqKqKqKqKqKqKqKqKqKqKqKq', 'Michael Brown', '555-0104', '654 Maple Drive, Phoenix, AZ 85001'),
('sophia.davis@email.com', '$2a$10$xqKhLz3jqVqKqKqKqKqKqOqKqKqKqKqKqKqKqKqKqKqKqKqKqKqKq', 'Sophia Davis', '555-0105', '987 Elm Boulevard, Philadelphia, PA 19019'),
('james.miller@email.com', '$2a$10$xqKhLz3jqVqKqKqKqKqKqOqKqKqKqKqKqKqKqKqKqKqKqKqKqKqKq', 'James Miller', '555-0106', '147 Cedar Lane, San Antonio, TX 78201');

-- Assign roles
INSERT INTO user_roles (user_id, role_id) VALUES
(1, 1), (1, 2),
(2, 1), (2, 2),
(3, 1), (4, 1), (5, 1), (6, 1), (7, 1);

-- Insert categories
INSERT INTO categories (name, description) VALUES
('Electronics', 'Latest gadgets and electronic devices'),
('Clothing', 'Fashion and apparel for all occasions'),
('Home & Kitchen', 'Everything for your home and kitchen needs'),
('Books', 'Wide selection of books across all genres');

-- Insert products
INSERT INTO products (name, description, price, stock, image_url, category_id) VALUES
('Wireless Bluetooth Headphones', 'Premium noise-cancelling headphones with 30-hour battery life', 89.99, 45, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', 1),
('Smart Watch Pro', 'Fitness tracker with heart rate monitor and GPS', 249.99, 30, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', 1),
('4K Ultra HD Webcam', 'Professional webcam for streaming and video calls', 129.99, 25, 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=500', 1),
('Mechanical Gaming Keyboard', 'RGB backlit keyboard with mechanical switches', 159.99, 40, 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500', 1),
('Portable Power Bank 20000mAh', 'Fast charging power bank with dual USB ports', 39.99, 100, 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500', 1),
('Classic Cotton T-Shirt', 'Comfortable everyday t-shirt in multiple colors', 24.99, 150, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', 2),
('Denim Jacket', 'Stylish denim jacket perfect for any season', 79.99, 60, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500', 2),
('Running Shoes', 'Lightweight athletic shoes for running and training', 119.99, 75, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', 2),
('Leather Crossbody Bag', 'Elegant leather bag with adjustable strap', 89.99, 35, 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500', 2),
('Stainless Steel Coffee Maker', '12-cup programmable coffee maker', 69.99, 50, 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500', 3),
('Non-Stick Cookware Set', '10-piece cookware set with glass lids', 149.99, 30, 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500', 3),
('Electric Kettle', 'Fast boiling kettle with auto shut-off', 34.99, 80, 'https://images.unsplash.com/photo-1563822249366-3efbb5c8c7c7?w=500', 3),
('Memory Foam Pillow Set', 'Hypoallergenic pillows for better sleep', 49.99, 65, 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500', 3),
('The Art of Programming', 'Comprehensive guide to software development', 44.99, 90, 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500', 4),
('Mystery Novel Collection', 'Bestselling mystery novels bundle', 29.99, 120, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500', 4),
('Cookbook: Healthy Meals', 'Easy and delicious healthy recipes', 34.99, 70, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500', 4);

-- Insert sample orders
INSERT INTO orders (user_id, total_amount, status, shipping_address, phone, created_at) VALUES
(3, 339.98, 'DELIVERED', '789 Oak Street, Chicago, IL 60601', '555-0102', '2026-01-15 10:30:00'),
(4, 204.98, 'SHIPPED', '321 Pine Road, Houston, TX 77001', '555-0103', '2026-02-01 14:20:00'),
(5, 119.99, 'PROCESSING', '654 Maple Drive, Phoenix, AZ 85001', '555-0104', '2026-02-10 09:15:00'),
(6, 299.97, 'PLACED', '987 Elm Boulevard, Philadelphia, PA 19019', '555-0105', '2026-02-20 16:45:00');

-- Insert order items
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 2, 89.99),
(1, 6, 4, 24.99),
(1, 12, 1, 34.99),
(2, 8, 1, 119.99),
(2, 6, 2, 24.99),
(2, 16, 1, 34.99),
(3, 8, 1, 119.99),
(4, 2, 1, 249.99),
(4, 13, 1, 49.99);

-- Insert payments
INSERT INTO payments (order_id, amount, status, payment_method, transaction_id, created_at) VALUES
(1, 339.98, 'SUCCESS', 'Credit Card', 'TXN1705315800000', '2026-01-15 10:30:00'),
(2, 204.98, 'SUCCESS', 'PayPal', 'TXN1706795200000', '2026-02-01 14:20:00'),
(3, 119.99, 'SUCCESS', 'Debit Card', 'TXN1707557700000', '2026-02-10 09:15:00'),
(4, 299.97, 'SUCCESS', 'Credit Card', 'TXN1708444500000', '2026-02-20 16:45:00');
