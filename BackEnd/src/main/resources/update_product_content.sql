-- Cập nhật content chuyên nghiệp cho tất cả sản phẩm
-- Database: lapton
USE lapton;

-- ============================================================
-- GAMING LAPTOPS
-- ============================================================

-- ID 1: ASUS ROG Strix G15
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>ASUS ROG Strix G15 là đỉnh cao của dòng laptop gaming cấp độ cao, được trang bị GPU NVIDIA GeForce RTX 4070 và màn hình 144Hz — bộ đôi lý tưởng mang lại trải nghiệm chiến đấu mượt mà, sắc nét trong mọi tựa game AAA. Đây là lựa chọn không thể bỏ qua cho game thủ nghiêm túc đang tìm kiếm sức mạnh thực sự trong một thân máy tối ưu.</p>
</section>

<section class="product-design">
  <h2>Thiết kế & Kết cấu</h2>
  <p>Khung máy được chế tác từ hợp kim nhôm cao cấp, vừa chắc chắn vừa tạo cảm giác cao cấp khi cầm nắm. Bàn phím RGB per-key với 16 triệu màu sắc tùy chỉnh giúp bạn cá nhân hóa không gian làm việc theo phong cách riêng. Hệ thống tản nhiệt ROG Intelligent Cooling thông minh tự động điều chỉnh tốc độ quạt theo tải công việc, giữ máy luôn mát mẻ ngay cả trong những giờ chơi game dài hơi nhất.</p>
</section>

<section class="product-performance">
  <h2>Hiệu năng vượt trội</h2>
  <p>Bộ vi xử lý Intel Core i7-13650HX thế hệ 13 xử lý đa nhiệm mạnh mẽ mà không có dấu hiệu chậm trễ. Kết hợp cùng RTX 4070, máy duy trì FPS cao ổn định ở chế độ đồ họa Ultra trong các tựa game đòi hỏi như Cyberpunk 2077, Hogwarts Legacy hay Microsoft Flight Simulator — đảm bảo bạn luôn ở vị thế dẫn đầu trong mọi cuộc chiến.</p>
</section>
' WHERE id = 1;

-- ID 2: MSI Katana GF66
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>MSI Katana GF66 là câu trả lời hoàn hảo cho câu hỏi "laptop gaming tốt nhất trong tầm giá tầm trung". Với GPU NVIDIA GeForce RTX 3060 và màn hình Full HD 144Hz, chiếc máy này mang đến trải nghiệm gaming đáng tiền mà không yêu cầu bạn phải chi một khoản ngân sách khổng lồ.</p>
</section>

<section class="product-design">
  <h2>Thiết kế & Kết cấu</h2>
  <p>Diện mạo tối giản nhưng không kém phần mạnh mẽ với đường nét góc cạnh đặc trưng của dòng gaming MSI. Bàn phím đèn nền RGB đơn sắc đủ để tạo điểm nhấn thị giác mà vẫn giữ máy ở mức giá cạnh tranh. Thân máy được gia cố chắc chắn, chịu được cường độ sử dụng cao hàng ngày.</p>
</section>

<section class="product-performance">
  <h2>Hiệu năng vượt trội</h2>
  <p>Intel Core i5-12450H với 8 nhân, 12 luồng hoạt động mượt mà trong các tác vụ đa nhiệm. Kết hợp cùng RTX 3060, bạn hoàn toàn có thể chinh phục hầu hết các tựa game phổ thông ở mức cài đặt cao đến rất cao — từ Valorant, CS2 cho đến Elden Ring hay GTA V.</p>
</section>
' WHERE id = 2;

-- ID 3: Lenovo Legion 5 Pro
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>Lenovo Legion 5 Pro được thiết kế dành cho những game thủ đặt chất lượng hình ảnh lên hàng đầu. Màn hình WQXGA 165Hz kết hợp GPU RTX 4060 tạo ra khung hình sắc nét, chi tiết đến từng điểm ảnh — lý tưởng cho cả gaming lẫn sáng tạo nội dung.</p>
</section>

<section class="product-display">
  <h2>Màn hình đỉnh cao</h2>
  <p>Tấm nền 16 inch WQXGA (2560×1600) với tần số quét 165Hz và độ phủ màu 100% sRGB đem lại hình ảnh vừa siêu mượt vừa cực kỳ trung thực. Tỷ lệ 16:10 mở rộng vùng hiển thị theo chiều dọc, giúp bạn thấy nhiều hơn trong game và làm việc hiệu quả hơn.</p>
</section>

<section class="product-performance">
  <h2>Hiệu năng vượt trội</h2>
  <p>AMD Ryzen 7 7745HX với kiến trúc Zen 4 tiên tiến mang lại hiệu năng đơn nhân và đa nhân xuất sắc. Hệ thống tản nhiệt Legion Coldfront 5.0 với hai quạt và bốn ống đồng dẫn nhiệt giữ nhiệt độ CPU và GPU trong ngưỡng an toàn ngay cả khi chạy full load liên tục nhiều giờ.</p>
</section>
' WHERE id = 3;

-- ID 4: Acer Nitro 5 2023
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>Acer Nitro 5 2023 là cánh cửa dẫn bạn bước vào thế giới gaming một cách nhẹ nhàng nhất về mặt tài chính. Được trang bị GPU NVIDIA GeForce RTX 4050 với kiến trúc Ada Lovelace mới nhất, chiếc laptop này mang lại hiệu năng gaming thực sự ở mức giá phải chăng.</p>
</section>

<section class="product-design">
  <h2>Thiết kế & Kết cấu</h2>
  <p>Ngôn ngữ thiết kế gaming rõ nét với các đường cạnh góc cạnh và lưới tản nhiệt kích thước lớn ở mặt sau — không chỉ là yếu tố thẩm mỹ mà còn đảm bảo luồng khí lưu thông hiệu quả. Bàn phím RGB 4 vùng giúp bạn dễ dàng tùy chỉnh theo sở thích.</p>
</section>

<section class="product-performance">
  <h2>Hiệu năng vượt trội</h2>
  <p>Intel Core i5-13420H thế hệ 13 với hiệu năng hybrid core xử lý đa nhiệm mượt mà — từ chơi game, stream trực tiếp cho đến các tác vụ văn phòng hàng ngày. RTX 4050 hỗ trợ công nghệ DLSS 3 và Ray Tracing, mang lại chất lượng đồ họa vượt trội so với thế hệ trước trong cùng phân khúc giá.</p>
</section>
' WHERE id = 4;

-- ID 5: HP Victus 16
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>HP Victus 16 phá vỡ định kiến rằng laptop gaming phải cồng kềnh và nặng nề. Chiếc máy này kết hợp thiết kế mỏng nhẹ, thanh lịch với hiệu năng gaming thực chiến từ GPU RTX 3060 — phù hợp cho cả những ai cần một chiếc laptop đa năng vừa dùng để làm việc, vừa gaming sau giờ tan sở.</p>
</section>

<section class="product-display">
  <h2>Màn hình sắc nét</h2>
  <p>Màn hình 16.1 inch Full HD với tần số quét 144Hz đảm bảo mọi chuyển động trong game đều được tái tạo mượt mà, không bị xé hình hay bóng mờ. Kích thước 16 inch cân bằng hoàn hảo giữa không gian làm việc rộng rãi và khả năng di động.</p>
</section>

<section class="product-battery">
  <h2>Thời lượng pin</h2>
  <p>Pin dung lượng 70Wh cho phép sử dụng cả ngày ở chế độ văn phòng và duyệt web mà không cần cắm sạc. Khi chuyển sang chế độ gaming, bộ sạc kèm theo nạp đầy nhanh chóng để bạn không bị gián đoạn giữa trận đấu quan trọng.</p>
</section>
' WHERE id = 5;

-- ID 6: ASUS TUF Gaming A15
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>ASUS TUF Gaming A15 được sinh ra để chinh phục mọi điều kiện khắc nghiệt. Đạt chứng nhận quân sự MIL-STD-810H, laptop này không chỉ mạnh về hiệu năng gaming với RTX 4060 mà còn được xây dựng để đồng hành cùng bạn qua mọi thử thách — dù là trong phòng game hay ngoài thực địa.</p>
</section>

<section class="product-durability">
  <h2>Độ bền & Độ tin cậy</h2>
  <p>Trải qua 8 bài kiểm tra khắt khe theo tiêu chuẩn MIL-STD-810H bao gồm thử nghiệm chịu nhiệt độ cực đoan, rung động, độ ẩm và va đập. Bàn phím được thiết kế chịu được 20 triệu lần gõ phím — đủ để bạn sử dụng hàng chục năm mà không lo mài mòn.</p>
</section>

<section class="product-performance">
  <h2>Hiệu năng vượt trội</h2>
  <p>AMD Ryzen 5 7535HS với kiến trúc Zen 3+ cân bằng xuất sắc giữa hiệu năng và tiết kiệm điện, giúp máy duy trì nhiệt độ thấp ngay cả trong thân máy tương đối mỏng nhẹ. RTX 4060 hỗ trợ đầy đủ DLSS 3, Frame Generation và Ray Tracing — nâng tầm trải nghiệm gaming lên một đẳng cấp hoàn toàn mới.</p>
</section>
' WHERE id = 6;

-- ID 7: Gigabyte AORUS 15
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>Gigabyte AORUS 15 là biểu tượng của sự xa xỉ trong gaming laptop với màn hình OLED 240Hz — công nghệ hiển thị cao cấp nhất hiện nay. Kết hợp cùng GPU RTX 4070, đây là lựa chọn dành cho những game thủ không chấp nhận thỏa hiệp về chất lượng.</p>
</section>

<section class="product-display">
  <h2>Màn hình OLED đỉnh cao</h2>
  <p>Tấm nền OLED 15.6 inch với tần số quét 240Hz mang đến hai lợi thế tuyệt đối: độ tương phản vô cực với màu đen sâu hoàn hảo từ công nghệ OLED, và chuyển động cực kỳ mượt mà với 240 khung hình mỗi giây. Màu sắc sống động đạt chuẩn DCI-P3 khiến mọi khung cảnh game trở nên sống động như thật.</p>
</section>

<section class="product-performance">
  <h2>Hiệu năng vượt trội</h2>
  <p>Intel Core i9-13980HX — CPU di động mạnh nhất của Intel — kết hợp với RTX 4070 tạo thành bộ đôi không có đối thủ trong phân khúc. Mọi tựa game ở cài đặt Ultra hay tác vụ render đồ họa nặng đều được xử lý với sự tự tin tuyệt đối.</p>
</section>
' WHERE id = 7;

-- ID 8: Razer Blade 15
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>Razer Blade 15 định nghĩa lại giới hạn của laptop gaming — mỏng nhất thế giới trong phân khúc hiệu năng cao với RTX 4080. Đây không chỉ là một chiếc laptop gaming; đây là một tuyên ngôn về đẳng cấp và phong cách dành cho những ai muốn có tất cả trong một thân máy duy nhất.</p>
</section>

<section class="product-design">
  <h2>Thiết kế đẳng cấp</h2>
  <p>Vỏ máy được phay CNC nguyên khối từ khối nhôm hàng không vũ trụ, tạo ra kết cấu cứng chắc và bề mặt hoàn thiện không tỳ vết. Với độ mỏng chỉ 16.99mm và trọng lượng 2.01kg — nhẹ đến mức khó tin với một chiếc máy mang RTX 4080 bên trong — Razer Blade 15 là chiếc laptop gaming duy nhất bạn có thể mang đến cuộc họp mà không ai biết đó là máy gaming.</p>
</section>

<section class="product-performance">
  <h2>Hiệu năng workstation</h2>
  <p>Intel Core i9-13950HX với 24 nhân xử lý kết hợp cùng RTX 4080 16GB GDDR6 mang lại hiệu năng ngang tầm máy trạm chuyên nghiệp. Từ gaming 4K, chỉnh sửa video 8K, đến AI rendering — không có tác vụ nào có thể làm khó chiếc máy này.</p>
</section>
' WHERE id = 8;

-- ID 9: Dell G15 Gaming
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>Dell G15 Gaming là lựa chọn thông minh cho những ai mới bắt đầu hành trình gaming và muốn trải nghiệm thực sự mà không cần đầu tư lớn. Với GPU RTX 3050 và màn hình 120Hz, chiếc laptop này đảm bảo bạn có thể tận hưởng các tựa game phổ biến một cách mượt mà và đáng tin cậy.</p>
</section>

<section class="product-value">
  <h2>Giá trị tối ưu</h2>
  <p>Dell G15 cung cấp nền tảng gaming vững chắc ở mức giá entry-level: màn hình 120Hz đủ mượt cho hầu hết thể loại game, RTX 3050 hỗ trợ DLSS để tăng FPS, và thương hiệu Dell nổi tiếng với dịch vụ bảo hành đáng tin cậy. Đây là điểm khởi đầu lý tưởng trên con đường gaming của bạn.</p>
</section>
' WHERE id = 9;

-- ID 10: MSI Raider GE76
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>MSI Raider GE76 không phải laptop gaming — đây là siêu máy tính di động. Trang bị GPU NVIDIA GeForce RTX 4090 laptop — GPU mạnh nhất từng được tích hợp vào laptop — và màn hình 360Hz, chiếc máy này được tạo ra dành riêng cho game thủ chuyên nghiệp và những ai không chấp nhận bất kỳ giới hạn nào.</p>
</section>

<section class="product-performance">
  <h2>Sức mạnh tột đỉnh</h2>
  <p>Bộ ba quyền năng bao gồm RTX 4090 với 16GB GDDR6, Intel Core i9-13980HX 24 nhân, và 64GB DDR5 RAM tạo nên một cỗ máy không có tác vụ nào có thể khuất phục. Render 3D thời gian thực, AI training, hay gaming 4K Ultra đều được xử lý với biên độ hiệu năng dư dả.</p>
</section>

<section class="product-display">
  <h2>Màn hình dành cho competitive</h2>
  <p>Màn hình 17.3 inch Full HD 360Hz được tối ưu đặc biệt cho gaming competitive — tốc độ phản hồi cực nhanh, ghosting gần như bằng 0, và 360 khung hình mỗi giây giúp bạn luôn nhận biết đối thủ trước họ nhận biết bạn. Đây là vũ khí tối thượng trong FPS và MOBA.</p>
</section>
' WHERE id = 10;

-- ID 11: ASUS ROG Zephyrus G14
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>ASUS ROG Zephyrus G14 là minh chứng rằng laptop gaming mạnh mẽ không nhất thiết phải to và nặng. Nặng chỉ 1.65kg với màn hình OLED 120Hz và chip AMD Ryzen 9, đây là chiếc laptop gaming mỏng nhẹ nhất thế giới trong phân khúc hiệu năng cao — hoàn hảo cho game thủ luôn di chuyển.</p>
</section>

<section class="product-design">
  <h2>Thiết kế độc bản</h2>
  <p>Nắp máy AniMe Matrix với hàng nghìn đèn LED mini có thể lập trình để hiển thị hình ảnh, chữ viết, hay hiệu ứng ánh sáng tùy chỉnh — biến chiếc laptop của bạn thành một tác phẩm nghệ thuật độc nhất. Không một laptop gaming nào khác có được cá tính mạnh mẽ đến vậy.</p>
</section>

<section class="product-battery">
  <h2>Pin lâu cho game thủ di động</h2>
  <p>Pin 76Wh với hỗ trợ sạc nhanh 100W qua USB-C cho phép nạp đầy trong khoảng 1.5 giờ. Ở chế độ làm việc văn phòng, pin có thể kéo dài cả ngày làm việc — giúp bạn không phải lo tìm ổ cắm mỗi khi ra ngoài.</p>
</section>
' WHERE id = 11;

-- ID 12: Lenovo IdeaPad Gaming 3
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>Lenovo IdeaPad Gaming 3 được thiết kế đặc biệt dành cho sinh viên và người dùng trẻ muốn khám phá gaming mà không cần chi tiêu vượt ngân sách. Với AMD Ryzen 5 và NVIDIA RTX 3050, chiếc máy này mang đến trải nghiệm gaming ổn định ở một trong những mức giá cạnh tranh nhất thị trường.</p>
</section>

<section class="product-value">
  <h2>Giá trị tối ưu cho sinh viên</h2>
  <p>Lenovo IdeaPad Gaming 3 không chỉ là laptop gaming — đây là người bạn đồng hành đa năng cho cuộc sống sinh viên: đủ mạnh để xử lý đồ án lập trình, chỉnh sửa ảnh cơ bản, và chiến game sau giờ học. Thương hiệu Lenovo với lịch sử lâu đời đảm bảo chất lượng và dịch vụ hậu mãi đáng tin cậy.</p>
</section>
' WHERE id = 12;

-- ID 13: Acer Predator Helios 300
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>Acer Predator Helios 300 tiếp tục khẳng định vị thế là một trong những laptop gaming có giá trị tốt nhất phân khúc cao cấp. Với GPU RTX 4070 và màn hình 165Hz, đây là chiếc máy mà bạn sẽ không phải upgrade sớm — nó đủ mạnh để phục vụ bạn trong nhiều năm tới.</p>
</section>

<section class="product-cooling">
  <h2>Hệ thống tản nhiệt tiên tiến</h2>
  <p>Hệ thống tản nhiệt thế hệ thứ 5 AeroBlade 3D Fan với cánh quạt siêu mỏng và nhiều hơn tạo ra luồng khí mạnh mẽ hơn trong không gian nhỏ hơn. Kết quả là máy duy trì nhiệt độ ổn định và hiệu năng không bị throttle ngay cả khi chạy full load liên tục trong các buổi gaming marathon.</p>
</section>
' WHERE id = 13;

-- ID 14: HP OMEN 16
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>HP OMEN 16 là lựa chọn đỉnh cao cho game thủ chuyên nghiệp với bộ đôi Intel Core i9 và NVIDIA RTX 4080. Được tối ưu hóa cho hiệu năng gaming cao nhất, chiếc laptop này xứng đáng mang danh hiệu flagship trong dòng OMEN của HP.</p>
</section>

<section class="product-display">
  <h2>Màn hình gaming chuyên nghiệp</h2>
  <p>Màn hình 16.1 inch Full HD 165Hz được hiệu chỉnh màu từ nhà máy, đạt chuẩn sRGB rộng, mang lại hình ảnh sắc nét và màu sắc trung thực. Độ sáng cao đảm bảo bạn nhìn rõ mọi chi tiết ngay cả trong môi trường có nhiều ánh sáng môi trường xung quanh.</p>
</section>
' WHERE id = 14;

-- ============================================================
-- ULTRABOOKS / LAPTOPS VĂN PHÒNG
-- ============================================================

-- ID 15: Dell XPS 13 Plus
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>Dell XPS 13 Plus không phải là ultrabook — đây là tầm nhìn về tương lai của laptop cá nhân. Với màn hình OLED 3.5K và thiết kế táo bạo loại bỏ mọi yếu tố thừa thãi, đây là chiếc laptop dành cho những người tiên phong muốn sống phía trước của thời đại.</p>
</section>

<section class="product-design">
  <h2>Thiết kế tương lai</h2>
  <p>Bàn phím ẩn hoàn toàn phẳng lặng với đèn nền LED bên dưới kính cường lực, touchpad mở rộng tràn viền tích hợp phím Function ảo — mọi thứ đều được thiết kế lại từ đầu. Không có cổng thừa, không có chi tiết dư, chỉ còn lại sự thuần khiết trong thiết kế.</p>
</section>

<section class="product-display">
  <h2>Màn hình OLED siêu sắc nét</h2>
  <p>Tấm nền OLED 13.4 inch với độ phân giải 3.5K (3456×2160) và độ phủ màu 100% DCI-P3 mang lại hình ảnh sắc nét đến từng chi tiết nhỏ nhất. Màu sắc chuẩn xác hoàn hảo, màu đen sâu tuyệt đối — lý tưởng cho nhiếp ảnh gia, nhà thiết kế và những ai đòi hỏi màn hình tốt nhất.</p>
</section>
' WHERE id = 15;

-- ID 16: LG Gram 14
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>LG Gram 14 giải quyết triệt để bài toán nan giải nhất của người dùng di động: làm thế nào để có một chiếc laptop nhẹ nhất có thể mà vẫn đủ mạnh, đủ bền và pin đủ lâu. Với trọng lượng chưa đến 1kg và chứng nhận MIL-SPEC, câu trả lời là: LG Gram 14.</p>
</section>

<section class="product-portability">
  <h2>Siêu nhẹ, siêu di động</h2>
  <p>Chỉ 980 gram — nhẹ hơn hầu hết các tablet có bàn phím — LG Gram 14 là chiếc laptop 14 inch nhẹ nhất phân khúc. Mang theo cả ngày trong ba lô hay túi xách mà không hề cảm thấy nặng nề, kể cả những chuyến đi dài hay lịch công tác dày đặc.</p>
</section>

<section class="product-battery">
  <h2>Pin cả ngày làm việc</h2>
  <p>Pin 80Wh cho hơn 13 tiếng sử dụng thực tế — đủ để bạn làm việc từ sáng đến tối mà không cần tìm ổ cắm. Chứng nhận MIL-STD-810H đảm bảo máy chịu được sốc nhiệt, rung động và va đập trong điều kiện di chuyển thực tế.</p>
</section>
' WHERE id = 16;

-- ID 17: HP Spectre x360 14
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>HP Spectre x360 14 là đỉnh cao của dòng laptop 2-in-1 cao cấp — sang trọng trong từng đường nét, thông minh trong từng tính năng. Màn hình OLED 3K2K cảm ứng kết hợp bút stylus tích hợp sẵn biến chiếc máy này thành studio sáng tạo di động hoàn chỉnh.</p>
</section>

<section class="product-versatility">
  <h2>Đa năng không giới hạn</h2>
  <p>Bản lề 360 độ cho phép bạn chuyển đổi linh hoạt giữa 4 chế độ sử dụng: Laptop cho công việc đòi hỏi bàn phím, Tablet cho vẽ và ghi chú, Tent cho xem phim và thuyết trình, Stand cho video call. Một thiết bị, vô số tình huống sử dụng.</p>
</section>
' WHERE id = 17;

-- ID 18: Lenovo Yoga Slim 7i
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>Lenovo Yoga Slim 7i được thiết kế cho những người dùng hiện đại coi trọng cả thẩm mỹ lẫn hiệu quả. Thân máy nhôm mỏng chỉ 14.9mm với trọng lượng 1.36kg và màu sắc thời thượng — đây là chiếc laptop bạn tự hào mang ra ở bất kỳ đâu.</p>
</section>

<section class="product-design">
  <h2>Thiết kế tinh tế</h2>
  <p>Vỏ nhôm được gia công tỉ mỉ với bề mặt mờ sang trọng, cạnh vát tinh tế và tỷ lệ màn hình cao giúp máy trông nhỏ gọn hơn thực tế. Màu sắc được chọn lọc kỹ lưỡng để phù hợp với cả phong cách chuyên nghiệp lẫn cá tính trẻ trung.</p>
</section>
' WHERE id = 18;

-- ID 19: Samsung Galaxy Book3 Pro
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>Samsung Galaxy Book3 Pro mang công nghệ màn hình AMOLED đỉnh cao từ dòng điện thoại Galaxy lên laptop, tạo ra trải nghiệm hiển thị chưa từng có trong phân khúc ultrabook. Đây là lựa chọn lý tưởng cho người dùng trong hệ sinh thái Samsung muốn đồng bộ liền mạch giữa điện thoại và laptop.</p>
</section>

<section class="product-display">
  <h2>Màn hình AMOLED 3K đặc trưng Samsung</h2>
  <p>Tấm nền Dynamic AMOLED 2X 14 inch với độ phân giải 3K (2880×1800) mang đến màu sắc rực rỡ, độ tương phản vô cực và màu đen sâu tuyệt đối — những đặc tính mà chỉ công nghệ AMOLED mới có thể cung cấp. Đồng thời, tiêu thụ điện năng thấp hơn đáng kể so với tấm nền IPS truyền thống.</p>
</section>
' WHERE id = 19;

-- ============================================================
-- APPLE MACBOOKS
-- ============================================================

-- ID 20: Apple MacBook Air M2
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>Apple MacBook Air M2 đặt lại chuẩn mực cho laptop phổ thông cao cấp — im lặng tuyệt đối không quạt tản nhiệt, hiệu năng chip M2 vượt qua nhiều laptop gaming Windows, và thời lượng pin 18 tiếng thực tế. Đây là chiếc laptop hoàn hảo nhất cho đại đa số người dùng hiện nay.</p>
</section>

<section class="product-chip">
  <h2>Chip Apple M2 — Thế hệ mới</h2>
  <p>Chip M2 với CPU 8 nhân, GPU 10 nhân và Neural Engine 16 nhân được sản xuất trên tiến trình 5nm thế hệ 2. Nhanh hơn 40% so với M1 trong CPU đơn nhân và nhanh hơn 35% trong GPU — vượt mặt nhiều laptop Windows trong cùng phân khúc giá khi xử lý ảnh, video và tác vụ sáng tạo.</p>
</section>

<section class="product-battery">
  <h2>Pin 18 tiếng — Thực sự cả ngày</h2>
  <p>18 tiếng sử dụng thực tế không phải con số lý thuyết từ phòng thí nghiệm — đây là thời lượng pin được Apple kiểm chứng và người dùng thực tế xác nhận. Sạc MagSafe tiện lợi và sạc qua USB-C linh hoạt cho phép bạn nạp năng lượng theo cách phù hợp nhất với bạn.</p>
</section>

<section class="product-design">
  <h2>Thiết kế mới, màu sắc mới</h2>
  <p>Thiết kế lại hoàn toàn với độ mỏng chỉ 11.3mm và trọng lượng 1.24kg — mỏng hơn và nhẹ hơn MacBook Air M1. Bốn lựa chọn màu sắc mới: Starlight, Midnight, Space Gray và Silver — cùng notch chứa camera FaceTime 1080p chất lượng cao hơn đáng kể so với thế hệ trước.</p>
</section>
' WHERE id = 20;

-- ID 21: Apple MacBook Pro 14 M3 Pro
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>Apple MacBook Pro 14 M3 Pro được thiết kế dành riêng cho các chuyên gia sáng tạo — nhà làm phim, nhiếp ảnh gia, nhạc sĩ, nhà phát triển — những người cần sức mạnh thực sự trong một thân máy di động. Chip M3 Pro và màn hình Liquid Retina XDR 120Hz tạo nên công cụ sáng tạo hoàn hảo nhất từ trước đến nay.</p>
</section>

<section class="product-chip">
  <h2>Chip Apple M3 Pro — Sức mạnh chuyên nghiệp</h2>
  <p>CPU 11 nhân (5P + 6E) và GPU 14 nhân với băng thông bộ nhớ 150GB/s — nhanh hơn gấp đôi MacBook Air M2 trong các tác vụ render video và xử lý ảnh RAW. Hardware-accelerated ray tracing và mesh shading lần đầu tiên xuất hiện trên chip Apple mang đến đồ họa 3D chuyên nghiệp ngay trong laptop.</p>
</section>

<section class="product-display">
  <h2>Màn hình Liquid Retina XDR</h2>
  <p>14.2 inch Liquid Retina XDR với ProMotion 120Hz tự động điều chỉnh tần số từ 24Hz đến 120Hz để cân bằng chất lượng hình ảnh và tiêu thụ pin. Độ sáng peak 1600 nit cho HDR content, 1000 nit sustained cho SDR — màu sắc chuẩn P3, chính xác như màn hình chuyên nghiệp studio.</p>
</section>

<section class="product-connectivity">
  <h2>Kết nối đầy đủ cho chuyên gia</h2>
  <p>Ba cổng Thunderbolt 4, HDMI 2.1 hỗ trợ màn hình 8K, đầu đọc thẻ SD UHS-II tốc độ cao, và MagSafe 3 sạc nhanh 140W — MacBook Pro 14 M3 Pro là chiếc laptop Apple duy nhất có đủ cổng kết nối để làm việc chuyên nghiệp mà không cần hub hay adapter.</p>
</section>
' WHERE id = 21;

-- ID 22: Apple MacBook Pro 16 M3 Max
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>Apple MacBook Pro 16 M3 Max là laptop mạnh nhất Apple từng tạo ra — một workstation di động thực sự có thể thay thế hoàn toàn máy trạm để bàn cao cấp. Dành cho các chuyên gia sáng tạo cấp cao cần sức mạnh tối đa: nhà làm phim 3D, kỹ sư AI/ML, nhà phát triển phần mềm lớn.</p>
</section>

<section class="product-chip">
  <h2>Chip Apple M3 Max — Đỉnh cao silicon</h2>
  <p>CPU 14 nhân (10P + 4E) và GPU 30 nhân với băng thông bộ nhớ 300GB/s — nhanh gấp đôi M3 Pro và vượt mặt nhiều workstation để bàn cao cấp. RAM Unified Memory lên đến 128GB được chia sẻ liền mạch giữa CPU, GPU và Neural Engine, xóa bỏ mọi bottleneck truyền thống.</p>
</section>

<section class="product-display">
  <h2>Màn hình 16.2 inch Liquid Retina XDR</h2>
  <p>Tấm nền Liquid Retina XDR 16.2 inch với ProMotion 120Hz, HDR1000 và chuẩn màu P3 wide color — đây là màn hình tốt nhất từng được tích hợp vào một chiếc laptop. Rộng đủ để làm việc với timeline phức tạp, đủ sắc nét để phê duyệt màu sắc cuối cùng trực tiếp trên máy.</p>
</section>
' WHERE id = 22;

-- ID 23: Apple MacBook Air M1
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>Apple MacBook Air M1 là chiếc laptop đã thay đổi tất cả — khi ra mắt năm 2020, nó lật đổ hoàn toàn những gì người ta nghĩ về hiệu năng laptop phổ thông. Đến ngày nay, MacBook Air M1 vẫn là một trong những laptop có giá trị tốt nhất thị trường, đặc biệt cho sinh viên và người dùng phổ thông.</p>
</section>

<section class="product-chip">
  <h2>Chip Apple M1 — Cuộc cách mạng</h2>
  <p>M1 là chip Apple Silicon đầu tiên dành cho Mac, đánh dấu sự chuyển đổi lịch sử từ Intel sang ARM. CPU 8 nhân và GPU 7/8 nhân xử lý mượt mà mọi tác vụ văn phòng, duyệt web, xem phim, chỉnh ảnh cơ bản và lập trình — mà không cần quạt tản nhiệt, im lặng hoàn toàn.</p>
</section>

<section class="product-value">
  <h2>Giá trị tốt nhất trong dòng MacBook</h2>
  <p>Với mức giá thấp nhất trong dòng MacBook hiện tại, MacBook Air M1 vẫn mang lại đầy đủ trải nghiệm Apple: macOS ổn định và bảo mật, hệ sinh thái Apple liền mạch, chất lượng build cao cấp, và hỗ trợ phần mềm dài hạn. Lựa chọn thông minh nhất cho sinh viên và người dùng chuyển từ Windows sang Mac.</p>
</section>
' WHERE id = 23;

-- ============================================================
-- LAPTOPS DOANH NGHIỆP
-- ============================================================

-- ID 24: Lenovo ThinkPad X1 Carbon
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>Lenovo ThinkPad X1 Carbon là tiêu chuẩn vàng của laptop doanh nghiệp — được tin dùng bởi các CEO, kỹ sư và chuyên gia tư vấn trên toàn thế giới trong hơn ba thập kỷ. Với chứng nhận MIL-SPEC và bàn phím ThinkPad huyền thoại, đây là công cụ làm việc chuyên nghiệp đáng tin cậy nhất trên thị trường.</p>
</section>

<section class="product-security">
  <h2>Bảo mật cấp doanh nghiệp</h2>
  <p>Tích hợp Intel vPro cho quản lý và bảo mật từ xa cấp phần cứng, TPM 2.0 bảo vệ khóa mã hóa, camera IR nhận diện khuôn mặt Windows Hello, và tùy chọn màn hình Privacy Guard tích hợp chống nhìn trộm. Mọi thứ cần thiết để bảo vệ dữ liệu nhạy cảm của doanh nghiệp đều đã có sẵn trong máy.</p>
</section>

<section class="product-keyboard">
  <h2>Bàn phím ThinkPad huyền thoại</h2>
  <p>Được bình chọn là bàn phím laptop tốt nhất thế giới nhiều năm liên tiếp bởi các chuyên gia đánh giá — hành trình phím sâu 1.5mm, phản hồi rõ ràng, gõ êm mà vẫn chính xác. Nếu bạn gõ hàng nghìn từ mỗi ngày, không bàn phím laptop nào tốt hơn ThinkPad.</p>
</section>
' WHERE id = 24;

-- ID 25: HP EliteBook 840 G9
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>HP EliteBook 840 G9 với HP Wolf Security là giải pháp laptop doanh nghiệp toàn diện nhất cho môi trường bảo mật cao. Được thiết kế đặc biệt cho các tổ chức tài chính, luật pháp, y tế và chính phủ — nơi bảo mật thông tin là ưu tiên số một tuyệt đối.</p>
</section>

<section class="product-security">
  <h2>HP Wolf Security — Bảo vệ tầng sâu nhất</h2>
  <p>HP Wolf Security bảo vệ máy từ tầng firmware dưới BIOS — lớp bảo mật mà hầu hết phần mềm antivirus không thể đạt tới. Camera webcam trang bị nắp che vật lý tích hợp sẵn, microphone kill switch phần cứng và bàn phím chống nhìn trộm tùy chọn — mọi vector tấn công đều được bịt kín.</p>
</section>
' WHERE id = 25;

-- ID 26: Dell Latitude 5430
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>Dell Latitude 5430 là xương sống của fleet laptop doanh nghiệp hiện đại — đáng tin cậy, dễ quản lý và đủ mạnh cho mọi tác vụ văn phòng. Được thiết kế với IT administrator trong tâm trí, chiếc laptop này giúp giảm chi phí vận hành và tăng năng suất toàn tổ chức.</p>
</section>

<section class="product-management">
  <h2>Quản lý từ xa hiệu quả</h2>
  <p>Hỗ trợ đầy đủ Intel vPro cho phép IT admin triển khai phần mềm, vá lỗi bảo mật, khắc phục sự cố và xóa dữ liệu từ xa — ngay cả khi máy đang tắt hoặc hệ điều hành bị hỏng. TPM 2.0 đảm bảo mã hóa ổ cứng BitLocker hoạt động ở hiệu năng tối đa.</p>
</section>
' WHERE id = 26;

-- ID 27: Panasonic Toughbook 55
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>Panasonic Toughbook 55 không phải laptop thông thường — đây là thiết bị điện toán được thiết kế để hoạt động khi mọi laptop khác đã bỏ cuộc. Dành cho lực lượng quân sự, cảnh sát, cứu hỏa, công trường xây dựng và mọi môi trường mà thiết bị điện tử thông thường không thể sống sót.</p>
</section>

<section class="product-durability">
  <h2>Độ bền không thể phá vỡ</h2>
  <p>Đạt chuẩn IP65 chống bụi và tia nước mạnh hoàn toàn, chịu được rơi từ độ cao 76cm xuống bê tông, hoạt động liên tục trong nhiệt độ từ -29°C đến 60°C. Màn hình tăng cường chống phản chiếu có thể đọc được dưới ánh nắng trực tiếp — những tính năng không thể thiếu ở hiện trường.</p>
</section>

<section class="product-battery">
  <h2>Pin hot-swap — Không bao giờ ngừng</h2>
  <p>Công nghệ hot-swap pin độc đáo cho phép thay pin đang sử dụng mà không cần tắt máy — quan trọng sống còn khi bạn đang ở hiện trường không có điện. Với pin mở rộng, thời lượng lên đến 40 tiếng — đủ cho hai ngày làm việc liên tục trong điều kiện dã chiến.</p>
</section>
' WHERE id = 27;

-- ============================================================
-- LAPTOPS PHỔ THÔNG / SINH VIÊN
-- ============================================================

-- ID 28: Acer Aspire 5 2023
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>Acer Aspire 5 2023 giải quyết bài toán muôn thuở của sinh viên: cần một chiếc laptop đủ mạnh cho học tập và giải trí, màn hình đẹp để học lâu không mỏi mắt, và pin đủ lâu để không phải mang sạc đến trường — tất cả ở mức giá phải chăng nhất có thể.</p>
</section>

<section class="product-performance">
  <h2>Hiệu năng phù hợp sinh viên</h2>
  <p>AMD Ryzen 5 5500U với 6 nhân 12 luồng xử lý mượt mà mọi tác vụ học tập: lập trình đa ngôn ngữ, chỉnh sửa ảnh cơ bản, xử lý văn bản và bảng tính, thuyết trình, và xem phim giải trí sau giờ học. Đồ họa AMD Radeon tích hợp đủ để chơi các tựa game nhẹ trong giờ nghỉ.</p>
</section>

<section class="product-battery">
  <h2>Pin cả ngày đến trường</h2>
  <p>Pin 57.5Wh duy trì 8–10 tiếng sử dụng thực tế — đủ để trải qua một ngày học dài với các buổi học trực tuyến, nghiên cứu tài liệu và làm bài tập mà không cần tìm ổ cắm. Màn hình IPS Full HD giảm mỏi mắt đáng kể so với tấm nền TN thường thấy ở phân khúc này.</p>
</section>
' WHERE id = 28;

-- ID 29: Lenovo IdeaPad 3
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>Lenovo IdeaPad 3 chứng minh rằng không cần phải chi nhiều tiền mới có được một chiếc laptop tốt. Với mức giá dưới 9 triệu đồng và thương hiệu Lenovo uy tín, đây là lựa chọn thực dụng và thông minh nhất cho học sinh, sinh viên hay người dùng cần laptop cho các tác vụ cơ bản hàng ngày.</p>
</section>

<section class="product-value">
  <h2>Giá trị thực dụng tối đa</h2>
  <p>Lenovo IdeaPad 3 đáp ứng đầy đủ nhu cầu thiết yếu: duyệt web và mạng xã hội mượt mà, xử lý văn bản và bảng tính Office, xem phim và video chất lượng Full HD, tham gia học trực tuyến qua Zoom hay Google Meet. Bảo hành chính hãng Lenovo và hệ thống trung tâm bảo hành rộng khắp mang lại sự an tâm lâu dài.</p>
</section>
' WHERE id = 29;

-- ID 30: HP 15s-fq5000TU
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>HP 15s-fq5000TU mang phong cách thanh lịch đặc trưng của HP vào phân khúc entry-level — chứng minh rằng laptop giá tốt không nhất thiết phải trông rẻ tiền. Thiết kế mỏng nhẹ gọn gàng, màu bạc sang trọng, phù hợp không chỉ cho học sinh sinh viên mà cả nhân viên văn phòng cần một chiếc máy cơ bản đáng tin cậy.</p>
</section>

<section class="product-design">
  <h2>Thiết kế vượt tầm giá</h2>
  <p>Thân máy mỏng chỉ 17.9mm tạo ấn tượng cao cấp ngay từ cái nhìn đầu tiên. Màu Natural Silver nhẹ nhàng và chuyên nghiệp phù hợp với mọi môi trường từ lớp học đến văn phòng. Bàn phím full-size thoải mái cho gõ văn bản lâu dài mà không mỏi tay.</p>
</section>
' WHERE id = 30;

-- ID 31: ASUS VivoBook 15
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>ASUS VivoBook 15 kết hợp màn hình NanoEdge viền siêu mỏng ấn tượng với hiệu năng AMD Ryzen 5 thực dụng, tạo nên chiếc laptop hợp lý nhất cho học sinh và sinh viên muốn có trải nghiệm hiển thị tốt hơn mức giá thông thường.</p>
</section>

<section class="product-display">
  <h2>Màn hình NanoEdge tràn viền</h2>
  <p>Công nghệ NanoEdge Display với viền màn hình chỉ 5.7mm tạo tỷ lệ màn hình trên thân máy đạt 82% — rộng hơn đáng kể so với laptop cùng kích thước thân máy. Màn hình Full HD IPS 15.6 inch cho góc nhìn rộng và màu sắc chính xác, lý tưởng cho học trực tuyến, xem phim và làm việc đa tab.</p>
</section>
' WHERE id = 31;

-- ID 32: Dell Inspiron 15
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>Dell Inspiron 15 tiếp tục di sản của một trong những dòng laptop phổ thông được tin dùng nhiều nhất thế giới. Được hỗ trợ bởi thương hiệu Dell với hơn 35 năm kinh nghiệm, đây là lựa chọn an toàn và đáng tin cậy cho mọi gia đình, học sinh và người dùng cần laptop đầu tiên.</p>
</section>

<section class="product-connectivity">
  <h2>Kết nối toàn diện, không cần adapter</h2>
  <p>Dell Inspiron 15 duy trì đầy đủ các cổng kết nối thiết yếu: USB-A 3.2 cho thiết bị cũ, USB-C cho thiết bị mới, HDMI để kết nối TV và màn hình, đầu đọc thẻ SD cho máy ảnh, và jack audio 3.5mm cho tai nghe — bạn không cần bất kỳ adapter hay hub nào để sử dụng hàng ngày.</p>
</section>
' WHERE id = 32;

-- ============================================================
-- LAPTOPS 2-IN-1 / CONVERTIBLE
-- ============================================================

-- ID 33: Lenovo Yoga 9i
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>Lenovo Yoga 9i là đỉnh cao tuyệt đối của dòng 2-in-1 cao cấp — nơi màn hình 4K OLED cảm ứng gặp gỡ hệ thống âm thanh Bowers & Wilkins đẳng cấp audiophile, tất cả trong một thân máy convertible mỏng nhẹ sang trọng. Đây là lựa chọn cho những người không chịu thỏa hiệp về bất kỳ điều gì.</p>
</section>

<section class="product-display">
  <h2>Màn hình 4K OLED — Không thể hoàn hảo hơn</h2>
  <p>Tấm nền OLED 14 inch 4K (3840×2400) cảm ứng 10 điểm với độ phủ màu 100% DCI-P3 và HDR500 mang lại chất lượng hình ảnh như bước vào thực tế: màu sắc sống động đến mức choáng ngợp, màu đen sâu tuyệt đối, và mỗi chi tiết nhỏ nhất đều hiện ra sắc nét.</p>
</section>

<section class="product-audio">
  <h2>Âm thanh Bowers & Wilkins — Hi-Fi trên laptop</h2>
  <p>Hệ thống 4 loa được chế tác bởi Bowers & Wilkins — thương hiệu âm thanh cao cấp của Anh từng trang bị cho Rolls-Royce — mang âm thanh hi-fi studio ngay trên laptop của bạn. Đây là laptop duy nhất bạn có thể thưởng thức âm nhạc chất lượng cao mà không cần tai nghe hay loa ngoài.</p>
</section>
' WHERE id = 33;

-- ID 34: HP Envy x360 13
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>HP Envy x360 13 là 2-in-1 compact thuyết phục nhất thị trường cho người dùng muốn sự linh hoạt thực sự mà không cần trả giá cao. Màn hình OLED sắc nét, chip AMD Ryzen 7 mạnh mẽ, và thiết kế gập 360 độ — tất cả trong thân máy 13 inch nhỏ gọn dễ mang theo.</p>
</section>

<section class="product-versatility">
  <h2>Linh hoạt thực sự trong công việc và sáng tạo</h2>
  <p>Chế độ Laptop cho công việc hàng ngày với bàn phím đầy đủ, chế độ Tablet cảm ứng cho ghi chú và vẽ tay, chế độ Tent gọn gàng cho xem phim hay video call, và chế độ Stand tiện lợi khi thuyết trình. Một chiếc thiết bị thay thế được cả laptop lẫn tablet truyền thống.</p>
</section>
' WHERE id = 34;

-- ID 35: Microsoft Surface Pro 9
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>Microsoft Surface Pro 9 là tablet Windows mạnh mẽ nhất từng được tạo ra — và cũng là laptop thực sự khi gắn bàn phím Type Cover. Được thiết kế và tối ưu hoàn hảo cho Windows 11, đây là trải nghiệm Windows thuần khiết và hoàn chỉnh nhất có thể có trong một thiết bị di động.</p>
</section>

<section class="product-versatility">
  <h2>Tablet và Laptop trong một</h2>
  <p>Surface Pro 9 là thiết bị thực sự đa năng: dùng độc lập như tablet cảm ứng 10 điểm cho ghi chú với Surface Pen, vẽ và đọc tài liệu; gắn bàn phím Type Cover để biến thành laptop đầy đủ chỉ trong vài giây. Bàn phím Type Cover mỏng nhẹ nhưng có hành trình phím thực sự thoải mái.</p>
</section>

<section class="product-display">
  <h2>Màn hình PixelSense Flow 120Hz</h2>
  <p>Màn hình PixelSense 13 inch với tần số quét thích ứng 120Hz mượt mà khi cuộn và tương tác cảm ứng, giảm xuống để tiết kiệm pin khi đọc tài liệu tĩnh. Hỗ trợ 10 điểm chạm và bút Surface Pen với 4096 cấp lực nhấn cho trải nghiệm viết tay tự nhiên nhất.</p>
</section>
' WHERE id = 35;

-- ID 36: ASUS ZenBook Flip 14
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>ASUS ZenBook Flip 14 giải quyết vấn đề thường gặp nhất của người dùng 2-in-1: bút stylus luôn thất lạc. Với bút ASUS Pen 2.0 được cất gọn trong thân máy và sạc tự động khi không sử dụng, bạn luôn sẵn sàng viết và vẽ bất cứ lúc nào mà không cần lo mang theo phụ kiện riêng.</p>
</section>

<section class="product-stylus">
  <h2>Bút ASUS Pen 2.0 — Luôn sẵn sàng</h2>
  <p>Bút ASUS Pen 2.0 tích hợp 4096 cấp độ lực nhấn cho trải nghiệm vẽ và viết tay tự nhiên như bút thật. Quan trọng hơn: bút được cất hoàn toàn trong thân máy và tự động sạc qua tiếp xúc, đảm bảo pin bút luôn đầy khi bạn cần. Màn hình OLED 90Hz tươi mát, sắc nét cho trải nghiệm cảm ứng đỉnh cao.</p>
</section>
' WHERE id = 36;

-- ============================================================
-- WORKSTATIONS DI ĐỘNG
-- ============================================================

-- ID 37: Dell Precision 5480
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>Dell Precision 5480 là mobile workstation được thiết kế cho các kỹ sư CAD, kiến trúc sư, nhà phát triển phần mềm và chuyên gia đồ họa kỹ thuật cần GPU được chứng nhận ISV. Đây là sự khác biệt cốt lõi so với laptop gaming: driver ổn định, chứng nhận phần mềm chuyên nghiệp và độ chính xác màu sắc được hiệu chỉnh.</p>
</section>

<section class="product-gpu">
  <h2>GPU NVIDIA RTX A1000 — Chuyên nghiệp thực sự</h2>
  <p>NVIDIA RTX A1000 với driver Quadro-certified được chứng nhận bởi hàng trăm phần mềm chuyên nghiệp: AutoCAD, SolidWorks, CATIA, Maya, 3ds Max, DaVinci Resolve. Sự khác biệt với GPU gaming không chỉ là driver — mà là độ ổn định và chính xác trong môi trường sản xuất thực tế.</p>
</section>

<section class="product-display">
  <h2>Màn hình hiệu chỉnh chuyên nghiệp</h2>
  <p>14 inch Full HD+ IPS với độ phủ 100% sRGB và được hiệu chỉnh màu sắc từ nhà máy theo tiêu chuẩn delta-E < 2 — đảm bảo màu sắc bạn nhìn thấy trên màn hình chính xác tuyệt đối với màu sắc thực tế trong file thiết kế và sản xuất.</p>
</section>
' WHERE id = 37;

-- ID 38: HP ZBook Fury 16 G10
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>HP ZBook Fury 16 G10 là mobile workstation mạnh nhất HP từng sản xuất — được xây dựng cho các nhà khoa học dữ liệu, kỹ sư AI, nhà làm phim VFX và kiến trúc sư cao cấp cần sức mạnh tính toán tối đa cùng màn hình hiệu chỉnh chuyên nghiệp trong một thiết bị di động duy nhất.</p>
</section>

<section class="product-gpu">
  <h2>GPU NVIDIA RTX A4000 — Sức mạnh AI & Render</h2>
  <p>NVIDIA RTX A4000 laptop với 16GB GDDR6 ECC Memory — bộ nhớ ECC (Error Correcting Code) ngăn lỗi bit trong tính toán khoa học và AI training, tính năng không tìm thấy trong bất kỳ GPU gaming nào. Đủ mạnh để train model AI, render frame VFX phức tạp hay xử lý video 8K realtime.</p>
</section>

<section class="product-display">
  <h2>Màn hình HP DreamColor — Studio chuẩn mực</h2>
  <p>16 inch 4K IPS DreamColor được hiệu chỉnh từ nhà máy để đạt độ phủ 100% DCI-P3, delta-E trung bình nhỏ hơn 2 — cùng tiêu chuẩn với màn hình reference monitor chuyên nghiệp trong các studio hậu kỳ điện ảnh. Mỗi chiếc ZBook Fury đi kèm chứng nhận hiệu chỉnh màu cá nhân.</p>
</section>
' WHERE id = 38;

-- ID 39: Lenovo ThinkPad P16
UPDATE products SET content = '
<section class="product-overview">
  <h2>Tổng quan sản phẩm</h2>
  <p>Lenovo ThinkPad P16 kế thừa di sản bền vững của dòng ThinkPad và nâng lên đẳng cấp workstation di động chuyên nghiệp. Với không gian màn hình 16 inch và sức mạnh tính toán từ Intel Core i7-12850HX 16 nhân, đây là công cụ lý tưởng cho các kỹ sư, kiến trúc sư và nhà khoa học cần workstation thực sự để mang đi.</p>
</section>

<section class="product-performance">
  <h2>Sức mạnh workstation trong thân laptop</h2>
  <p>Intel Core i7-12850HX với 16 nhân (8P + 8E) và 32GB DDR5 RAM xử lý song song các tác vụ tính toán nặng: mô phỏng CFD, FEA, render 3D và phân tích dữ liệu lớn mà không cần throttle hay giảm hiệu năng. Hỗ trợ RAM lên đến 128GB cho các tác vụ khoa học đòi hỏi bộ nhớ lớn.</p>
</section>

<section class="product-display">
  <h2>Tỷ lệ 16:10 — Vùng làm việc rộng hơn</h2>
  <p>Màn hình 16 inch với độ phân giải 2560×1600 và tỷ lệ màn hình 16:10 cung cấp thêm 11% vùng hiển thị theo chiều dọc so với màn hình 16:9 thông thường — có nghĩa là bạn thấy nhiều hàng code hơn, nhiều timeline hơn và nhiều chi tiết bản vẽ hơn mà không cần cuộn liên tục.</p>
</section>
' WHERE id = 39;