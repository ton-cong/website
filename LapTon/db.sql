-- Tạo database
CREATE DATABASE IF NOT EXISTS lapton CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE laptop_shop;

-- Bảng users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    role ENUM('admin', 'customer') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng categories
CREATE TABLE categories (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     description TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng products
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    category_id INT,
    description TEXT,
    specifications TEXT,
    price DECIMAL(10, 2) NOT NULL,
    sale_price DECIMAL(10, 2),
    stock INT DEFAULT 0,
    image_url VARCHAR(255),
    brand VARCHAR(50),
    cpu VARCHAR(100),
    ram VARCHAR(50),
    storage VARCHAR(50),
    screen VARCHAR(50),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Bảng orders
CREATE TABLE orders (
     id INT AUTO_INCREMENT PRIMARY KEY,
     user_id INT,
     total_amount DECIMAL(10, 2) NOT NULL,
     status ENUM('pending', 'processing', 'shipping', 'completed', 'cancelled') DEFAULT 'pending',
     payment_method VARCHAR(50),
     shipping_address TEXT,
     phone VARCHAR(20),
     note TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Bảng order_items
CREATE TABLE order_items (
     id INT AUTO_INCREMENT PRIMARY KEY,
     order_id INT,
     product_id INT,
     quantity INT NOT NULL,
     price DECIMAL(10, 2) NOT NULL,
     FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
     FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- Bảng cart
CREATE TABLE cart (
     id INT AUTO_INCREMENT PRIMARY KEY,
     user_id INT,
     product_id INT,
     quantity INT DEFAULT 1,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
     FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
     UNIQUE KEY unique_cart (user_id, product_id)
);


INSERT INTO categories (name, description) VALUES
                                               ('Gaming Laptop', 'Laptop chuyên game hiệu năng cao'),
                                               ('Văn phòng', 'Laptop cho công việc văn phòng'),
                                               ('Đồ họa', 'Laptop cho thiết kế đồ họa'),
                                               ('Mỏng nhẹ', 'Laptop mỏng nhẹ cao cấp');

INSERT INTO products (name, category_id, description, price, sale_price, stock, brand, cpu, ram, storage, screen, image_url) VALUES
                                                                                                                                 ('Dell Gaming G15', 1, 'Laptop gaming mạnh mẽ với card đồ họa RTX', 25990000, 23990000, 10, 'Dell', 'Intel Core i7-12700H', '16GB DDR5', '512GB SSD', '15.6" FHD 165Hz', 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500'),
                                                                                                                                 ('ASUS VivoBook 15', 2, 'Laptop văn phòng hiệu suất tốt', 15990000, 14990000, 15, 'ASUS', 'Intel Core i5-1235U', '8GB DDR4', '512GB SSD', '15.6" FHD', 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500'),
                                                                                                                                 ('MacBook Pro 14', 3, 'Laptop đồ họa chuyên nghiệp', 52990000, NULL, 5, 'Apple', 'Apple M3 Pro', '18GB', '512GB SSD', '14.2" Retina', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'),
                                                                                                                                 ('Lenovo ThinkPad X1', 4, 'Laptop mỏng nhẹ cao cấp', 35990000, 33990000, 8, 'Lenovo', 'Intel Core i7-1365U', '16GB LPDDR5', '1TB SSD', '14" WUXGA', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500'),
                                                                                                                                 ('HP Pavilion Gaming', 1, 'Gaming laptop giá tốt', 19990000, 18490000, 12, 'HP', 'AMD Ryzen 5 5600H', '8GB DDR4', '512GB SSD', '15.6" FHD 144Hz', 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500'),
                                                                                                                                 ('Acer Swift 3', 4, 'Laptop mỏng nhẹ giá tốt', 16990000, 15990000, 20, 'Acer', 'Intel Core i5-1240P', '8GB LPDDR4X', '512GB SSD', '14" FHD', 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500');