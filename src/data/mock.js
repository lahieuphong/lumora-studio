import {
  LayoutDashboard,
  AppWindow,
  Wand2,
  Radio,
  CreditCard,
  ShieldCheck,
  Workflow,
  Sparkles,
  Users,
  Globe,
  Video,
  Blocks,
  Image,
  ScrollText,
  Palette,
  GalleryVerticalEnd,
  Building2,
  History,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Primary navigation (sidebar / tabs)                                */
/* ------------------------------------------------------------------ */
export const NAV = [
  { id: "overview", label: "Tổng quan", icon: LayoutDashboard, group: "Sản phẩm" },
  { id: "customer", label: "Customer App", icon: AppWindow, group: "Sản phẩm" },
  { id: "builder", label: "Builder Studio", icon: Wand2, group: "Sản phẩm" },
  { id: "live", label: "Live / Meeting", icon: Radio, group: "Sản phẩm" },
  { id: "billing", label: "Billing / Domain", icon: CreditCard, group: "Vận hành" },
  { id: "backoffice", label: "Backoffice", icon: ShieldCheck, group: "Vận hành" },
  { id: "flow", label: "Flow Map", icon: Workflow, group: "Vận hành" },
];

/* ------------------------------------------------------------------ */
/*  Overview — KPI cards                                                */
/* ------------------------------------------------------------------ */
export const KPIS = [
  {
    label: "Website đã publish",
    value: "1.284",
    delta: "+12,4%",
    deltaTone: "green",
    icon: Globe,
    tone: "teal",
    hint: "30 ngày gần nhất",
  },
  {
    label: "Phòng live đang hoạt động",
    value: "37",
    delta: "Live",
    deltaTone: "coral",
    icon: Radio,
    tone: "coral",
    hint: "Realtime sandbox",
  },
  {
    label: "AI credits đã dùng",
    value: "642K",
    delta: "+8,1%",
    deltaTone: "violet",
    icon: Sparkles,
    tone: "violet",
    hint: "Tổng toàn hệ thống",
  },
  {
    label: "Custom domain hoạt động",
    value: "418",
    delta: "+5,0%",
    deltaTone: "cyan",
    icon: Globe,
    tone: "cyan",
    hint: "Đã cấp SSL",
  },
  {
    label: "Báo cáo chờ xử lý",
    value: "9",
    delta: "Cần review",
    deltaTone: "amber",
    icon: ScrollText,
    tone: "amber",
    hint: "Moderation queue",
  },
  {
    label: "Doanh thu tháng (sandbox)",
    value: "284,6Tr",
    delta: "+18,2%",
    deltaTone: "green",
    icon: CreditCard,
    tone: "green",
    hint: "MRR mô phỏng",
  },
];

/* ------------------------------------------------------------------ */
/*  Overview — module grid                                             */
/* ------------------------------------------------------------------ */
export const MODULES = [
  {
    icon: Users,
    title: "Account & Workspace",
    desc: "Đăng ký, đăng nhập, tạo workspace cá nhân hoặc team với phân quyền rõ ràng.",
    tone: "teal",
    badge: "MVP Ready",
    badgeTone: "green",
    target: "customer",
  },
  {
    icon: GalleryVerticalEnd,
    title: "Template Gallery",
    desc: "Bộ template creator, lớp học, sự kiện live, landing bán hàng sẵn sàng dùng.",
    tone: "cyan",
    badge: "MVP Ready",
    badgeTone: "green",
    target: "customer",
  },
  {
    icon: Blocks,
    title: "No-code Builder",
    desc: "Kéo thả block, chỉnh layout, màu sắc và nội dung trực tiếp trên canvas.",
    tone: "violet",
    badge: "MVP Ready",
    badgeTone: "green",
    target: "builder",
  },
  {
    icon: Sparkles,
    title: "Lumora AI Assistant",
    desc: "Dựng layout, viết nội dung và gợi ý CTA bằng prompt tiếng Việt.",
    tone: "aurora",
    badge: "Production",
    badgeTone: "violet",
    target: "builder",
  },
  {
    icon: Radio,
    title: "Live Stream SDK",
    desc: "Phòng live với chat, reaction, poll, Q&A và nhúng vào trang đã publish.",
    tone: "coral",
    badge: "MVP Ready",
    badgeTone: "green",
    target: "live",
  },
  {
    icon: Video,
    title: "Meeting Room",
    desc: "Tạo phòng họp, kiểm tra thiết bị, cổng tham gia và điều khiển host.",
    tone: "cyan",
    badge: "MVP Ready",
    badgeTone: "green",
    target: "live",
  },
  {
    icon: Blocks,
    title: "Interaction Blocks",
    desc: "Form, CTA, booking, poll/Q&A, popup — gắn nhanh vào bất kỳ trang nào.",
    tone: "teal",
    badge: "In Progress",
    badgeTone: "amber",
    target: "builder",
  },
  {
    icon: Palette,
    title: "Filter / Avatar",
    desc: "Filter, overlay và avatar/VTuber mode ở mức MVP cho creator.",
    tone: "violet",
    badge: "In Progress",
    badgeTone: "amber",
    target: "live",
  },
  {
    icon: Globe,
    title: "Domain / Publish",
    desc: "Subdomain Lumora, kết nối custom domain, cấu hình DNS và cấp SSL.",
    tone: "cyan",
    badge: "Production",
    badgeTone: "violet",
    target: "billing",
  },
  {
    icon: CreditCard,
    title: "Pricing / Billing",
    desc: "Gói cước, quota, hóa đơn, trạng thái thanh toán và nâng cấp.",
    tone: "green",
    badge: "Production",
    badgeTone: "violet",
    target: "billing",
  },
  {
    icon: Building2,
    title: "Backoffice Admin",
    desc: "Quản lý user, workspace, site, template, report và billing tập trung.",
    tone: "ink",
    badge: "Admin",
    badgeTone: "slate",
    target: "backoffice",
  },
  {
    icon: History,
    title: "Audit & Logs",
    desc: "Mọi admin action nhạy cảm đều cần lý do và được ghi lại audit log.",
    tone: "slate",
    badge: "Risk",
    badgeTone: "coral",
    target: "backoffice",
  },
];

/* ------------------------------------------------------------------ */
/*  Customer App — projects                                            */
/* ------------------------------------------------------------------ */
export const PROJECTS = [
  {
    id: "p1",
    name: "Creator Portfolio",
    cover: "from-teal-400 via-sky-400 to-violet-500",
    status: "Published",
    subdomain: "minhanh.lumora.app",
    customDomain: { value: "minhanh.studio", status: "Active" },
    plan: "Creator",
    usage: 68,
    updated: "2 giờ trước",
  },
  {
    id: "p2",
    name: "Lớp học Livestream",
    cover: "from-violet-400 via-fuchsia-400 to-rose-400",
    status: "Published",
    subdomain: "lophoc-live.lumora.app",
    customDomain: { value: "—", status: "Draft" },
    plan: "Creator",
    usage: 41,
    updated: "Hôm qua",
  },
  {
    id: "p3",
    name: "Landing Page Dịch vụ",
    cover: "from-amber-400 via-orange-400 to-rose-400",
    status: "Draft",
    subdomain: "dichvu-pro.lumora.app",
    customDomain: { value: "dichvu.vn", status: "Processing" },
    plan: "Starter",
    usage: 23,
    updated: "3 ngày trước",
  },
];

/* Customer App — template gallery */
export const TEMPLATES = [
  { name: "Creator Profile", tag: "Cá nhân", tone: "from-teal-400 to-sky-500", plan: "Free" },
  { name: "Online Class", tag: "Giáo dục", tone: "from-violet-400 to-fuchsia-500", plan: "Free" },
  { name: "Live Event", tag: "Sự kiện", tone: "from-rose-400 to-orange-400", plan: "Creator" },
  { name: "Meeting Room", tag: "Họp nhóm", tone: "from-sky-400 to-indigo-500", plan: "Creator" },
  { name: "Sales Landing Page", tag: "Bán hàng", tone: "from-emerald-400 to-teal-500", plan: "Free" },
  { name: "Mini Community", tag: "Cộng đồng", tone: "from-amber-400 to-rose-400", plan: "Studio" },
];

/* Customer App — onboarding steps (UF-01) */
export const ONBOARDING = [
  { label: "Đăng ký / Đăng nhập", done: true },
  { label: "Xác minh email", done: true },
  { label: "Tạo workspace", done: true },
  { label: "Chọn mục tiêu", done: true },
  { label: "Template hoặc AI", done: false, current: true },
  { label: "Mở Builder", done: false },
];

/* ------------------------------------------------------------------ */
/*  Builder — block library                                            */
/* ------------------------------------------------------------------ */
export const BLOCKS = [
  { name: "Hero", icon: "✦" },
  { name: "Text", icon: "T" },
  { name: "Image", icon: "▧" },
  { name: "Video", icon: "▶" },
  { name: "Button CTA", icon: "◉" },
  { name: "FAQ", icon: "?" },
  { name: "Contact Form", icon: "✉" },
  { name: "Pricing", icon: "₫" },
  { name: "Gallery", icon: "▦" },
  { name: "Live Room", icon: "◐" },
  { name: "Meeting Room", icon: "◎" },
  { name: "Poll / Q&A", icon: "≡" },
  { name: "Booking", icon: "▤" },
  { name: "Popup", icon: "▢" },
];

export const AI_SUGGESTIONS = [
  { title: "Đổi tone màu sang cyan / violet", desc: "Áp bảng màu Aurora cho toàn trang", tone: "violet" },
  { title: "Thêm section Pricing", desc: "Chèn bảng giá 3 gói bên dưới Hero", tone: "green" },
  { title: "Viết lại CTA hấp dẫn hơn", desc: "Tối ưu nút “Tham gia buổi demo”", tone: "amber" },
  { title: "Tạo block Live Room", desc: "Nhúng phòng live có chat & reaction", tone: "coral" },
];

/* ------------------------------------------------------------------ */
/*  Billing — pricing plans                                            */
/* ------------------------------------------------------------------ */
export const PLANS = [
  {
    id: "starter",
    name: "Lumora Starter",
    price: "199.000đ",
    period: "/tháng",
    tagline: "Bắt đầu trang đầu tiên có live room.",
    tone: "teal",
    features: [
      "1 website",
      "1 subdomain Lumora",
      "1 custom domain",
      "Template cơ bản",
      "Live / meeting giới hạn",
      "AI credit mức thấp",
      "Có watermark Lumora",
    ],
  },
  {
    id: "creator",
    name: "Lumora Creator",
    price: "599.000đ",
    period: "/tháng",
    tagline: "Cho creator cần nhiều trang và tương tác.",
    tone: "violet",
    popular: true,
    features: [
      "3 website",
      "Custom domain",
      "Nhiều template hơn",
      "Chat, reaction, poll, Q&A",
      "Filter / overlay cơ bản",
      "AI credit nhiều hơn",
      "Gỡ watermark",
    ],
  },
  {
    id: "studio",
    name: "Lumora Studio",
    price: "1.990.000đ",
    period: "/tháng",
    tagline: "Team workspace, premium và ưu tiên hỗ trợ.",
    tone: "cyan",
    features: [
      "10 website",
      "Team workspace",
      "Nhiều custom domain",
      "Template premium",
      "AI credit cao",
      "Avatar / VTuber / filter nâng cao",
      "Analytics cơ bản · Ưu tiên hỗ trợ",
    ],
  },
];

/* Billing — invoices */
export const INVOICES = [
  { id: "INV-2026-0312", date: "01/06/2026", plan: "Lumora Creator", amount: "599.000đ", status: "Paid" },
  { id: "INV-2026-0289", date: "01/05/2026", plan: "Lumora Creator", amount: "599.000đ", status: "Paid" },
  { id: "INV-2026-0264", date: "01/04/2026", plan: "Lumora Creator", amount: "599.000đ", status: "Failed" },
  { id: "INV-2026-0241", date: "01/03/2026", plan: "Lumora Starter", amount: "199.000đ", status: "Paid" },
];

/* Billing — usage meters */
export const USAGE = [
  { label: "Website", used: 2, total: 3, unit: "trang", tone: "teal" },
  { label: "AI credits", used: 6400, total: 10000, unit: "credit", tone: "violet" },
  { label: "Giờ live / meeting", used: 18, total: 40, unit: "giờ", tone: "cyan" },
  { label: "Custom domain", used: 1, total: 2, unit: "domain", tone: "green" },
];

/* Domain — DNS records */
export const DNS_RECORDS = [
  { type: "CNAME", host: "www", value: "cname.lumora.app", status: "Verified" },
  { type: "A", host: "@", value: "76.21.40.118", status: "Verified" },
  { type: "TXT", host: "_lumora", value: "lumora-verify=8f2a…", status: "Pending" },
];

/* ------------------------------------------------------------------ */
/*  Backoffice — admin KPIs                                             */
/* ------------------------------------------------------------------ */
export const ADMIN_KPIS = [
  { label: "Tổng người dùng", value: "12.840", tone: "teal", icon: Users },
  { label: "Workspace hoạt động", value: "3.210", tone: "cyan", icon: Building2 },
  { label: "Website đã publish", value: "1.284", tone: "violet", icon: Globe },
  { label: "Báo cáo đang mở", value: "9", tone: "amber", icon: ScrollText },
  { label: "Thanh toán lỗi", value: "5", tone: "coral", icon: CreditCard },
  { label: "Lỗi domain / SSL", value: "3", tone: "coral", icon: Globe },
  { label: "Sự kiện audit (24h)", value: "486", tone: "slate", icon: History },
];

/* Backoffice — admin modules nav */
export const ADMIN_MODULES = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "users", label: "Users & Workspaces", icon: Users },
  { id: "sites", label: "Sites & Templates", icon: Globe },
  { id: "rooms", label: "Live / Meeting Control", icon: Radio },
  { id: "reports", label: "Reports & Moderation", icon: ScrollText },
  { id: "billingadmin", label: "Billing & Plans", icon: CreditCard },
  { id: "domains", label: "Domain & Integrations", icon: Globe },
  { id: "audit", label: "Audit, Policy & Settings", icon: ShieldCheck },
];

/* Backoffice — users table */
export const ADMIN_USERS = [
  { name: "Trần Minh Anh", email: "minhanh@studio.vn", plan: "Creator", workspaces: 2, status: "Active", risk: "Thấp" },
  { name: "Lê Hoàng Phúc", email: "phuc.le@lumora.app", plan: "Studio", workspaces: 5, status: "Active", risk: "Thấp" },
  { name: "Nguyễn Bảo Châu", email: "chau.nb@gmail.com", plan: "Starter", workspaces: 1, status: "Warning", risk: "Trung bình" },
  { name: "Phạm Gia Huy", email: "giahuy@event.vn", plan: "Creator", workspaces: 3, status: "Suspended", risk: "Cao" },
  { name: "Đỗ Thuỳ Linh", email: "linh.do@class.edu.vn", plan: "Studio", workspaces: 4, status: "Active", risk: "Thấp" },
];

/* Backoffice — report queue */
export const ADMIN_REPORTS = [
  { id: "RP-1042", target: "live: Demo sản phẩm 3D", type: "Spam quảng cáo", risk: "Trung bình", reporter: "viewer_2381", time: "12 phút trước" },
  { id: "RP-1041", target: "site: khuyenmai-sock.lumora.app", type: "Nội dung gây hiểu lầm", risk: "Cao", reporter: "system", time: "44 phút trước" },
  { id: "RP-1038", target: "room: Lớp luyện thi tối", type: "Khác", risk: "Thấp", reporter: "host_881", time: "2 giờ trước" },
];

/* Backoffice — billing issue queue */
export const ADMIN_BILLING = [
  { id: "INV-2026-0264", owner: "Trần Minh Anh", plan: "Creator", amount: "599.000đ", issue: "Thẻ bị từ chối", status: "Failed" },
  { id: "INV-2026-0258", owner: "Phạm Gia Huy", plan: "Creator", amount: "599.000đ", issue: "Webhook chưa nhận", status: "Processing" },
  { id: "INV-2026-0250", owner: "Vũ Đức Anh", plan: "Studio", amount: "1.990.000đ", issue: "Yêu cầu hoàn tiền", status: "Pending" },
];

/* Backoffice — domain issue queue */
export const ADMIN_DOMAINS = [
  { domain: "dichvu.vn", owner: "Landing Page Dịch vụ", issue: "CNAME chưa trỏ đúng", ssl: "Processing", status: "Warning" },
  { domain: "shop-live.com", owner: "Creator Portfolio", issue: "SSL cấp thất bại", ssl: "Failed", status: "Failed" },
  { domain: "hoithao2026.vn", owner: "Live Event", issue: "Chờ xác minh DNS", ssl: "Pending", status: "Pending" },
];

/* Backoffice — audit log */
export const AUDIT_LOG = [
  { actor: "Super Admin", action: "Tạm khoá người dùng", target: "Phạm Gia Huy", reason: "Vi phạm chính sách nội dung", time: "09:42", tone: "coral" },
  { actor: "Super Admin", action: "Gỡ publish website", target: "khuyenmai-sock.lumora.app", reason: "Báo cáo nội dung gây hiểu lầm", time: "09:18", tone: "amber" },
  { actor: "Super Admin", action: "Thử lại thanh toán", target: "INV-2026-0264", reason: "Hỗ trợ khách hàng theo yêu cầu", time: "08:55", tone: "cyan" },
  { actor: "Super Admin", action: "Ghi đè domain thủ công", target: "shop-live.com", reason: "SSL provisioning thất bại 3 lần", time: "08:30", tone: "violet" },
  { actor: "Super Admin", action: "Publish template", target: "Mini Community", reason: "Hoàn tất kiểm duyệt nội dung", time: "08:02", tone: "green" },
];
