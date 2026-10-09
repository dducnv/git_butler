# GitButler: Quản lý nhiều nhánh song song trong một thư mục làm việc

Ứng dụng trình chiếu cho buổi chia sẻ kỹ thuật 15 phút, khung 16:9 (1920×1080). Toàn bộ nội dung xoay quanh một tình huống trên project Flutter **abc-app**: đang phát triển giao diện bảng xếp hạng mới (`feat/leaderboard_v2`) thì bản `dev` cần build gặp lỗi ảnh câu hỏi; bản sửa lỗi cần được tách thành Pull Request riêng vào `dev`.

---

## 📌 Nội dung 11 slide, đánh số 00–10 (khoảng 17 phút, gồm 5 phút demo trên ứng dụng thật)

| # | Slide | Nội dung |
|---|---|---|
| 00 | Nội dung trình bày | Mục lục; mỗi lần nhấn hiện thêm một mục, đủ 4 mục thì sang slide 01 |
| 01 | GitButler | Quản lý nhiều nhánh song song trong một thư mục làm việc |
| 02 | Vì sao GitButler ra đời | Giả định của Git (2005) so với cách làm việc hiện nay; ý tưởng cốt lõi |
| 03 | Sửa lỗi gấp khi đang làm tính năng | Git (9 lệnh) và GitButler (4 thao tác) trên tình huống abc-app |
| 04 | Chia Pull Request lớn thành chuỗi nhỏ | Stacked branches, tự động rebase |
| 05 | Sửa, gộp, chuyển commit bằng kéo thả | Kèm lệnh Git tương đương |
| 06 | Conflict và hoàn tác | So sánh 2×2 Git / GitButler |
| 07 | Nhiều AI agent trong một thư mục | Worktree so với nhánh theo phiên |
| 08 | Demo trên ứng dụng thật | Danh sách thao tác demo trên GitButler Desktop |
| 09 | So sánh tổng hợp | Bảy tình huống |
| 10 | Phạm vi áp dụng và thảo luận | Phù hợp khi, lưu ý, áp dụng thử |

Thứ tự slide được khai báo trong `src/App.tsx` (`SLIDE_COMPONENTS`) và phải khớp với `src/data/slidesData.ts`. Dữ liệu kịch bản (tên nhánh, tên file, diff) tập trung tại `src/data/demoScenario.ts`; lời thoại tại `src/data/slidesData.ts`.

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
| `→` / `Space` / `PageDown` / click (slide 00) | Hiện mục tiếp theo hoặc chuyển slide |
| `←` / `PageUp` | Quay lại slide trước |
| `Home` / `End` | Về slide đầu / Đến slide cuối |
| `0` đến `9` | Nhảy trực tiếp đến slide 00–09 (dùng `?slide=N` trên URL cho slide bất kỳ) |
| `N` hoặc `P` | Mở / Đóng **Presenter Notes** |
| `F` | Bật / Tắt chế độ toàn màn hình (**Fullscreen**) |
| `?` | Bảng phím tắt |
| `Esc` | Đóng modal |

---

## 🎨 Điểm Nổi Bật Về Thiết Kế

- **Phong cách Apple Keynote**: Tiêu đề to đậm, khoảng trống thoáng đãng, phân cấp thị giác rõ ràng, không có chữ nhỏ li ti hoặc đồng hồ đếm ngược gây phân tâm.
- **Tập trung vào nội dung kỹ thuật**: Dùng ngôn từ kỹ thuật chính xác, trung tính, không kể chuyện dài dòng.
- **Khung hình 1920×1080 co giãn tự động**: Tự động scale vừa khít mọi độ phân giải màn hình máy chiếu mà không bị vỡ layout hay xuất hiện thanh cuộn.
- **Hỗ trợ in ấn / PDF**: Nhấn `Cmd + P` / `Ctrl + P` để xuất toàn bộ 11 slide chuẩn từng trang riêng biệt.
