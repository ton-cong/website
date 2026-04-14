# 🖥️ LapTon — Website Bán Laptop

> Website thương mại điện tử chuyên bán laptop, xây dựng fullstack với **Spring Boot** & **React**.

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
| React Toastify | 11 | Toast notifications |
| Heroicons | 2 | Icon library |
| Headless UI | 2 | Accessible UI components |

---

## ✨ Tính năng

### 🙋 Khách hàng (User)
- **Đăng ký tài khoản** — Validation email, mật khẩu
- **Đăng nhập** — JWT token, tự động redirect theo role (ADMIN / USER)
- **Quên mật khẩu** — Gửi mật khẩu mới qua email tự động
- **Trang chủ** — Hero banner, danh sách sản phẩm nổi bật
- **Tìm kiếm sản phẩm** — Tìm theo từ khóa, lọc theo danh mục
- **Phân trang** — Custom pagination với tùy chọn số sản phẩm/trang (8/12/24/48)
- **Chi tiết sản phẩm** — Ảnh, mô tả, thông số kỹ thuật (CPU, RAM, SSD, màn hình, brand), giá & giá khuyến mãi
- **Đánh giá sản phẩm** — Chọn số sao (1–5) + viết bình luận, xem đánh giá của người khác
- **Giỏ hàng** — Thêm sản phẩm, cập nhật số lượng, xóa sản phẩm, tính tổng tiền
- **Đặt hàng (Checkout)** — Nhập tên, SĐT, địa chỉ, ghi chú giao hàng
- **Lịch sử đơn hàng** — Xem danh sách, trạng thái đơn hàng (pending → processing → shipping → completed)
- **Trang cá nhân (Profile)** — Cập nhật thông tin tài khoản
- **Trang Giới thiệu / Liên hệ** — About & Contact page

### 🛠️ Quản trị (Admin)
- **Dashboard tổng quan** — Thống kê: tổng sản phẩm, tổng đơn hàng, tổng người dùng, doanh thu
- **Quản lý sản phẩm (CRUD)** — Thêm, sửa, xóa sản phẩm; upload ảnh lên Cloudinary; quản lý trạng thái (ACTIVE / OUT_OF_STOCK)
- **Quản lý danh mục (CRUD)** — Thêm, sửa, xóa danh mục; ngăn xóa nếu còn sản phẩm thuộc danh mục
- **Quản lý đơn hàng** — Xem danh sách, lọc theo trạng thái, cập nhật trạng thái đơn hàng
- **Quản lý người dùng** — Xem danh sách, thông tin tài khoản, phân quyền
- **Quản lý đánh giá** — Xem & xóa đánh giá không phù hợp

### 🔒 Bảo mật
- **JWT Authentication** — Stateless, token lưu ở localStorage, gửi qua `Authorization: Bearer` header
- **JWT Filter** — Xác thực token tự động mọi request
- **Role-based Access Control** — `hasRole("ADMIN")` cho API quản trị, `authenticated` cho user
- **BCrypt** — Mã hóa mật khẩu
- **CORS Configuration** — Cho phép frontend gọi API cross-origin
- **Protected Routes** — Frontend chặn truy cập trái phép bằng route guard (AuthRoute / AdminRoute)
- **Cascade Delete** — Xóa sản phẩm tự động xóa order_items, cart_items, reviews liên quan (tránh FK constraint)

---

## 🏗️ Kiến trúc & Kỹ thuật

### Backend Architecture
- **Layered Architecture**: Controller → Service → Repository → Database
- **MyBatis XML Mapper** — Viết SQL thuần, không dùng ORM tự động (kiểm soát hoàn toàn câu query)
- **MapStruct** — Annotation-based auto mapping tại compile time (zero reflection)
- **Redis Caching** — Tối ưu hóa truy vấn dữ liệu thường xuyên (Spring Data Redis)
- **Multithreading** — Xử lý các tác vụ nền bất đồng bộ bằng Java Threads
- **Global Exception Handler** — `@RestControllerAdvice`, trả JSON chuẩn cho mọi lỗi
- **Bean Validation** — `@Valid`, `@NotNull`, `@Email` validate request tự động
- **Spring Actuator** — Health endpoint `/actuator/health`
- **Swagger UI** — Tự động generate tài liệu API tại `/swagger-ui.html`
- **Seed Data** — `data.sql` tự chạy khi khởi động: 39 sản phẩm, 7 danh mục, 20 users, 20 đơn hàng, reviews

### Frontend Architecture
- **SPA (Single Page Application)** — React Router DOM, không reload trang
- **Context API** — `AuthContext` (quản lý login/logout/user state), `CartContext` (quản lý giỏ hàng)
- **Axios Interceptor** — Tự động đính kèm JWT token vào mọi request, xử lý lỗi 401/403 tập trung
- **API Layer** — 8 module API (authApi, productApi, categoryApi, cartApi, orderApi, reviewApi, adminApi, userApi)
- **Reusable Components** — Button, Input, Pagination, Header, Footer, ProductCard
- **Responsive Design** — Mobile-first với Tailwind CSS

### Database Schema (8 bảng)
```
users ──< orders ──< order_items >── products >── categories
users ──< carts  ──< cart_items  >── products
users ──< reviews               >── products
```

---

## 📁 Cấu trúc dự án

```
project/
├── BackEnd/
│   ├── src/main/java/com/example/demo/
│   │   ├── config/          # SecurityConfig, CorsConfig, SwaggerConfig, CloudinaryConfig
│   │   ├── controller/      # AuthController, ProductController, CategoryController,
│   │   │                    # CartController, OrderController, ReviewController, AdminController
│   │   ├── dto/             # 20+ Request & Response DTOs
│   │   ├── entity/          # User, Product, Category, Cart, CartItem, Order, OrderItem, Review
│   │   ├── enums/           # OrderStatus, ProductStatus, UserRole
│   │   ├── exception/       # GlobalExceptionHandler, AppException, ErrorCode
│   │   ├── filter/          # JwtAuthenticationFilter
│   │   ├── mapper/          # 6 MapStruct Mappers
│   │   ├── repository/      # 8 MyBatis Mapper Interfaces
│   │   ├── service/         # 10 Service Interfaces + Implementations
│   │   └── util/            # JwtUtil
│   ├── src/main/resources/
│   │   ├── mapper/          # 8 MyBatis XML Mapper files
│   │   ├── data.sql         # Seed data đầy đủ
│   │   └── application.properties
│   ├── Dockerfile
│   └── pom.xml
│
└── FrontEnd/
    ├── src/
    │   ├── api/             # authApi, productApi, categoryApi, cartApi,
    │   │                    # orderApi, reviewApi, adminApi, axiosClient
    │   ├── components/      # Button, Input, Pagination, Header, Footer
    │   ├── context/         # AuthContext, CartContext
    │   └── pages/
    │       ├── HomePage, ProductDetailPage, CartPage
    │       ├── CheckoutPage, OrdersPage, ProfilePage
    │       ├── LoginPage, RegisterPage, ForgotPasswordPage
    │       ├── AboutPage, ContactPage
    │       └── admin/       # AdminDashboard, AdminProductList,
    │                        # AdminProductForm, AdminOrderList,
    │                        # AdminUserList, AdminReviewList
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

# Cấu hình application.properties:
# spring.datasource.url=jdbc:mysql://localhost:3306/lapton
# spring.datasource.username=root
# spring.datasource.password=your_password

mvn spring-boot:run
```
- Backend: `http://localhost:8080`
- Swagger UI: `http://localhost:8080/swagger-ui.html`

### 3. Frontend
```bash
cd FrontEnd
npm install
npm run dev
```
- Frontend: `http://localhost:5173`

### 4. Tài khoản mặc định
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@gmail.com | 123456 |
| User | user@gmail.com | 123456 |

---

## 🔌 API Endpoints

| Method | Endpoint | Mô tả | Auth |
|--------|----------|--------|------|
| `POST` | `/api/auth/register` | Đăng ký | ❌ |
| `POST` | `/api/auth/login` | Đăng nhập | ❌ |
| `POST` | `/api/auth/forgot-password` | Quên mật khẩu | ❌ |
| `GET` | `/api/products` | Danh sách sản phẩm (phân trang) | ❌ |
| `GET` | `/api/products/{id}` | Chi tiết sản phẩm | ❌ |
| `GET` | `/api/products/search` | Tìm kiếm & lọc sản phẩm | ❌ |
| `POST` | `/api/products/create` | Tạo sản phẩm | 🔑 ADMIN |
| `PUT` | `/api/products/update/{id}` | Sửa sản phẩm | 🔑 ADMIN |
| `DELETE` | `/api/products/delete/{id}` | Xóa sản phẩm | 🔑 ADMIN |
| `GET` | `/api/category` | Danh sách danh mục | ❌ |
| `POST` | `/api/category` | Tạo danh mục | 🔑 ADMIN |
| `PUT` | `/api/category/{id}` | Sửa danh mục | 🔑 ADMIN |
| `DELETE` | `/api/category/{id}` | Xóa danh mục | 🔑 ADMIN |
| `GET` | `/api/reviews/{productId}` | Đánh giá theo sản phẩm | ❌ |
| `POST` | `/api/reviews` | Viết đánh giá | 🔑 USER |
| `DELETE` | `/api/reviews/{id}` | Xóa đánh giá | 🔑 ADMIN |
| `GET` | `/api/cart` | Xem giỏ hàng | 🔑 USER |
| `POST` | `/api/cart/add` | Thêm vào giỏ | 🔑 USER |
| `PUT` | `/api/cart/update` | Cập nhật số lượng | 🔑 USER |
| `DELETE` | `/api/cart/remove/{id}` | Xóa khỏi giỏ | 🔑 USER |
| `POST` | `/api/orders` | Đặt hàng | 🔑 USER |
| `GET` | `/api/orders` | Lịch sử đơn hàng | 🔑 USER |
| `GET` | `/api/admin/orders` | Tất cả đơn hàng | 🔑 ADMIN |
| `PUT` | `/api/admin/orders/{id}/status` | Cập nhật trạng thái | 🔑 ADMIN |
| `GET` | `/api/admin/users` | Danh sách users | 🔑 ADMIN |
| `GET` | `/api/admin/stats` | Thống kê dashboard | 🔑 ADMIN |
