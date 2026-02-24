-- Insert roles
INSERT INTO roles (name) VALUES ('ROLE_USER'), ('ROLE_ADMIN');

-- Insert users
-- Passwords BCrypt hashed:
-- Admin@123 = $2a$10$IQudhCFpiYXXPCBukc/r4eP8OSZEnueTyPy5ythR69hxTH/SB9iYi
-- Demo@123 = $2a$10$2.7T7kbXmrwNmCVJbIM51uOe34Zf8jQwpw1EstLpJnb7KUulaNODS
-- password123 = $2a$10$tmIFT9UP7R2CPBjh.xBr1uTnJUn0iGIz77MwL3yS9z0R1G9.pV4P2
INSERT INTO users (email, password, full_name, phone, address, enabled, created_at, updated_at) VALUES
-- Demo Admin Account (Admin@123)
('admin@shopez.com', '$2a$10$IQudhCFpiYXXPCBukc/r4eP8OSZEnueTyPy5ythR69hxTH/SB9iYi', 'Admin User', '555-0100', '123 Admin St, New York, NY 10001', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Demo User Account (Demo@123)
('demo@shopez.com', '$2a$10$2.7T7kbXmrwNmCVJbIM51uOe34Zf8jQwpw1EstLpJnb7KUulaNODS', 'Demo User', '555-0107', '789 Demo Street, Demo City, DC 12345', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('sarah.admin@shopez.com', '$2a$10$tmIFT9UP7R2CPBjh.xBr1uTnJUn0iGIz77MwL3yS9z0R1G9.pV4P2', 'Sarah Johnson', '555-0101', '456 Management Ave, Los Angeles, CA 90001', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('john.doe@email.com', '$2a$10$tmIFT9UP7R2CPBjh.xBr1uTnJUn0iGIz77MwL3yS9z0R1G9.pV4P2', 'John Doe', '555-0102', '789 Oak Street, Chicago, IL 60601', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('emma.wilson@email.com', '$2a$10$tmIFT9UP7R2CPBjh.xBr1uTnJUn0iGIz77MwL3yS9z0R1G9.pV4P2', 'Emma Wilson', '555-0103', '321 Pine Road, Houston, TX 77001', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('michael.brown@email.com', '$2a$10$tmIFT9UP7R2CPBjh.xBr1uTnJUn0iGIz77MwL3yS9z0R1G9.pV4P2', 'Michael Brown', '555-0104', '654 Maple Drive, Phoenix, AZ 85001', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('sophia.davis@email.com', '$2a$10$tmIFT9UP7R2CPBjh.xBr1uTnJUn0iGIz77MwL3yS9z0R1G9.pV4P2', 'Sophia Davis', '555-0105', '987 Elm Boulevard, Philadelphia, PA 19019', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('james.miller@email.com', '$2a$10$tmIFT9UP7R2CPBjh.xBr1uTnJUn0iGIz77MwL3yS9z0R1G9.pV4P2', 'James Miller', '555-0106', '147 Cedar Lane, San Antonio, TX 78201', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Assign roles
INSERT INTO user_roles (user_id, role_id) VALUES
(1, 1), (1, 2),  -- admin@shopez.com - both USER and ADMIN
(2, 1),          -- demo@shopez.com - USER only
(3, 1), (3, 2),  -- sarah.admin@shopez.com - both USER and ADMIN
(4, 1), (5, 1), (6, 1), (7, 1), (8, 1);

-- Insert categories
INSERT INTO categories (name, description) VALUES
('Electronics', 'Latest gadgets and electronic devices'),
('Clothing', 'Fashion and apparel for all occasions'),
('Home & Kitchen', 'Everything for your home and kitchen needs'),
('Books', 'Wide selection of books across all genres');

-- Insert products
INSERT INTO products (name, description, price, stock, image_url, category_id, active, created_at, updated_at) VALUES
('Wireless Bluetooth Headphones', 'Premium noise-cancelling headphones with 30-hour battery life', 89.99, 45, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Smart Watch Pro', 'Fitness tracker with heart rate monitor and GPS', 249.99, 30, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('4K Ultra HD Webcam', 'Professional webcam for streaming and video calls', 129.99, 25, 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=500', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Mechanical Gaming Keyboard', 'RGB backlit keyboard with mechanical switches', 159.99, 40, 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Portable Power Bank 20000mAh', 'Fast charging power bank with dual USB ports', 39.99, 100, 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Classic Cotton T-Shirt', 'Comfortable everyday t-shirt in multiple colors', 24.99, 150, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Denim Jacket', 'Stylish denim jacket perfect for any season', 79.99, 60, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500', 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Running Shoes', 'Lightweight athletic shoes for running and training', 119.99, 75, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Leather Crossbody Bag', 'Elegant leather bag with adjustable strap', 89.99, 35, 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500', 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Stainless Steel Coffee Maker', '12-cup programmable coffee maker', 69.99, 50, 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500', 3, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Non-Stick Cookware Set', '10-piece cookware set with glass lids', 149.99, 30, 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500', 3, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Electric Kettle', 'Fast boiling kettle with auto shut-off', 34.99, 80, 'https://images.unsplash.com/photo-1563822249366-3efbb5c8c7c7?w=500', 3, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Memory Foam Pillow Set', 'Hypoallergenic pillows for better sleep', 49.99, 65, 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500', 3, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('The Art of Programming', 'Comprehensive guide to software development', 44.99, 90, 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500', 4, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Mystery Novel Collection', 'Bestselling mystery novels bundle', 29.99, 120, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500', 4, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Cookbook: Healthy Meals', 'Easy and delicious healthy recipes', 34.99, 70, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500', 4, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
