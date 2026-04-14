# 🖥️ LapTon — Website Bán Laptop

> Website thương mại điện tử chuyên bán laptop, xây dựng fullstack với **Spring Boot** & **React** và tích hợp các tính năng **Real-time**.

---

## 🛠️ Tech Stack

### Backend
| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|---------|
| Java | 21 | Ngôn ngữ lập trình chính |
| Spring Boot | 3.5 | Framework backend |
| MyBatis | 3.0.4 | ORM / SQL Mapper |
| PageHelper | 2.1.0 | Phân trang tự động |
| Spring Security | 6 | Xác thực & phân quyền |
| Nimbus JOSE JWT | 9.40 | Tạo & xác thực JWT token |
| MapStruct | 1.5.5 | Mapping Entity ↔ DTO |
| Lombok | 1.18 | Giảm boilerplate code |
| Cloudinary | 1.33 | Upload & lưu trữ ảnh |
| Redis | - | Caching (Spring Data Redis) |
| WebSocket & STOMP| - | Real-time Chat & Notifications |
| VNPay API | - | Tích hợp thanh toán trực tuyến |
| Java Threads | - | Xử lý tác vụ ngầm (Multithreading) |
| Spring Mail | - | Gửi email (quên mật khẩu) |
| Springdoc OpenAPI | 2.8.6 | Tự động tạo Swagger UI |
| Spring Actuator | - | Health check & monitoring |
| Spring Validation | - | Validate request data |
| MySQL | 8 | Cơ sở dữ liệu |
| Maven | - | Quản lý dependency |

### Frontend
| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|---------|
| React | 19 | UI framework |
| Vite | 7 | Build tool & dev server |
| React Router DOM | 7 | Client-side routing (SPA) |
| Tailwind CSS | 4 | Utility-first CSS |
| Axios | 1.13 | HTTP client |
| SockJS & StompJS | - | Kết nối WebSocket Real-time |
| React Toastify | 11 | Toast notifications |
| Heroicons | 2 | Icon library |
| Headless UI | 2 | Accessible UI components |

---

## ✨ Tính năng

### 🙋 Khách hàng (User)
- **Đăng ký / Đăng nhập** — JWT token, xác thực Role, quên mật khẩu gửi qua email.
- **Mua sắm nội thất** — Tìm kiếm, lọc sản phẩm, xem chi tiết và thêm vào giỏ hàng.
- **Thanh toán trực tuyến** — Hỗ trợ thanh toán bằng **Tiền mặt (COD)** hoặc thẻ qua **cổng thanh toán VNPAY**.
- **Đánh giá & Bình luận** — Chấm điểm sao, viết nhận xét và có thể **trả lời (reply) các đánh giá khác**.
- **Chat Real-time** — Widget Chat giúp khách hàng nhắn tin trực tiếp với cửa hàng (hỗ trợ tự động kết nối lại và bảo mật tin nhắn theo User).
- **Thông báo Real-time** — Nhận thông báo đẩy (tin nhắn mới, trạng thái đơn hàng thay đổi) ngay trên thanh Navbar mà không cần tải lại trang.
- **Quản lý đơn hàng** — Theo dõi lịch sử và trạng thái giao hàng.
- **Phân trang** — Custom pagination với nhiều tùy chọn.

### 🛠️ Quản trị (Admin)
- **Dashboard tổng quan** — Thống kê sản phẩm, doanh thu, đơn hàng.
- **Quản lý người dùng** — Xem, tìm kiếm và **thay đổi quyền (Role) dễ dàng qua Dropdown menu**, xóa tài khoản.
- **Quản lý Chat (Admin Chat)** — Giao diện chat riêng biệt, hỗ trợ tách luồng tin nhắn theo email người dùng, nhiều Admin có thể cùng lúc theo dõi và trả lời tin nhắn của khách hàng.
- **Quản lý Đơn hàng** — Cập nhật trạng thái đơn hàng (nhắn thông báo real-time tới khách hàng khi có thay đổi).
- **Quản lý Sản phẩm & Danh mục (CRUD)** — Thêm, sửa, xóa, quản lý hình ảnh qua Cloudinary.
- **Quản lý Đánh giá** — Dọn dẹp bình luận rác hoặc reply phản hồi khách hàng.

### 🔒 Bảo mật
- **JWT & Role-based Access Control** — Bảo vệ API theo phân quyền.
- **Bảo mật WebSocket** — Tích hợp token vào các kênh đăng ký STOMP để đảm bảo người dùng chỉ được xem tin nhắn và thông báo của riêng mình.
- **BCrypt** — Mã hóa mật khẩu an toàn.
- **CORS & Protected Routes** — Bảo mật chéo tên miền và route guard trên React.
- **Data Isolation** — Cô lập dữ liệu Chat và Cart dựa hoàn toàn vào Context thay vì Param để tránh bị thay đổi ID trái phép.

---

## 🏗️ Kiến trúc & Kỹ thuật

### Backend Architecture
- **Layered Architecture**: Controller → Service → Repository → Database
- **MyBatis XML Mapper** — Viết SQL thuần, không dùng ORM tự động (kiểm soát hoàn toàn câu query)
- **MapStruct** — Annotation-based auto mapping tại compile time (zero reflection)
- **Redis Caching** — Tối ưu hóa truy vấn dữ liệu thường xuyên (Spring Data Redis)
- **Real-time Server** — Cấu hình WebSocket Message Broker cho các endpoint `/topic/notifications/*` và `/topic/conversations/*`.
- **Global Exception Handler** — Xử lý lỗi toàn cục với `@RestControllerAdvice`.
- **Seed Data** — `data.sql` tự động thiết lập cấu trúc và mock data (sản phẩm, giỏ hàng, user, chat...).

### Frontend Architecture
- **SPA (Single Page Application)** — React Router DOM, không reload trang
- **Context API** — Quản lý Global State (`AuthContext`, `CartContext`).
- **Axios Interceptor** — Tự động đính kèm JWT token vào mọi request.
- **Real-time Client** — Khởi tạo kết nối SockJS bền vững (reconnect/heartbeat) ở cấp độ App để update UI tức thời.
- **Responsive Design** — Thích ứng đa thiết bị qua Tailwind CSS.

### Database Schema (10 bảng)
```
users ──< orders ──< order_items >── products >── categories
users ──< carts  ──< cart_items  >── products
users ──< reviews               >── products
users ──< conversations ──< messages
users ──< notifications
```

---

## 📁 Cấu trúc dự án

```
project/
├── BackEnd/
│   ├── src/main/java/com/example/demo/
│   │   ├── config/          # SecurityConfig, CorsConfig, SwaggerConfig, CloudinaryConfig, VNPayConfig, WebSocketConfig
│   │   ├── controller/      # Auth, Product, Category, Cart, Order, Review, Admin, Chat, Notification, Payment
│   │   ├── dto/             # 25+ Request & Response DTOs
│   │   ├── entity/          # User, Product, Category, Cart, CartItem, Order, OrderItem, Review, Conversation, ChatMessage, Notification
│   │   ├── exception/       # GlobalExceptionHandler, AppException
│   │   ├── filter/          # JwtAuthenticationFilter
│   │   ├── mapper/          # MapStruct Mappers
│   │   ├── repository/      # MyBatis Mapper Interfaces
│   │   └── service/         # Service layer (auth, chat, notif, vnpay, etc...)
│   ├── src/main/resources/
│   │   ├── mapper/          # MyBatis XML Mapper files
│   │   ├── data.sql         # Seed data mới nhất
│   │   └── application.properties
│   └── pom.xml
│
└── FrontEnd/
    ├── src/
    │   ├── api/             # API handlers (axios, chatApi, notifApi, vnpayApi, v.v...)
    │   ├── components/      # Navbar (có Notification dropdown), ChatWidget, Button, v.v...
    │   ├── context/         # AuthContext, CartContext
    │   └── pages/
    │       ├── HomePage, ProductDetailPage, CartPage
    │       ├── CheckoutPage, PaymentResultPage
    │       └── admin/       # AdminDashboard, AdminChat (Real-time), AdminUserList (edit role), AdminProduct...
    ├── package.json
    └── vite.config.js
```

---

## 🚀 Cài đặt & Chạy

### Yêu cầu
- Java 21+, Maven
- Node.js 18+
- MySQL 8+

### 1. Database
```sql
CREATE DATABASE lapton;
```

### 2. Backend
```bash
cd BackEnd

# Cấu hình application.properties (MySQL connection, VNPay keys, Cloudinary)
# ...

mvn spring-boot:run
```

### 3. Frontend
```bash
cd FrontEnd
npm install
npm run dev
```

### 4. Tài khoản mặc định
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@gmail.com | 123456 |
| User | user@gmail.com | 123456 |
