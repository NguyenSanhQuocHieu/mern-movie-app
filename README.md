#  Dự án Netflix Clone
Đây là một ứng dụng web mô phỏng Netflix, được xây dựng bằng MERN Stack (MongoDB, Express.js, React.js, Node.js).  
Người dùng có thể đăng ký, đăng nhập, xem phim, thêm vào yêu thích và đánh giá phim.  
Ngoài ra, có giao diện quản trị (Admin) để quản lý nội dung phim.

---
(ADMIN)
quochieu@gmail.com
quochieu2
---

## Tính năng chính

- Đăng ký / Đăng nhập người dùng
- Xem danh sách phim và chương trình TV
- Xem video từ Cloudinary
- Thêm / Xóa phim khỏi mục yêu thích
- Đánh giá và bình luận phim
- Trang quản trị dành cho Admin để thêm / sửa / xóa phim

---
Giao diện website theo hướng responsive, tự động điều chỉnh phù hợp với kích thước màn hình, từ điện thoại, máy tính bảng cho đến máy tính để bàn, trừ apple watch.

---

## Công nghệ sử dụng

**Phía giao diện (Client):**
- React.js
- Redux Toolkit
- Tailwind CSS
- Axios

**Phía máy chủ (Server):**
- Node.js
- Express.js
- MongoDB (sử dụng MongoDB Atlas)
- JWT (Xác thực người dùng)

**Dịch vụ đám mây:**
- Cloudinary (lưu trữ video và ảnh)

---

## Biến môi trường cần thiết
Bạn cần tạo file `.env` trong thư mục `server` và thêm các thông tin sau:

MONGODB_URL=chuỗi_kết_nối_MongoDB_của_bạn, 
JWT_SECRET=chuỗi_bí_mật_bảo_mật,
CLOUDINARY_CLOUD_NAME=tên_cloudinary,
CLOUDINARY_API_KEY=api_key_cloudinary,
CLOUDINARY_API_SECRET=api_secret_cloudinary,

Cách chạy dự án trên máy

**1.Tải project về:**
```bash
git clone https://github.com/nsqhieu/qhieu.git
cd qhieu

cd server
npm install
npm start

cd ../client
npm install
npm start

Sau đó mở trình duyệt và truy cập: http://localhost:3000