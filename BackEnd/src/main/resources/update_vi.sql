USE lapton;

-- ============================================
-- CẬP NHẬT DANH MỤC SANG TIẾNG VIỆT
-- ============================================
UPDATE categories
SET name = 'Laptop Gaming',
    description = 'Laptop hiệu năng cao dành cho game thủ, trang bị GPU rời và màn hình tần số quét cao',
    image_url = 'https://res.cloudinary.com/dquuquf93/image/upload/v1777401509/lapgaming_x0kaa1.jpg'
WHERE id = 1;

UPDATE categories
SET name = 'Ultrabook',
    description = 'Laptop mỏng nhẹ, thiết kế cao cấp, thời lượng pin dài, phù hợp cho văn phòng và di chuyển nhiều',
    image_url = 'https://res.cloudinary.com/dquuquf93/image/upload/v1777401509/Ultrabook_kv6n73.jpg'
WHERE id = 2;

UPDATE categories
SET name = 'MacBook',
    description = 'Dòng laptop Apple sử dụng macOS, thiết kế cao cấp, tối ưu hiệu năng với chip M-series',
    image_url = 'https://res.cloudinary.com/dquuquf93/image/upload/v1777401508/MacBook_juzjdp.webp'
WHERE id = 3;

UPDATE categories
SET name = 'Laptop văn phòng',
    description = 'Laptop ổn định, bền bỉ, đáp ứng tốt các nhu cầu học tập, làm việc văn phòng và doanh nghiệp',
    image_url = 'https://res.cloudinary.com/dquuquf93/image/upload/v1777401509/lapvp_ccu1mw.jpg'
WHERE id = 4;

UPDATE categories
SET name = 'Laptop đồ họa – kỹ thuật',
    description = 'Laptop cấu hình mạnh với CPU và GPU hiệu năng cao, phục vụ thiết kế đồ họa, dựng video và kỹ thuật',
    image_url = 'https://res.cloudinary.com/dquuquf93/image/upload/v1777401509/lapdohoa_rkfkn4.jpg'
WHERE id = 5;

UPDATE categories
SET name = 'Laptop 2-in-1',
    description = 'Laptop có thể xoay gập 360 độ hoặc tháo rời, tích hợp màn hình cảm ứng linh hoạt',
    image_url = 'https://res.cloudinary.com/dquuquf93/image/upload/v1777401508/lap21_lggxob.webp'
WHERE id = 6;

UPDATE categories
SET name = 'Laptop cũ',
    description = 'Laptop đã qua sử dụng, giá tốt, phù hợp cho nhu cầu cơ bản và tiết kiệm chi phí',
    image_url = 'https://res.cloudinary.com/dquuquf93/image/upload/v1777401508/lapcu_vt1zd4.jpg'
WHERE id = 7;

-- ============================================
-- CẬP NHẬT SẢN PHẨM SANG TIẾNG VIỆT
-- ============================================
-- Gaming Laptops
UPDATE products SET description = 'Laptop gaming mạnh mẽ với RTX 4070',       specifications = 'RTX 4070, màn 144Hz IPS'        WHERE id = 1;
UPDATE products SET description = 'Laptop gaming tầm trung đáng tiền nhất',    specifications = 'RTX 3060, màn 144Hz'            WHERE id = 2;
UPDATE products SET description = 'Laptop gaming màn ProDisplay đỉnh cao',     specifications = 'RTX 4060, màn 165Hz'            WHERE id = 3;
UPDATE products SET description = 'Laptop gaming entry-level cho người mới',   specifications = 'RTX 4050, màn 144Hz'            WHERE id = 4;
UPDATE products SET description = 'Laptop gaming mỏng nhẹ sang trọng',         specifications = 'RTX 3060, màn 144Hz'            WHERE id = 5;
UPDATE products SET description = 'Chiến binh gaming bền bỉ chuẩn quân sự',   specifications = 'RTX 4060, màn 144Hz'            WHERE id = 6;
UPDATE products SET description = 'Laptop gaming OLED cao cấp nhất',           specifications = 'RTX 4070, màn 240Hz OLED'       WHERE id = 7;
UPDATE products SET description = 'Laptop gaming siêu mỏng hàng đầu',          specifications = 'RTX 4080, màn 240Hz'            WHERE id = 8;
UPDATE products SET description = 'Laptop gaming giá trị tốt nhất',            specifications = 'RTX 3050, màn 120Hz'            WHERE id = 9;
UPDATE products SET description = 'Quái vật gaming đỉnh cao nhất',             specifications = 'RTX 4090, màn 360Hz'            WHERE id = 10;
UPDATE products SET description = 'Laptop gaming mỏng nhẹ di động',            specifications = 'RTX 4060, màn OLED 120Hz'       WHERE id = 11;
UPDATE products SET description = 'Laptop gaming entry-level cho sinh viên',   specifications = 'RTX 3050, màn 120Hz'            WHERE id = 12;
UPDATE products SET description = 'Hiệu năng gaming nghiêm túc tầm trung',    specifications = 'RTX 4070, màn 165Hz'            WHERE id = 13;
UPDATE products SET description = 'Laptop gaming cao cấp dành cho pro',        specifications = 'RTX 4080, màn 165Hz'            WHERE id = 14;

-- Ultrabooks
UPDATE products SET description = 'Ultrabook cao cấp màn OLED 3.5K',           specifications = 'Màn OLED cảm ứng, thiết kế tương lai' WHERE id = 15;
UPDATE products SET description = 'Siêu nhẹ dưới 1kg, chuẩn quân sự',         specifications = 'Chứng nhận MIL-SPEC, pin 80Wh'        WHERE id = 16;
UPDATE products SET description = 'Ultrabook 2-trong-1 cao cấp màn OLED',      specifications = 'Màn OLED cảm ứng, bút stylus'         WHERE id = 17;
UPDATE products SET description = 'Ultrabook mỏng thanh lịch hàng ngày',       specifications = 'Màn IPS chống chói'                   WHERE id = 18;
UPDATE products SET description = 'Ultrabook AMOLED siêu mỏng',                specifications = 'Màn AMOLED 3K độ sáng cao'            WHERE id = 19;

-- MacBooks
UPDATE products SET description = 'Hiệu năng M2 không tiếng ồn hoàn toàn',    specifications = 'Chip M2, pin 18 tiếng'                WHERE id = 20;
UPDATE products SET description = 'Laptop sáng tạo chuyên nghiệp chip M3',    specifications = 'Chip M3 Pro, màn 120Hz ProMotion'     WHERE id = 21;
UPDATE products SET description = 'Workstation Mac di động tối thượng',        specifications = 'Chip M3 Max'                          WHERE id = 22;
UPDATE products SET description = 'MacBook giá tốt nhất, vẫn rất mạnh',       specifications = 'Chip M1, pin 18 tiếng'                WHERE id = 23;

-- Business Laptops
UPDATE products SET description = 'Laptop doanh nghiệp cao cấp nhất ThinkPad',specifications = 'Chứng nhận quân sự, bàn phím huyền thoại' WHERE id = 24;
UPDATE products SET description = 'Laptop doanh nghiệp bảo mật cao',          specifications = 'Wolf Security tích hợp sẵn'           WHERE id = 25;
UPDATE products SET description = 'Laptop doanh nghiệp bền bỉ đáng tin',      specifications = 'TPM 2.0, camera IR nhận mặt'          WHERE id = 26;
UPDATE products SET description = 'Laptop siêu bền dùng ngoài trời khắc nghiệt', specifications = 'Chuẩn IP65, pin 40 tiếng'         WHERE id = 27;

-- Budget Laptops
UPDATE products SET description = 'Laptop tầm trung tốt nhất cho sinh viên',  specifications = 'Màn FHD IPS, pin lâu'                 WHERE id = 28;
UPDATE products SET description = 'Laptop giá rẻ cho mọi nhu cầu cơ bản',    specifications = 'Hiệu năng ổn định toàn diện'          WHERE id = 29;
UPDATE products SET description = 'Laptop HP entry-level gọn nhẹ đẹp',        specifications = 'Thiết kế mỏng, phù hợp văn phòng'     WHERE id = 30;
UPDATE products SET description = 'Laptop mỏng viền siêu mỏng NanoEdge',      specifications = 'Màn NanoEdge viền siêu mỏng'          WHERE id = 31;
UPDATE products SET description = 'Laptop Dell phổ thông đáng tin cậy',       specifications = 'Nhiều cổng kết nối đa dạng'           WHERE id = 32;

-- 2-in-1 Convertibles
UPDATE products SET description = 'Laptop 2-trong-1 cao cấp màn 4K OLED',    specifications = 'Màn 4K OLED cảm ứng'                 WHERE id = 33;
UPDATE products SET description = 'Ultrabook 2-trong-1 compact màn OLED',     specifications = 'Màn OLED, bút S Pen'                  WHERE id = 34;
UPDATE products SET description = 'Máy tính bảng Windows mạnh nhất',          specifications = 'Màn PixelSense Flow 120Hz'            WHERE id = 35;
UPDATE products SET description = 'Laptop gập màn OLED kèm bút stylus',       specifications = 'Màn OLED 90Hz, bút stylus tích hợp'  WHERE id = 36;

-- Workstation Laptops
UPDATE products SET description = 'Workstation di động dành cho đồ họa',      specifications = 'GPU NVIDIA RTX A1000 chuyên nghiệp'   WHERE id = 37;
UPDATE products SET description = 'Workstation di động cao cấp nhất',         specifications = 'GPU NVIDIA RTX A4000'                 WHERE id = 38;
UPDATE products SET description = 'Workstation 16 inch hiệu năng cực mạnh',   specifications = 'NVIDIA GeForce RTX 3000 series'       WHERE id = 39;