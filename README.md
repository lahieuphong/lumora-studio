# Lumora Studio — MVP Product Interface

Prototype giao diện cho **Lumora Studio**, một nền tảng self-serve SaaS giúp người dùng tạo website/web app không cần code, kèm module Live/Meeting, AI Assistant, billing và backoffice quản trị.

Đây là **prototype high-fidelity dùng mock data** — không cần backend, không gọi API thật. Mục tiêu là demo end-to-end cho stakeholder.

> Ngôn ngữ giao diện: Tiếng Việt · Màn hình mặc định: **Tổng quan / Product Command Center**

---

## Cách chạy

Yêu cầu: **Node.js 18+** và npm.

```bash
# 1. Cài dependencies
npm install

# 2. Chạy môi trường dev
npm run dev
```

Sau đó mở đường dẫn mà Vite in ra (mặc định `http://localhost:5173`).

Các lệnh khác:

```bash
npm run build     # build production vào thư mục dist/
npm run preview   # xem thử bản build
```

---

## Công nghệ

- **React 18** + **Vite 5**
- **Tailwind CSS 3** (design tokens tuỳ biến trong `tailwind.config.js`)
- **lucide-react** cho icon
- Không dùng ảnh/asset bản quyền — toàn bộ hình ảnh được dựng bằng gradient, shape và CSS

---

## Hệ thống thiết kế

- Theme **Lumora OS / Creator Cloud**, điểm nhấn là **aurora gradient** (teal → cyan → violet)
- Card bo góc lớn (20–28px), soft shadow, glassmorphism nhẹ, nhiều whitespace
- Font **Inter**, transition 200ms, có hover / focus / status state
- Trạng thái chuẩn: Active, Draft, Published, Live, Processing, Failed, Warning, Suspended…

---

## Cấu trúc màn hình

| # | Tab | Nội dung |
|---|-----|----------|
| 1 | **Tổng quan** | Hero, KPI cards, lưới 12 module (Product Command Center) |
| 2 | **Customer App** | Dashboard workspace, project cards, onboarding, template gallery |
| 3 | **Builder Studio** | No-code builder 3 panel: Pages + Block library · Canvas · Inspector + AI Assistant |
| 4 | **Live / Meeting** | Live Room (chat, reaction, poll, Q&A) và Meeting Room (device check, host controls) |
| 5 | **Billing / Domain** | 3 gói pricing, usage meter, hoá đơn, kết nối custom domain + SSL |
| 6 | **Backoffice** | Console Super Admin: users, reports, billing, domain, templates, audit log |
| 7 | **Flow Map** | Bản đồ luồng dạng stepper cho 9 user flow (UF) và 6 backoffice flow (BO) |

---

## Cấu trúc thư mục

```
src/
├─ App.jsx                 # Shell: sidebar + topbar + điều hướng tab
├─ main.jsx
├─ index.css               # Tailwind + style nền
├─ components/
│  ├─ primitives.jsx       # Button, Card, Badge, StatusPill, MetricCard, ModuleCard…
│  ├─ Sidebar.jsx
│  ├─ Topbar.jsx
│  └─ ScreenFrame.jsx
├─ data/
│  ├─ mock.js              # Mock data: KPI, projects, plans, invoices, admin…
│  └─ flows.js             # Dữ liệu Flow Map (UF-01..09, BO-01..06)
└─ screens/                # 7 màn hình tương ứng các tab
```

---

## Ghi chú

- Mọi hành động admin nhạy cảm đều gắn nhãn **"Cần lý do" / "Xác nhận"** và hàm ý ghi vào audit log.
- Nội dung tập trung vào livestream, giáo dục, creator, cộng đồng, sự kiện và bán hàng hợp pháp — không có module 18+.
- Toàn bộ dữ liệu là giả lập phục vụ demo.
