# TÀI LIỆU YÊU CẦU GAME (GAME REQUIREMENT DOCUMENT)

## 1. Tổng quan dự án (Project Overview)

* **Thể loại:** Game giáo dục kết hợp giải trí (Edutainment), nhập vai chiến đấu cơ bản.
* **Đối tượng:** Trẻ em (Thiết kế thân thiện, trực quan, dễ thao tác để các bé vừa chơi vừa rèn luyện tư duy toán học).
* **Nền tảng & Thiết bị:** Web-based, tối ưu hóa cho iPad (chơi qua trình duyệt) và PC.
* **Công nghệ cốt lõi:** ReactJS (quản lý UI, State) kết hợp Three.js (xử lý đồ họa 3D và môi trường).
* **Cơ chế điều khiển:** Hoàn toàn bằng thao tác chạm (Touch) trên iPad hoặc Click chuột trên PC. Tuyệt đối **không** sử dụng bàn phím ảo của hệ điều hành hay bàn phím vật lý. Mọi tương tác đều thông qua các nút UI được thiết kế to, rõ ràng trên màn hình.

## 2. Cốt lõi Trò chơi (Core Gameplay & Mechanics)

* **Góc nhìn:** Top-down (Từ trên nhìn xuống, hơi nghiêng theo kiểu Isometric) để dễ dàng bao quát bản đồ.
* **Nhân vật chính:** Một chú Iron Golem mang phong cách Voxel (khối vuông) nhưng được làm chi tiết và sắc nét ở các bộ phận (đầu, mắt, tay, chân).
* **Vòng lặp Gameplay (Core Loop):** Điều khiển nhân vật di chuyển $\rightarrow$ Khám phá bản đồ $\rightarrow$ Gặp quái vật $\rightarrow$ Click vào quái để vào chế độ Combat $\rightarrow$ Giải toán cộng/trừ $\rightarrow$ Nhận thưởng $\rightarrow$ Lên cấp.
* **Cơ chế Lên cấp (Leveling System):**
* Người chơi thu thập tiền vàng sau mỗi lần thắng.
* Cứ tích đủ **100 xu = 1 Level**.
* **Hiệu ứng thăng cấp:** Nhân vật Iron Golem sẽ to lớn hơn một chút theo từng cấp, đồng thời được tự động trang bị thêm đồ (ví dụ: Level 2 đội mũ sắt, Level 3 mặc thêm giáp vai, v.v.) giúp ngoại hình ngày càng hoành tráng.



## 3. Hệ thống Quái vật & Độ khó (Monster System)

Quái vật sẽ xuất hiện ngẫu nhiên trên bản đồ. Kích thước và màu sắc của chúng sẽ thay đổi để biểu thị mức độ khó của phép tính. Đồ họa của quái (Slime, Creeper...) cũng cần độ chi tiết cao.

| Loại Quái vật | Độ khó | Giới hạn Phép tính (Cộng/Trừ) | Tiền thưởng | Ghi chú Trực quan |
| --- | --- | --- | --- | --- |
| **Creeper** | Dễ | Dưới 30 | 20 xu | Kích thước nhỏ, màu sắc nguyên bản. |
| **Skeleton** | Dễ - Trung bình | Dưới 100 | 50 xu | Kích thước vừa, có thể mang cung nhỏ. |
| **Zombie** | Trung bình | Dưới 200 | 70 xu | Kích thước lớn hơn, màu sắc sậm hơn. |
| **Enderman** | Khó | Dưới 1000 | 100 xu | Cao lớn, có hào quang hoặc hiệu ứng đặc biệt để cảnh báo độ khó cao. |

## 4. Trải nghiệm Chiến đấu (Combat Flow)

Khi người chơi click vào một con quái trên bản đồ, game sẽ chuyển state từ "Khám phá" sang "Chiến đấu" qua các bước sau:

1. **Màn hình VS (Intro Transition):**
* Background bản đồ mờ đi, chuyển sang tông xám, mây mù kéo lại tạo cảm giác kịch tính.
* Xuất hiện mô hình 3D của Iron Golem (trái) và Quái vật (phải) phóng to ra.
* Chữ **"VS"** bằng bay từ ngoài vào giữa màn hình, hiệu ứng vụt qua bắt mắt rồi biến mất để nhường chỗ cho bảng câu hỏi.


2. **Trong trận đấu (In-battle):**
* Đài đấu (Arena) được trang trí tỉ mỉ, sinh động.
* Hai nhân vật 3D ở hai bên màn hình liên tục có animation (Idle animation: nhịp thở, ngoảnh đầu, cử động tay chân) để tạo cảm giác sống động.
* Chính giữa màn hình hiển thị câu đố toán học to, rõ ràng.
* Phía dưới câu đố là khu vực nhập đáp án bằng các UI Button (để thay thế hoàn toàn bàn phím). Về UI trả lời câu hỏi thì sẽ hiển thị **Bảng số UI (Numpad từ 0-9)** ngay trên màn hình để bé tự bấm từng con số ráp thành kết quả


1. **Kết thúc trận (Resolution):**
* **Trả lời đúng:** Golem tung đòn tấn công. Quái vật bị tiêu diệt sẽ nổ tung (Particle effects), tan biến kèm hiệu ứng âm thanh và thông báo "+ X xu" bay lên (Floating text).
* Chuyển cảnh mượt mà đưa người chơi quay lại bản đồ chính để tiếp tục di chuyển.



## 5. Đồ họa & Môi trường (Graphics & Environment)

* **Art Style:** 3D Voxel (tương tự Minecraft nhưng nâng cấp độ chi tiết), màu sắc tươi tắn, độ tương phản cao, phù hợp cho độ tuổi thiếu nhi.
* **Môi trường sinh động (Dynamic Environment):**
* Bản đồ cần có cây cối, cỏ lay động nhẹ trong gió.
* Hệ thống thời tiết: Mây trôi, ánh nắng, hoặc những khu vực có mưa bóng mây để thế giới thêm sức sống.
* Cảnh vật phụ trợ: Đá, hoa, rương báu, hoặc các con vật nhỏ vô hại chạy loanh quanh.


* **Hiệu ứng hình ảnh (VFX):**
* **Combat:** Hiệu ứng chớp sáng khi chữ VS xuất hiện, tia lửa, mây mù cuộn lại.
* **Chiến thắng:** Vụ nổ đa sắc khi quái chết, tiền xu văng ra và bay vào túi đồ của người chơi.
* **Lên cấp:** Vòng sáng (Aura) bao quanh Golem, âm thanh hoành tráng, các mảnh giáp bay vào lắp ghép vào người nhân vật.
