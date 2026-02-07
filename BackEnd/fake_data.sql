-- ========================================
-- FAKE DATA CHO E-COMMERCE
-- Chạy file này trong MySQL Workbench
-- ========================================

-- 1. USERS (mật khẩu đã mã hóa = "123456")
INSERT INTO users (email, password_hash, full_name, phone, address, role, created_at) VALUES
('admin@techshop.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n90mVFqF5KBwW.MCkd3Oi', 'Admin System', '0901234567', 'Hà Nội', 'ADMIN', NOW()),
('user1@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n90mVFqF5KBwW.MCkd3Oi', 'Nguyễn Văn A', '0912345678', '123 Lê Lợi, Q1, TP.HCM', 'USER', NOW()),
('user2@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n90mVFqF5KBwW.MCkd3Oi', 'Trần Thị B', '0923456789', '456 Nguyễn Huệ, Q3, TP.HCM', 'USER', NOW()),
('user3@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n90mVFqF5KBwW.MCkd3Oi', 'Lê Văn C', '0934567890', '789 Trần Hưng Đạo, Q5, TP.HCM', 'USER', NOW());

-- 2. CATEGORIES
INSERT INTO categories (name, description, created_at) VALUES
('Laptop', 'Máy tính xách tay các loại', NOW()),
('Điện thoại', 'Smartphone và phụ kiện', NOW()),
('Tablet', 'Máy tính bảng', NOW()),
('Phụ kiện', 'Tai nghe, sạc, ốp lưng...', NOW()),
('PC & Linh kiện', 'Máy tính để bàn và linh kiện', NOW());

-- 3. PRODUCTS
INSERT INTO products (name, category_id, description, specifications, price, sale_price, stock, image_url, brand, cpu, ram, storage, screen, status, created_at) VALUES
-- Laptop
('MacBook Pro 14 M3', 1, 'Laptop Apple cao cấp với chip M3 mạnh mẽ', 'Chip M3, 18GB RAM, 512GB SSD', 49990000, 47990000, 15, 'https://placehold.co/400x400/1a1a2e/FFFFFF?text=MacBook+Pro', 'Apple', 'Apple M3', '18GB', '512GB SSD', '14.2 inch Liquid Retina XDR', 'AVAILABLE', NOW()),
('Dell XPS 15', 1, 'Laptop Dell cao cấp với màn hình OLED', 'Intel Core i7, 16GB RAM, 512GB SSD', 42990000, NULL, 20, 'https://placehold.co/400x400/0077b6/FFFFFF?text=Dell+XPS', 'Dell', 'Intel Core i7-13700H', '16GB DDR5', '512GB NVMe', '15.6 inch OLED 3.5K', 'AVAILABLE', NOW()),
('ASUS ROG Strix G16', 1, 'Laptop gaming mạnh mẽ', 'Intel Core i9, RTX 4070, 32GB RAM', 55990000, 52990000, 10, 'https://placehold.co/400x400/e63946/FFFFFF?text=ROG+Strix', 'ASUS', 'Intel Core i9-13980HX', '32GB DDR5', '1TB NVMe', '16 inch QHD+ 240Hz', 'AVAILABLE', NOW()),
('HP Pavilion 15', 1, 'Laptop văn phòng phổ thông', 'Intel Core i5, 8GB RAM, 256GB SSD', 15990000, 14490000, 30, 'https://placehold.co/400x400/6c757d/FFFFFF?text=HP+Pavilion', 'HP', 'Intel Core i5-1235U', '8GB DDR4', '256GB SSD', '15.6 inch FHD IPS', 'AVAILABLE', NOW()),
('Lenovo ThinkPad X1 Carbon', 1, 'Laptop doanh nhân cao cấp', 'Intel Core i7, 16GB RAM, 512GB SSD', 38990000, NULL, 12, 'https://placehold.co/400x400/1d3557/FFFFFF?text=ThinkPad', 'Lenovo', 'Intel Core i7-1365U', '16GB LPDDR5', '512GB NVMe', '14 inch 2.8K OLED', 'AVAILABLE', NOW()),

-- Điện thoại
('iPhone 15 Pro Max', 2, 'Điện thoại flagship Apple mới nhất', '256GB, Titanium Blue', 34990000, 33490000, 25, 'https://placehold.co/400x400/457b9d/FFFFFF?text=iPhone+15', 'Apple', 'A17 Pro', '8GB', '256GB', '6.7 inch Super Retina XDR', 'AVAILABLE', NOW()),
('Samsung Galaxy S24 Ultra', 2, 'Flagship Android với camera 200MP', '512GB, Titanium Gray', 31990000, NULL, 20, 'https://placehold.co/400x400/2a9d8f/FFFFFF?text=S24+Ultra', 'Samsung', 'Snapdragon 8 Gen 3', '12GB', '512GB', '6.8 inch Dynamic AMOLED 2X', 'AVAILABLE', NOW()),
('Xiaomi 14 Ultra', 2, 'Camera Leica chuyên nghiệp', '512GB, Black', 23990000, 22490000, 18, 'https://placehold.co/400x400/f4a261/000000?text=Xiaomi+14', 'Xiaomi', 'Snapdragon 8 Gen 3', '12GB', '512GB', '6.73 inch LTPO AMOLED', 'AVAILABLE', NOW()),
('OPPO Find X7 Ultra', 2, 'Camera kép periscope ấn tượng', '256GB, Ocean Blue', 24990000, NULL, 15, 'https://placehold.co/400x400/48cae4/000000?text=Find+X7', 'OPPO', 'Dimensity 9300', '12GB', '256GB', '6.82 inch 2K LTPO AMOLED', 'AVAILABLE', NOW()),

-- Tablet
('iPad Pro 12.9 M2', 3, 'Tablet mạnh mẽ nhất của Apple', 'Chip M2, 256GB WiFi', 28990000, 27490000, 10, 'https://placehold.co/400x400/264653/FFFFFF?text=iPad+Pro', 'Apple', 'Apple M2', '8GB', '256GB', '12.9 inch Liquid Retina XDR', 'AVAILABLE', NOW()),
('Samsung Galaxy Tab S9 Ultra', 3, 'Tablet Android cao cấp nhất', '512GB WiFi', 27990000, NULL, 8, 'https://placehold.co/400x400/023047/FFFFFF?text=Tab+S9', 'Samsung', 'Snapdragon 8 Gen 2', '12GB', '512GB', '14.6 inch Dynamic AMOLED 2X', 'AVAILABLE', NOW()),

-- Phụ kiện
('AirPods Pro 2', 4, 'Tai nghe không dây cao cấp Apple', 'Chống ồn chủ động, USB-C', 6490000, 5990000, 50, 'https://placehold.co/400x400/a8dadc/000000?text=AirPods', 'Apple', NULL, NULL, NULL, NULL, 'AVAILABLE', NOW()),
('Samsung Galaxy Buds3 Pro', 4, 'Tai nghe không dây Samsung mới', 'ANC, 360 Audio', 5490000, NULL, 40, 'https://placehold.co/400x400/90e0ef/000000?text=Buds3', 'Samsung', NULL, NULL, NULL, NULL, 'AVAILABLE', NOW()),
('Logitech MX Master 3S', 4, 'Chuột không dây cao cấp', 'Silent click, 8K DPI', 2590000, 2290000, 35, 'https://placehold.co/400x400/caf0f8/000000?text=MX+Master', 'Logitech', NULL, NULL, NULL, NULL, 'AVAILABLE', NOW()),

-- PC & Linh kiện
('PC Gaming RTX 4080', 5, 'Bộ máy gaming cao cấp', 'i9-14900K, RTX 4080, 32GB RAM', 65990000, 62990000, 5, 'https://placehold.co/400x400/e76f51/FFFFFF?text=Gaming+PC', 'Custom', 'Intel Core i9-14900K', '32GB DDR5', '2TB NVMe', NULL, 'AVAILABLE', NOW()),
('Card RTX 4070 Ti Super', 5, 'Card đồ họa NVIDIA mới', '16GB GDDR6X', 18990000, NULL, 12, 'https://placehold.co/400x400/2a9d8f/FFFFFF?text=RTX+4070', 'NVIDIA', NULL, NULL, NULL, NULL, 'AVAILABLE', NOW());

-- 4. ORDERS
INSERT INTO orders (user_id, full_name, phone, address, note, total_price, status, created_at, updated_at) VALUES
(2, 'Nguyễn Văn A', '0912345678', '123 Lê Lợi, Q1, TP.HCM', 'Giao giờ hành chính', 49990000, 'DELIVERED', DATE_SUB(NOW(), INTERVAL 5 DAY), NOW()),
(2, 'Nguyễn Văn A', '0912345678', '123 Lê Lợi, Q1, TP.HCM', NULL, 6490000, 'SHIPPING', DATE_SUB(NOW(), INTERVAL 2 DAY), NOW()),
(3, 'Trần Thị B', '0923456789', '456 Nguyễn Huệ, Q3, TP.HCM', 'Gọi trước khi giao', 34990000, 'CONFIRMED', DATE_SUB(NOW(), INTERVAL 1 DAY), NOW()),
(4, 'Lê Văn C', '0934567890', '789 Trần Hưng Đạo, Q5, TP.HCM', NULL, 42990000, 'PENDING', NOW(), NOW());

-- 5. ORDER_ITEMS
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 1, 49990000),
(2, 13, 1, 6490000),
(3, 6, 1, 34990000),
(4, 2, 1, 42990000);

-- 6. REVIEWS
INSERT INTO reviews (user_id, product_id, rating, comment, created_at) VALUES
(2, 1, 5, 'Laptop rất mạnh, dùng cho công việc design cực kỳ mượt!', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(3, 1, 4, 'Sản phẩm tốt, giao hàng nhanh. Chỉ hơi nóng khi chạy nặng.', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(4, 6, 5, 'iPhone 15 Pro Max xịn xò, camera chụp đẹp lắm!', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(2, 13, 5, 'AirPods Pro 2 chống ồn rất tốt, âm thanh hay!', NOW()),
(3, 7, 4, 'Samsung S24 Ultra máy đẹp, camera zoom xa ấn tượng.', NOW());

-- ========================================
-- TÀI KHOẢN TEST
-- Email: admin@techshop.com | Pass: 123456 (ADMIN)
-- Email: user1@gmail.com   | Pass: 123456 (USER)
-- ========================================
