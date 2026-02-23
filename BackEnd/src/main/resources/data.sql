use lapton;

DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS carts;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
                                     id INT AUTO_INCREMENT PRIMARY KEY,
                                     email VARCHAR(255) NOT NULL UNIQUE,
                                     password_hash VARCHAR(255) NOT NULL,
                                     full_name VARCHAR(255) NOT NULL,
                                     phone VARCHAR(20),
                                     address TEXT,
                                     role ENUM('ADMIN','USER') NOT NULL DEFAULT 'USER',
                                     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (email, password_hash, full_name, phone, address, role) VALUES
                                                                              ('admin@gmail.com','$2a$10$pnbqt6JBbsrxIT6s7sgCR.XYAf9UNTafOtIAeayyKp0yXkJ0Pyuwm', 'Admin System',     '0901000001', '1 Nguyen Hue, HCM',        'ADMIN'),
                                                                              ('user@gmail.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9ljo0a36HsO2.We', 'Nguyen Van An',    '0901000002', '12 Le Loi, Da Nang',       'USER'),
                                                                              ('tran.binh@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9ljo0a36HsO2.We', 'Tran Thi Binh',   '0901000003', '34 Tran Phu, Hue',         'USER'),
                                                                              ('le.cuong@example.com',  '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9ljo0a36HsO2.We', 'Le Van Cuong',     '0901000004', '56 Hai Ba Trung, Hanoi',   'USER'),
                                                                              ('pham.dung@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9ljo0a36HsO2.We', 'Pham Thi Dung',   '0901000005', '78 Dien Bien Phu, HCM',    'USER'),
                                                                              ('hoang.em@example.com',  '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9ljo0a36HsO2.We', 'Hoang Van Em',     '0901000006', '90 CMT8, Can Tho',         'USER'),
                                                                              ('vu.phuong@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9ljo0a36HsO2.We', 'Vu Thi Phuong',   '0901000007', '22 Pham Van Dong, HCM',    'USER'),
                                                                              ('do.giang@example.com',  '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9ljo0a36HsO2.We', 'Do Quoc Giang',    '0901000008', '44 Truong Chinh, Hanoi',   'USER'),
                                                                              ('bui.huong@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9ljo0a36HsO2.We', 'Bui Thi Huong',   '0901000009', '66 Nguyen Trai, HCM',      'USER'),
                                                                              ('dao.hung@example.com',  '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9ljo0a36HsO2.We', 'Dao Minh Hung',    '0901000010', '88 Vo Van Tan, HCM',       'USER'),
                                                                              ('ly.khanh@example.com',  '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9ljo0a36HsO2.We', 'Ly Thi Khanh',    '0901000011', '10 Ly Thuong Kiet, Hanoi', 'USER'),
                                                                              ('mai.lan@example.com',   '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9ljo0a36HsO2.We', 'Mai Van Lan',      '0901000012', '32 Nguyen Dinh Chieu, HCM','USER'),
                                                                              ('ngo.mai@example.com',   '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9ljo0a36HsO2.We', 'Ngo Thi Mai',     '0901000013', '54 Ba Trieu, Hanoi',       'USER'),
                                                                              ('trieu.nam@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9ljo0a36HsO2.We', 'Trieu Van Nam',    '0901000014', '76 Tran Hung Dao, HCM',    'USER'),
                                                                              ('lam.oanh@example.com',  '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9ljo0a36HsO2.We', 'Lam Thi Oanh',    '0901000015', '98 Xo Viet Nghe Tinh, HCM','USER'),
                                                                              ('duong.phat@example.com','$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9ljo0a36HsO2.We', 'Duong Van Phat',   '0901000016', '11 Ha Huy Tap, Hanoi',     'USER'),
                                                                              ('cao.quynh@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9ljo0a36HsO2.We', 'Cao Thi Quynh',   '0901000017', '33 Doan Ket, Da Lat',      'USER'),
                                                                              ('ta.rong@example.com',   '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9ljo0a36HsO2.We', 'Ta Van Rong',      '0901000018', '55 Le Thanh Ton, HCM',     'USER'),
                                                                              ('tong.son@example.com',  '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9ljo0a36HsO2.We', 'Tong Thi Son',    '0901000019', '77 Nam Ky Khoi Nghia, HCM','USER'),
                                                                              ('ung.tuyen@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9ljo0a36HsO2.We', 'Ung Van Tuyen',    '0901000020', '99 Nguyen Van Cu, HCM',    'USER');

CREATE TABLE IF NOT EXISTS categories (
                                          id INT AUTO_INCREMENT PRIMARY KEY,
                                          name VARCHAR(255) NOT NULL UNIQUE,
                                          description TEXT,
                                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO categories (name, description) VALUES
                                               ('Gaming Laptops',     'High-performance laptops designed for gaming with dedicated GPUs and high-refresh displays'),
                                               ('Ultrabooks',         'Thin, light and portable laptops with long battery life for professionals and students'),
                                               ('MacBooks',           'Apple MacBook lineup powered by macOS and M-series chips'),
                                               ('Business Laptops',   'Durable, reliable laptops built for enterprise and business use'),
                                               ('Budget Laptops',     'Affordable laptops suitable for everyday computing tasks'),
                                               ('2-in-1 Convertibles','Versatile laptops that convert into tablets with touchscreen support'),
                                               ('Workstation Laptops','High-end laptops for creators, engineers and data scientists');

CREATE TABLE IF NOT EXISTS products (
                                        id INT AUTO_INCREMENT PRIMARY KEY,
                                        name VARCHAR(255) NOT NULL,
                                        category_id INT,
                                        description TEXT,
                                        specifications TEXT,
                                        price DOUBLE NOT NULL,
                                        sale_price DOUBLE,
                                        stock INT DEFAULT 0,
                                        image_url VARCHAR(512),
                                        brand VARCHAR(100),
                                        cpu VARCHAR(100),
                                        ram VARCHAR(50),
                                        storage VARCHAR(100),
                                        screen VARCHAR(100),
                                        status ENUM('ACTIVE','INACTIVE','OUT_OF_STOCK') DEFAULT 'ACTIVE',
                                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                        FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT INTO products (name, category_id, description, specifications, price, sale_price, stock, image_url, brand, cpu, ram, storage, screen, status) VALUES
                                                                                                                                                         ('ASUS ROG Strix G15',          1, 'Powerful gaming with RTX 4070', 'RTX 4070, 144Hz IPS',     28990000, 26990000, 15, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863254/ASUS_ROG_Strix_G15_kyjxrm.jpg',          'ASUS',      'Intel Core i7-13650HX', '16GB DDR5',  '1TB NVMe SSD', '15.6" FHD 144Hz',  'ACTIVE'),
                                                                                                                                                         ('MSI Katana GF66',             1, 'Budget gaming powerhouse',       'RTX 3060, 144Hz',         21990000, 20490000, 20, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863266/MSI_Katana_GF66_dgoz4h.jpg',             'MSI',       'Intel Core i5-12450H',  '8GB DDR4',   '512GB NVMe SSD', '15.6" FHD 144Hz', 'ACTIVE'),
                                                                                                                                                         ('Lenovo Legion 5 Pro',         1, 'ProDisplay gaming laptop',       'RTX 4060, 165Hz',         24990000, 23490000, 12, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863262/Lenovo_Legion_5_Pro_jew1kh.jpg',         'Lenovo',    'AMD Ryzen 7 7745HX',    '16GB DDR5',  '1TB NVMe SSD', '16" WQXGA 165Hz',  'ACTIVE'),
                                                                                                                                                         ('Acer Nitro 5 2023',           1, 'Entry-level gaming laptop',      'RTX 4050, 144Hz',         18990000, 17490000, 25, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863253/Acer_Nitro_5_2023_khwbw1.jpg',           'Acer',      'Intel Core i5-13420H',  '8GB DDR4',   '512GB SSD',     '15.6" FHD 144Hz',  'ACTIVE'),
                                                                                                                                                         ('HP Victus 16',                1, 'Slim gaming notebook',           'RTX 3060, 144Hz',         22490000, 20990000, 18, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863257/HP_Victus_16_rd3ktb.jpg',                'HP',        'Intel Core i7-12700H',  '16GB DDR4',  '1TB NVMe SSD', '16.1" FHD 144Hz',  'ACTIVE'),
                                                                                                                                                         ('ASUS TUF Gaming A15',         1, 'Durable gaming warrior',         'RTX 4060, 144Hz',         19990000, 18490000, 22, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863254/ASUS_TUF_Gaming_A15_rv1oqj.png',         'ASUS',      'AMD Ryzen 5 7535HS',    '8GB DDR5',   '512GB NVMe',    '15.6" FHD 144Hz',  'ACTIVE'),
                                                                                                                                                         ('Gigabyte AORUS 15',           1, 'Premium gaming OLED notebook',   'RTX 4070, 240Hz OLED',   35990000, 33990000,  8, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863256/Gigabyte_AORUS_15_p9sbct.jpg',           'Gigabyte',  'Intel Core i9-13980HX', '32GB DDR5',  '2TB NVMe SSD', '15.6" FHD 240Hz',  'ACTIVE'),
                                                                                                                                                         ('Razer Blade 15',              1, 'Premium ultra-slim gaming',      'RTX 4080, 240Hz',         55990000, 54990000,  5, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863267/Razer_Blade_15_acm694.jpg',              'Razer',     'Intel Core i9-13950HX', '32GB DDR5',  '1TB NVMe SSD', '15.6" FHD 240Hz',  'ACTIVE'),
                                                                                                                                                         ('Dell G15 Gaming',             1, 'Value gaming laptop',            'RTX 3050, 120Hz',         17490000, 15990000, 30, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863255/Dell_G15_Gaming_dgsax2.png',             'Dell',      'Intel Core i5-12500H',  '8GB DDR4',   '256GB SSD',     '15.6" FHD 120Hz',  'ACTIVE'),
                                                                                                                                                         ('MSI Raider GE76',             1, 'Elite gaming beast',             'RTX 4090, 360Hz',         62990000, 60990000,  3, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863266/MSI_Raider_GE76_aflgn3.jpg',             'MSI',       'Intel Core i9-13980HX', '64GB DDR5',  '4TB NVMe SSD', '17.3" FHD 360Hz',  'ACTIVE'),
                                                                                                                                                         ('ASUS ROG Zephyrus G14',       1, 'Ultra-portable gaming',          'RTX 4060, 120Hz OLED',   29990000, 27990000, 10, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863258/ASUS_ROG_Zephyrus_G14_xmbrdk.jpg',       'ASUS',      'AMD Ryzen 9 7940HS',    '16GB LPDDR5','1TB NVMe SSD', '14" 2.8K 120Hz',   'ACTIVE'),
                                                                                                                                                         ('Lenovo IdeaPad Gaming 3',     1, 'Entry gaming laptop',            'RTX 3050, 120Hz',         16990000, 15490000, 35, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863259/Lenovo_IdeaPad_Gaming_3_zzfmuk.jpg',     'Lenovo',    'AMD Ryzen 5 6600H',     '8GB DDR4',   '512GB SSD',     '15.6" FHD 120Hz',  'ACTIVE'),
                                                                                                                                                         ('Acer Predator Helios 300',    1, 'Serious gaming performance',     'RTX 4070, 165Hz',         30990000, 29490000, 10, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863253/Acer_Predator_Helios_300_r0r5gg.jpg',    'Acer',      'Intel Core i7-13700H',  '16GB DDR5',  '1TB NVMe SSD', '15.6" FHD 165Hz',  'ACTIVE'),
                                                                                                                                                         ('HP OMEN 16',                  1, 'Powerhouse gaming laptop',       'RTX 4080, 165Hz',         42990000, 40990000,  6, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863257/HP_OMEN_16_wvizfu.jpg',                  'HP',        'Intel Core i9-13900HX', '32GB DDR5',  '1TB NVMe SSD', '16.1" FHD 165Hz',  'ACTIVE'),
                                                                                                                                                         ('Dell XPS 13 Plus',            2, 'Ultra-premium compact laptop',   'OLED Touchscreen',        34990000, 32990000,  8, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863256/Dell_XPS_13_Plus_wsfpal.jpg',            'Dell',      'Intel Core i7-1360P',   '16GB LPDDR5','512GB NVMe',    '13.4" OLED 3.5K',  'ACTIVE'),
                                                                                                                                                         ('LG Gram 14',                  2, 'Ultra-light laptop under 1kg',   'MIL-SPEC durability',     24490000, 22490000, 12, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863264/LG_Gram_14_rwfafd.jpg',                  'LG',        'Intel Core i7-1360P',   '16GB LPDDR5','512GB NVMe',    '14" IPS FHD',       'ACTIVE'),
                                                                                                                                                         ('HP Spectre x360 14',          2, 'Premium 2-in-1 ultrabook',       'OLED Touchscreen',        33490000, 31990000,  9, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863257/HP_Spectre_x360_14_a840dr.png',          'HP',        'Intel Core i7-1355U',   '16GB LPDDR5','512GB NVMe',    '13.5" OLED 3K2K',  'ACTIVE'),
                                                                                                                                                         ('Lenovo Yoga Slim 7i',         2, 'Sleek everyday ultrabook',       'IPS anti-glare',          18990000, 17490000, 20, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863263/Lenovo_Yoga_Slim_7i_sninrd.jpg',         'Lenovo',    'Intel Core i5-1335U',   '16GB LPDDR5','512GB NVMe',    '14" IPS FHD',       'ACTIVE'),
                                                                                                                                                         ('Samsung Galaxy Book3 Pro',    2, 'Ultra-thin AMOLED ultrabook',    'AMOLED 3K Display',       29990000, 27990000,  7, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863267/Samsung_Galaxy_Book3_Pro_qrvrsh.png',    'Samsung',   'Intel Core i7-1360P',   '16GB LPDDR5','512GB NVMe',    '14" AMOLED 3K',     'ACTIVE'),
                                                                                                                                                         ('Apple MacBook Air M2',        3, 'Fanless silent performance',     'M2 chip, 18hr battery',   28990000, 27990000, 15, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863254/Apple_MacBook_Air_M2_mio1be.jpg',        'Apple',     'Apple M2',              '8GB Unified', '256GB SSD',    '13.6" Liquid Retina','ACTIVE'),
                                                                                                                                                         ('Apple MacBook Pro 14 M3',     3, 'Pro content creation powerhouse','M3 Pro, 120Hz ProMotion', 52990000, 51990000,  6, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863254/Apple_MacBook_Pro_14_M3_j0vk2n.jpg',     'Apple',     'Apple M3 Pro',          '18GB Unified','512GB SSD',    '14.2" Liquid Retina','ACTIVE'),
                                                                                                                                                         ('Apple MacBook Pro 16 M3 Max', 3, 'Ultimate Mac workstation',       'M3 Max chip',             79990000, 78990000,  3, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863255/Apple_MacBook_Pro_16_M3_Max_di7qqi.jpg', 'Apple',     'Apple M3 Max',          '36GB Unified','1TB SSD',      '16.2" Liquid Retina','ACTIVE'),
                                                                                                                                                         ('Apple MacBook Air M1',        3, 'Best value Mac laptop',          'M1 chip, 18hr battery',   21990000, 19990000, 20, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863254/Apple_MacBook_Air_M1_jaojn2.jpg',        'Apple',     'Apple M1',              '8GB Unified', '256GB SSD',    '13.3" Retina',       'ACTIVE'),
                                                                                                                                                         ('Lenovo ThinkPad X1 Carbon',   4, 'Business flagship ultrabook',    'Military-grade certified', 38990000, 36990000,  8, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863262/Lenovo_ThinkPad_X1_Carbon_tq0mom.jpg',   'Lenovo',   'Intel Core i7-1365U',   '16GB LPDDR5','512GB NVMe',    '14" IPS 2.8K',      'ACTIVE'),
                                                                                                                                                         ('HP EliteBook 840 G9',         4, 'Business security laptop',       'Wolf Security built-in',   28490000, 26990000, 10, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863256/HP_EliteBook_840_G9_qrxzpl.jpg',         'HP',       'Intel Core i5-1245U',   '16GB DDR4',   '512GB NVMe',   '14" IPS FHD',       'ACTIVE'),
                                                                                                                                                         ('Dell Latitude 5430',          4, 'Durable business laptop',        'TPM 2.0, IR Camera',       24990000, 22990000, 12, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863255/Dell_Latitude_5430_q5rzho.jpg',          'Dell',     'Intel Core i5-1245U',   '8GB DDR4',    '256GB NVMe',   '14" FHD',           'ACTIVE'),
                                                                                                                                                         ('Panasonic Toughbook 55',      4, 'Rugged field laptop',            'IP65 certified, 40hr batt',55990000, 53990000,  4, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863267/Panasonic_Toughbook_55_uipnyz.jpg',      'Panasonic','Intel Core i5-1145G7',  '8GB DDR4',    '256GB SSD',    '14" HD Touchscreen','ACTIVE'),
                                                                                                                                                         ('Acer Aspire 5 2023',          5, 'Best budget laptop for students','Full HD IPS, long battery', 10990000, 9990000,  40, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863253/Acer_Aspire_5_2023_bsqfdz.jpg',         'Acer',    'AMD Ryzen 5 5500U',     '8GB DDR4',    '512GB SSD',    '15.6" FHD IPS',     'ACTIVE'),
                                                                                                                                                         ('Lenovo IdeaPad 3',            5, 'Affordable everyday laptop',     'Good all-rounder',          8990000,  7990000,  50, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863258/Lenovo_IdeaPad_3_wdnzch.jpg',           'Lenovo',  'Intel Core i3-1215U',   '4GB DDR4',    '256GB SSD',    '15.6" FHD',         'ACTIVE'),
                                                                                                                                                         ('HP 15s-fq5000TU',             5, 'Entry-level HP laptop',          'Thin design, basic tasks',  9490000,  8490000,  45, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863256/HP_15s-fq5000TU_gsygku.jpg',            'HP',      'Intel Core i3-1215U',   '4GB DDR4',    '256GB NVMe',   '15.6" FHD IPS',     'ACTIVE'),
                                                                                                                                                         ('ASUS VivoBook 15',            5, 'Slim affordable laptop',         'NanoEdge display',          9990000,  8990000,  35, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863253/ASUS_VivoBook_15_q8necy.jpg',           'ASUS',    'AMD Ryzen 5 5500U',     '8GB DDR4',    '512GB SSD',    '15.6" FHD',         'ACTIVE'),
                                                                                                                                                         ('Dell Inspiron 15',            5, 'Reliable budget laptop',         'Wide port selection',        9290000,  8290000,  38, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863255/Dell_Inspiron_15_wowlgr.jpg',           'Dell',   'Intel Core i3-1215U',   '4GB DDR4',    '256GB HDD',    '15.6" FHD',         'ACTIVE'),
                                                                                                                                                         ('Lenovo Yoga 9i',              6, 'Premium 2-in-1 convertible',     '4K OLED Touchscreen',      35990000, 33990000, 7,  'https://res.cloudinary.com/dquuquf93/image/upload/v1771863263/Lenovo_Yoga_9i_hsoh47.jpg',              'Lenovo',  'Intel Core i7-1360P',   '16GB LPDDR5', '1TB NVMe',     '14" 4K OLED Touch', 'ACTIVE'),
                                                                                                                                                         ('HP Envy x360 13',             6, 'Compact 2-in-1 ultrabook',       'OLED display, S Pen',      24990000, 22490000, 11, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863257/HP_Envy_x360_13_aqcyyx.jpg',             'HP',      'AMD Ryzen 7 7730U',     '16GB DDR4',   '512GB NVMe',   '13.3" OLED Touch',  'ACTIVE'),
                                                                                                                                                         ('Microsoft Surface Pro 9',     6, 'Tablet first 2-in-1',            'PixelSense Flow display',  37990000, 35990000, 6,  'https://res.cloudinary.com/dquuquf93/image/upload/v1771863266/Microsoft_Surface_Pro_9_pvs8mw.jpg',     'Microsoft','Intel Core i7-1255U',   '16GB LPDDR5', '512GB SSD',    '13" PixelSense',    'ACTIVE'),
                                                                                                                                                         ('ASUS ZenBook Flip 14',        6, 'Flip 2-in-1 with stylus',        '90Hz OLED, stylus incl.',  21990000, 19990000, 14, 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863255/ASUS_ZenBook_Flip_14_v0t05c.jpg',        'ASUS',   'Intel Core i5-1335U',   '8GB LPDDR4X', '512GB NVMe',   '14" OLED FHD Touch','ACTIVE'),
                                                                                                                                                         ('Dell Precision 5480',         7, 'Creator workstation laptop',     'NVIDIA RTX A1000',         48990000, 46990000, 5,  'https://res.cloudinary.com/dquuquf93/image/upload/v1771863257/Dell_Precision_5480_ejpngi.jpg',         'Dell',    'Intel Core i7-13800H',  '32GB DDR5',   '1TB NVMe SSD', '14" FHD+ IPS',      'ACTIVE'),
                                                                                                                                                         ('HP ZBook Fury 16 G10',        7, 'Mobile workstation beast',       'NVIDIA RTX A4000',         65990000, 63990000, 3,  'https://res.cloudinary.com/dquuquf93/image/upload/v1771863258/HP_ZBook_Fury_16_G10_o6stna.jpg',        'HP',      'Intel Core i9-13950HX', '64GB DDR5',   '2TB NVMe SSD', '16" DreamColor 4K', 'ACTIVE'),
                                                                                                                                                         ('Lenovo ThinkPad P16',         7, 'Extreme workstation laptop',     'NVIDIA GeForce RTX 3000',  54990000, 52990000, 4,  'https://res.cloudinary.com/dquuquf93/image/upload/v1771863262/Lenovo_ThinkPad_P16_bxmzur.jpg',        'Lenovo',  'Intel Core i7-12850HX', '32GB DDR5',   '1TB NVMe SSD', '16" IPS 2560x1600', 'ACTIVE');

CREATE TABLE IF NOT EXISTS orders (
                                      id INT AUTO_INCREMENT PRIMARY KEY,
                                      user_id INT NOT NULL,
                                      full_name VARCHAR(255),
                                      phone VARCHAR(20),
                                      address TEXT,
                                      note TEXT,
                                      total_price DOUBLE,
                                      status ENUM('pending','processing','shipping','completed','cancelled') DEFAULT 'pending',
                                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                      FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO orders (user_id, full_name, phone, address, note, total_price, status) VALUES
                                                                                       (2, 'Nguyen Van An',  '0901000002', '12 Le Loi, Da Nang',       'Giao trong gio hanh chinh', 28990000,  'completed'),
                                                                                       (3, 'Tran Thi Binh',  '0901000003', '34 Tran Phu, Hue',          NULL,                         21990000,  'completed'),
                                                                                       (4, 'Le Van Cuong',   '0901000004', '56 Hai Ba Trung, Hanoi',    'De truoc cua',               24990000,  'completed'),
                                                                                       (5, 'Pham Thi Dung',  '0901000005', '78 Dien Bien Phu, HCM',     NULL,                         18990000,  'completed'),
                                                                                       (6, 'Hoang Van Em',   '0901000006', '90 CMT8, Can Tho',           'Goi dien truoc khi giao',   52990000,  'completed'),
                                                                                       (7, 'Vu Thi Phuong',  '0901000007', '22 Pham Van Dong, HCM',     NULL,                         28990000,  'completed'),
                                                                                       (8, 'Do Quoc Giang',  '0901000008', '44 Truong Chinh, Hanoi',    'Shipping bình thường',       21990000,  'completed'),
                                                                                       (9, 'Bui Thi Huong',  '0901000009', '66 Nguyen Trai, HCM',       NULL,                         22490000,  'completed'),
                                                                                       (10,'Dao Minh Hung',  '0901000010', '88 Vo Van Tan, HCM',         NULL,                         65990000,  'completed'),
                                                                                       (11,'Ly Thi Khanh',   '0901000011', '10 Ly Thuong Kiet, Hanoi',  'Giao cuoi tuan',             28990000,  'processing'),
                                                                                       (12,'Mai Van Lan',    '0901000012', '32 Nguyen Dinh Chieu, HCM', NULL,                         34990000,  'processing'),
                                                                                       (13,'Ngo Thi Mai',    '0901000013', '54 Ba Trieu, Hanoi',         NULL,                         10990000,  'shipping'),
                                                                                       (14,'Trieu Van Nam',  '0901000014', '76 Tran Hung Dao, HCM',     'Giao gio hanh chinh',        8990000,   'shipping'),
                                                                                       (15,'Lam Thi Oanh',   '0901000015', '98 Xo Viet Nghe Tinh, HCM', NULL,                         35990000,  'pending'),
                                                                                       (16,'Duong Van Phat', '0901000016', '11 Ha Huy Tap, Hanoi',       NULL,                         24490000,  'pending'),
                                                                                       (2, 'Nguyen Van An',  '0901000002', '12 Le Loi, Da Nang',        'Hang mong manh',             9990000,   'cancelled'),
                                                                                       (3, 'Tran Thi Binh',  '0901000003', '34 Tran Phu, Hue',           NULL,                         19990000,  'completed'),
                                                                                       (4, 'Le Van Cuong',   '0901000004', '56 Hai Ba Trung, Hanoi',     NULL,                         38990000,  'completed'),
                                                                                       (5, 'Pham Thi Dung',  '0901000005', '78 Dien Bien Phu, HCM',      NULL,                         54990000,  'completed'),
                                                                                       (6, 'Hoang Van Em',   '0901000006', '90 CMT8, Can Tho',           'Bao bi ky',                  37990000,  'pending');

CREATE TABLE IF NOT EXISTS order_items (
                                           id INT AUTO_INCREMENT PRIMARY KEY,
                                           order_id INT NOT NULL,
                                           product_id INT NOT NULL,
                                           quantity INT NOT NULL,
                                           price DOUBLE NOT NULL,
                                           FOREIGN KEY (order_id) REFERENCES orders(id),
                                           FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
                                                                    (1,  1,  1, 28990000),
                                                                    (2,  2,  1, 21990000),
                                                                    (3,  3,  1, 24990000),
                                                                    (4,  4,  1, 18990000),
                                                                    (5,  21, 1, 52990000),
                                                                    (6,  20, 1, 28990000),
                                                                    (7,  2,  1, 21990000),
                                                                    (8,  5,  1, 22490000),
                                                                    (9,  38, 1, 65990000),
                                                                    (10, 1,  1, 28990000),
                                                                    (11, 15, 1, 34990000),
                                                                    (12, 28, 1, 10990000),
                                                                    (13, 29, 1, 8990000),
                                                                    (14, 33, 1, 35990000),
                                                                    (15, 16, 1, 24490000),
                                                                    (16, 32, 1, 9990000),
                                                                    (17, 23, 1, 19990000),
                                                                    (18, 24, 1, 38990000),
                                                                    (19, 37, 1, 54990000),
                                                                    (20, 35, 1, 37990000);

CREATE TABLE IF NOT EXISTS carts (
                                     id INT AUTO_INCREMENT PRIMARY KEY,
                                     user_id INT NOT NULL UNIQUE,
                                     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                     FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO carts (user_id) VALUES
                                (2),(3),(4),(5),(6),(7),(8),(9),(10);

CREATE TABLE IF NOT EXISTS cart_items (
                                          id INT AUTO_INCREMENT PRIMARY KEY,
                                          cart_id INT NOT NULL,
                                          product_id INT NOT NULL,
                                          quantity INT NOT NULL DEFAULT 1,
                                          FOREIGN KEY (cart_id) REFERENCES carts(id),
                                          FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO cart_items (cart_id, product_id, quantity) VALUES
                                                           (1, 11,  1),
                                                           (2, 6,   2),
                                                           (3, 20,  1),
                                                           (4, 39,  1),
                                                           (5, 3,   1),
                                                           (6, 27,  1),
                                                           (7, 17,  1),
                                                           (8, 36,  1),
                                                           (9, 13,  1);

CREATE TABLE IF NOT EXISTS reviews (
                                       id INT AUTO_INCREMENT PRIMARY KEY,
                                       user_id INT NOT NULL,
                                       product_id INT NOT NULL,
                                       rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
                                       comment TEXT,
                                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                       FOREIGN KEY (user_id) REFERENCES users(id),
                                       FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO reviews (user_id, product_id, rating, comment) VALUES
                                                               (2,  1,  5, 'Laptop gaming cực đỉnh, chiến mọi game ultra setting!'),
                                                               (3,  2,  4, 'Giá tốt, hiệu năng ổn cho tầm giá này.'),
                                                               (4,  3,  5, 'Màn hình đẹp, Ryzen 7 xử lý mượt không lag!'),
                                                               (5,  4,  3, 'Tạm ổn, nóng một chút khi chơi game nặng.'),
                                                               (6,  21, 5, 'MacBook Pro M3 hoàn hảo, làm việc cả ngày pin vẫn còn.'),
                                                               (7,  20, 5, 'MacBook Air M2 nhẹ nhàng, pin 18 giờ thực tế.'),
                                                               (8,  2,  4, 'MSI Katana ngon cho số tiền bỏ ra.'),
                                                               (9,  5,  4, 'HP Victus đẹp, mỏng hơn tưởng rất nhiều.'),
                                                               (10, 38, 5, 'HP ZBook xịn xò nhất từng dùng, render cực nhanh!'),
                                                               (11, 1,  5, 'ROG Strix G15 đỉnh của đỉnh!'),
                                                               (12, 15, 4, 'Dell XPS 13 màn OLED rất đẹp.'),
                                                               (13, 28, 4, 'Acer Aspire 5 tốt cho sinh viên.'),
                                                               (14, 29, 3, 'Lenovo IdeaPad 3 ổn, nhưng RAM 4GB hơi ít.'),
                                                               (15, 33, 5, 'Lenovo Yoga 9i màn 4K OLED xem phim cực đã!'),
                                                               (16, 16, 4, 'LG Gram 14 nhẹ nhất mình từng cầm!'),
                                                               (2,  23, 5, 'MacBook Air M1 vẫn rất mạnh dù ra đời lâu rồi.'),
                                                               (3,  24, 5, 'ThinkPad X1 Carbon chuẩn doanh nghiệp, bàn phím đỉnh!'),
                                                               (4,  37, 5, 'Dell Precision 5480 render 3D siêu nhanh!'),
                                                               (5,  35, 4, 'Surface Pro 9 dùng như tablet rất tiện.'),
                                                               (6,  13, 4, 'Acer Predator Helios 300 gaming mượt, nhiệt ổn.');
