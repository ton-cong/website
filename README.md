# 🖥️ LapTon - Website Thương Mại Điện Tử Laptop

Website bán laptop fullstack với **Spring Boot** và **React**, tích hợp đầy đủ các chức năng thương mại điện tử từ duyệt sản phẩm, giỏ hàng, đặt hàng đến quản trị hệ thống.

---

## 📸 Công Nghệ Sử Dụng

### Backend
| Công nghệ | Phiên bản | Mô tả |
|---|---|---|
| Java | 21 | Ngôn ngữ lập trình chính |
| Spring Boot | 3.5.7 | Framework backend |
| Spring Security | 6.x | Xác thực & phân quyền |
| Spring Data JPA | - | ORM & truy vấn CSDL |
| MySQL | 8.x | Cơ sở dữ liệu quan hệ |
| JWT (Nimbus JOSE) | 9.40 | Token xác thực người dùng |
| MapStruct | 1.5.5 | Ánh xạ DTO ↔ Entity tự động |
| Lombok | 1.18.30 | Giảm boilerplate code |
| Redis | - | Caching dữ liệu sản phẩm |
| Cloudinary | 1.33.0 | Upload & lưu trữ hình ảnh |
| Spring Mail | - | Gửi email đặt lại mật khẩu |
| Swagger / OpenAPI 3.0 | 2.8.6 | Tài liệu API tự động |
| Spring Actuator | - | Giám sát ứng dụng |

### Frontend
| Công nghệ | Phiên bản | Mô tả |
|---|---|---|
| React | 19 | Thư viện UI |
| Vite | 7 | Build tool |
| TailwindCSS | 4 | CSS framework |
| Axios | 1.13 | HTTP client |
| React Router | 7 | Điều hướng SPA |
| Heroicons | 2 | Icon SVG |
| Headless UI | 2 | UI components accessible |
| React Toastify | 11 | Thông báo toast |

---

## 🚀 Chức Năng Chính

### 👤 Xác Thực & Người Dùng
- Đăng ký / Đăng nhập với JWT Authentication
- Phân quyền **ADMIN** / **USER** (Role-Based Access Control)
- Đổi mật khẩu
- Quên mật khẩu (gửi mật khẩu mới qua email)
- Cập nhật thông tin cá nhân (họ tên, SĐT, địa chỉ)

### 🛍️ Sản Phẩm
- Hiển thị danh sách sản phẩm với **phân trang** và **sắp xếp** (theo giá, tên, mới nhất)
- Tìm kiếm sản phẩm theo từ khóa
- Lọc theo **danh mục** và **khoảng giá**
- Xem chi tiết sản phẩm (thông số kỹ thuật: CPU, RAM, ổ cứng, màn hình)
- Upload hình ảnh sản phẩm lên **Cloudinary**
- Caching dữ liệu sản phẩm với **Redis** để tăng hiệu suất

### 🛒 Giỏ Hàng
- Thêm / xóa / cập nhật số lượng sản phẩm trong giỏ
- Tính tổng tiền tự động
- Giỏ hàng lưu theo tài khoản người dùng (server-side)

### 📦 Đơn Hàng
- Đặt hàng với thông tin giao hàng (họ tên, SĐT, địa chỉ, ghi chú)
- Xem lịch sử đơn hàng cá nhân
- Theo dõi trạng thái đơn hàng (Chờ xác nhận → Đang xử lý → Đang giao → Hoàn thành / Đã hủy)
- Gửi email xác nhận đơn hàng (**Async**)

### ⭐ Đánh Giá Sản Phẩm
- Người dùng đánh giá sản phẩm (1-5 sao + bình luận)
- Hiển thị đánh giá trên trang chi tiết sản phẩm

### 🛠️ Admin Dashboard
- **Tổng quan**: Thống kê số sản phẩm, đơn hàng, người dùng, doanh thu
- **Quản lý sản phẩm**: Thêm / sửa / xóa sản phẩm, upload ảnh, quản lý trạng thái
- **Quản lý danh mục**: CRUD danh mục sản phẩm
- **Quản lý đơn hàng**: Xem chi tiết, cập nhật trạng thái đơn hàng
- **Quản lý người dùng**: Xem danh sách, cập nhật role, xóa tài khoản
- **Quản lý đánh giá**: Xem và xóa đánh giá

### 🔒 Bảo Mật
- JWT Authentication với Spring Security
- CORS configuration cho frontend
- Phân quyền API theo role (ADMIN / USER)
- Mã hóa mật khẩu với BCrypt
- JWT Filter xác thực mỗi request

### 📄 API Documentation
- Swagger UI tự động tại `/swagger-ui.html`
- OpenAPI 3.0 specification tại `/v3/api-docs`

---

## 📁 Cấu Trúc Dự Án

```
project/
├── BackEnd/
│   └── src/main/java/com/example/demo/
│       ├── config/          # Cấu hình Security, Redis, Swagger, Cloudinary
│       ├── controller/      # REST API endpoints (7 controllers)
│       ├── dto/             # Data Transfer Objects (Request/Response)
│       ├── entity/          # JPA Entities (User, Product, Cart, Order, ...)
│       ├── enums/           # Enum (Role, OrderStatus, ErrorCode, ...)
│       ├── exception/       # Global Exception Handler
│       ├── filter/          # JWT Authentication Filter
│       ├── mapper/          # MapStruct Mappers
│       ├── repository/      # JPA Repositories
│       ├── service/         # Business Logic (interface + impl)
│       ├── specification/   # JPA Specification cho filter sản phẩm
│       └── util/            # JWT Utility
│
├── FrontEnd/
│   └── src/
│       ├── api/             # Axios API clients
│       ├── components/      # Reusable UI components (Navbar, Button, ...)
│       ├── context/         # React Context (Auth, Cart)
│       └── pages/           # Trang giao diện
│           ├── HomePage, ProductDetailPage, CartPage, CheckoutPage
│           ├── LoginPage, RegisterPage, ProfilePage, OrdersPage
│           └── admin/       # Admin pages (Dashboard, Products, Orders, ...)
│
└── README.md
```

---

## ⚙️ Cài Đặt & Chạy

### Yêu cầu
- Java 21+
- Node.js 18+
- MySQL 8+
- Maven
- Redis (tùy chọn, có thể tắt)

### Backend
```bash
cd BackEnd
mvn clean install
mvn spring-boot:run
```
> Backend chạy tại: `http://localhost:8080`

### Frontend
```bash
cd FrontEnd
npm install
npm run dev
```
> Frontend chạy tại: `http://localhost:5173`

### Cấu hình Database
Tạo database MySQL:
```sql
CREATE DATABASE lapton;
```
Cập nhật thông tin kết nối trong `BackEnd/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/lapton
spring.datasource.username=root
spring.datasource.password=your_password
```

---

## 📌 API Endpoints

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Đăng ký | ❌ |
| POST | `/api/auth/login` | Đăng nhập | ❌ |
| POST | `/api/auth/changePass` | Đổi mật khẩu | ✅ |
| POST | `/api/auth/forgetPass` | Quên mật khẩu | ❌ |
| POST | `/api/auth/profile/update` | Cập nhật profile | ✅ |
| GET | `/api/products/getAllProduct` | Danh sách sản phẩm (phân trang) | ❌ |
| GET | `/api/products/{id}` | Chi tiết sản phẩm | ❌ |
| POST | `/api/products/create` | Tạo sản phẩm | 🔐 ADMIN |
| PUT | `/api/products/update/{id}` | Cập nhật sản phẩm | 🔐 ADMIN |
| DELETE | `/api/products/delete/{id}` | Xóa sản phẩm | 🔐 ADMIN |
| GET | `/api/category/getAll` | Danh sách danh mục | ❌ |
| POST | `/api/cart/add` | Thêm vào giỏ | ✅ |
| GET | `/api/cart` | Xem giỏ hàng | ✅ |
| POST | `/api/orders` | Đặt hàng | ✅ |
| GET | `/api/orders/my-orders` | Đơn hàng của tôi | ✅ |
| GET | `/api/reviews/product/{id}` | Đánh giá sản phẩm | ❌ |
| POST | `/api/reviews` | Viết đánh giá | ✅ |
| GET | `/api/admin/allUser` | Danh sách người dùng | 🔐 ADMIN |

> 📄 Xem đầy đủ tại Swagger UI: `http://localhost:8080/swagger-ui.html`
