# DECAL PHỐ Custom Motorcycle – Website mẫu

Website responsive HTML/CSS/JavaScript thuần, giao diện Dark Racing đen–đỏ.

## Chạy website
- Giải nén thư mục.
- Mở `index.html` bằng Chrome/Edge để xem bản demo.
- Khi đưa lên hosting, tải toàn bộ thư mục và giữ nguyên cấu trúc.
- Google Fonts cần internet; website vẫn hiển thị bằng font dự phòng nếu offline.

## Thêm / thay ảnh
Thay ảnh mẫu SVG trong `assets/images/` bằng ảnh của cửa hàng. Nên dùng ảnh WebP/JPG, giữ đúng tên file hoặc cập nhật đường dẫn trong `js/products.js` và `index.html`.

- `assets/images/banners/`: banner đầu trang `banner-01.svg`, `banner-02.svg`, `banner-03.svg`.
- `assets/images/products/`: ảnh sản phẩm.
- `assets/images/decals/`: ảnh khu vực dán decal.
- `assets/images/led/`: ảnh khu vực độ đèn.
- `assets/images/gallery/`: ảnh xe đã thi công.

Ảnh mẫu hiện tại là SVG placeholder có chữ hướng dẫn, không phải ảnh sản phẩm thật.

## Thêm sản phẩm
Mở `js/products.js`, sao chép một object trong mảng `PRODUCTS`, sau đó sửa:
- `id`: mã duy nhất.
- `name`: tên sản phẩm.
- `category`: `led`, `decal` hoặc `accessory`.
- `price`: giá bán dạng số, không ghi dấu chấm.
- `oldPrice`: giá cũ (để `0` nếu không dùng).
- `image`: đường dẫn ảnh trong thư mục assets.
- `tag`, `desc`: nhãn và mô tả.

## Thêm video
Chép video MP4 vào `assets/videos/` và đặt tên:
- `decal-demo.mp4`
- `led-demo.mp4`

Có thể đổi tên file bằng cách sửa thuộc tính `data-video` của hai nút video trong `index.html`. Nên dùng MP4 H.264, độ phân giải 720p hoặc 1080p, dung lượng tối ưu cho điện thoại.

## Cấu hình hotline / Zalo / Messenger
Mở `js/app.js`, sửa phần đầu file:

```js
const SITE_CONFIG={
  phone:'098xxxxxxxx',
  zaloUrl:'https://zalo.me/098xxxxxxxx',
  messengerUrl:'https://m.me/ten-trang'
};
```

Sửa số điện thoại ở dạng chỉ gồm mã quốc gia/số, không có dấu cách. Nút nhắn tin hiện có thể trỏ tới Zalo bằng `zaloUrl`.

## Chức năng hiện có
- Menu mobile, tìm kiếm sản phẩm, lọc theo danh mục.
- Banner tự chuyển, có nút trước/sau và chấm điều hướng.
- Thêm/xóa/tăng/giảm sản phẩm trong giỏ hàng.
- Giỏ hàng lưu bằng localStorage trên trình duyệt.
- Form tạo nội dung yêu cầu đặt hàng và nút sao chép nội dung.
- Video modal phát file MP4 trong thư mục videos.
- Thanh điều hướng cố định 5 nút ở mobile.

## Lưu ý trước khi vận hành thật
Đây là website front-end. Đơn hàng hiện chưa được gửi tự động về máy chủ, Telegram, email hoặc hệ thống quản trị. Form hiện tạo nội dung để sao chép; muốn nhận đơn tự động cần tích hợp backend/API hoặc dịch vụ biểu mẫu. Chức năng tài khoản cũng đang là giao diện chờ tích hợp.
