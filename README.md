# GitButler: Rethinking Git Workflow — Tech Sharing Presentation

Một ứng dụng trình chiếu slide kỹ thuật theo phong cách tối giản **Apple Keynote**, tỷ lệ chuẩn **16:9** (1920×1080), phục vụ chia sẻ nội bộ cho các kỹ sư **Web, Backend và Flutter**.

---

## 📌 Nội Dung 8 Slide Kỹ Thuật

| # | Tiêu Đề | Nội Dung Trọng Tâm |
|---|---|---|
| **01** | **GitButler: Rethinking Git Workflow** | Khái niệm Virtual Branches song song trong một thư mục làm việc. |
| **02** | **Giới hạn của luồng làm việc đơn nhánh** | Phân tích quy trình truyền thống (stash → checkout → pop → conflict) và chi phí context switching. |
| **03** | **Cơ chế Virtual Branches** | Quản lý nhiều nhánh ảo, gán thay đổi theo từng Hunk, cơ chế Apply & Unapply. |
| **04** | **Parallel vs Stacked Branches** | So sánh nhánh độc lập (Parallel) và chuỗi nhánh phụ thuộc theo tầng (Stacked PRs). |
| **05** | **Quy trình làm việc trên GitButler** | Các bước thao tác Web UI + Flutter kèm bộ mô phỏng trực quan. |
| **06** | **GitButler + AI Coding Agents** | Lệnh `but agent setup`, cơ chế phân luồng nhánh cho AI và nguyên tắc bảo mật. |
| **07** | **Git vs GitButler vs Git Worktree** | Bảng so sánh kỹ thuật khách quan và các lưu ý về shared working directory. |
| **08** | **Takeaways & Q&A** | 3 điểm cốt lõi, đề xuất thử nghiệm thực tế và câu hỏi thảo luận nhóm. |

---

## 🚀 Khởi Chạy Ứng Dụng

```bash
# Cài đặt thư viện
npm install

# Khởi chạy dev server (mặc định tại http://localhost:5173/)
npm run dev

# Kiểm tra type và build production
npm run build
```

---

## ⌨️ Phím Tắt Điều Khiển

| Phím Tắt | Chức Năng |
|---|---|
| `→` / `Space` / `PageDown` | Chuyển sang slide tiếp theo |
| `←` / `PageUp` | Quay lại slide trước |
| `Home` / `End` | Về slide 1 / Đến slide 8 |
| `1` đến `8` | Nhảy trực tiếp đến Slide tương ứng |
| `N` hoặc `P` | Mở / Đóng **Presenter Notes** |
| `F` | Bật / Tắt chế độ toàn màn hình (**Fullscreen**) |
| `?` | Bảng phím tắt |
| `Esc` | Đóng modal |

---

## 🎨 Điểm Nổi Bật Về Thiết Kế

- **Phong cách Apple Keynote**: Tiêu đề to đậm, khoảng trống thoáng đãng, phân cấp thị giác rõ ràng, không có chữ nhỏ li ti hoặc đồng hồ đếm ngược gây phân tâm.
- **Tập trung vào nội dung kỹ thuật**: Dùng ngôn từ kỹ thuật chính xác, trung tính, không kể chuyện dài dòng.
- **Khung hình 1920×1080 co giãn tự động**: Tự động scale vừa khít mọi độ phân giải màn hình máy chiếu mà không bị vỡ layout hay xuất hiện thanh cuộn.
- **Hỗ trợ in ấn / PDF**: Nhấn `Cmd + P` / `Ctrl + P` để xuất toàn bộ 8 slide chuẩn từng trang riêng biệt.
