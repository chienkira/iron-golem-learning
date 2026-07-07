# Iron Golem Math Adventure

<img width="1190" height="749" alt="Screenshot 2026-07-07 at 0 55 37" src="https://github.com/user-attachments/assets/424c7ed5-5fa7-46d0-a662-8358d6535055" />

Game giáo dục kết hợp giải trí (Edutainment) cho trẻ em. Điều khiển Iron Golem khám phá bản đồ 3D, gặp quái vật Minecraft và chiến đấu bằng cách giải phép toán cộng/trừ. Giao diện tiếng Việt, tối ưu chạm trên iPad và click trên PC — không dùng bàn phím.

## Công nghệ

| Thành phần | Công nghệ |
|------------|-----------|
| UI & state | React 18, TypeScript, Zustand |
| Đồ họa 3D | Three.js, React Three Fiber, Drei |
| Build | Vite 5 (`base: './'` — deploy static được) |
| Âm thanh | Web Audio API |

## Cách chạy

```bash
npm install
npm run dev
```

Mở `http://localhost:5173`.

Build production:

```bash
npm run build
npm run preview   # xem thử bản build
```

Deploy (ví dụ):

```bash
npm run build && scp -r dist/* chienkira.a1-flex-01:~/public/iron-golem-math-adventure/
```
