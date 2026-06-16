import React, { useState } from "react";
import ScreenFrame from "../components/ScreenFrame.jsx";
import {
  Card,
  Button,
  Badge,
  StatusPill,
  IconTile,
  Avatar,
} from "../components/primitives.jsx";
import {
  ADMIN_KPIS,
  ADMIN_MODULES,
  ADMIN_USERS,
  ADMIN_REPORTS,
  ADMIN_BILLING,
  ADMIN_DOMAINS,
  AUDIT_LOG,
  PROJECTS,
  TEMPLATES,
} from "../data/mock.js";
import {
  Search,
  ShieldCheck,
  ShieldAlert,
  Lock,
  History,
  Ban,
  UserCheck,
  RefreshCw,
  RotateCcw,
  Globe,
  EyeOff,
  Eye,
  Flag,
  Check,
  X,
  Wrench,
  FileText,
  ChevronRight,
  AlertTriangle,
  Radio,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Small admin helpers                                                */
/* ------------------------------------------------------------------ */
function ReasonBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-700 ring-1 ring-inset ring-amber-600/20">
      <FileText className="h-3 w-3" /> Cần lý do
    </span>
  );
}
function ConfirmBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-1.5 py-0.5 text-[10px] font-bold text-rose-600 ring-1 ring-inset ring-rose-500/20">
      <ShieldAlert className="h-3 w-3" /> Xác nhận
    </span>
  );
}

const RISK_TONE = { Thấp: "green", "Trung bình": "amber", Cao: "coral" };

/* map audit tone -> static bg class (JIT-safe, no dynamic class names) */
const DOT_TONE = {
  coral: "bg-rose-500",
  amber: "bg-amber-500",
  cyan: "bg-sky-500",
  violet: "bg-violet-500",
  green: "bg-emerald-500",
  teal: "bg-teal-500",
  slate: "bg-slate-500",
};

function PanelHead({ title, desc, children }) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-lg font-bold tracking-tight text-ink">{title}</h2>
        {desc && <p className="mt-0.5 text-[13px] text-subtle">{desc}</p>}
      </div>
      {children}
    </div>
  );
}

function AdminTable({ head, children, min = 760 }) {
  return (
    <Card pad={false} className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left" style={{ minWidth: min }}>
          <thead>
            <tr className="border-b border-line bg-slate-50/70 text-[11px] font-bold uppercase tracking-wide text-subtle">
              {head.map((h) => (
                <th key={h.k} className={`px-5 py-3 ${h.right ? "text-right" : ""}`}>
                  {h.k}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">{children}</tbody>
        </table>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Module: Dashboard                                                  */
/* ------------------------------------------------------------------ */
function AdminDashboard() {
  const queues = [
    { label: "Báo cáo cần xử lý", value: 9, tone: "amber", icon: Flag },
    { label: "Thanh toán lỗi", value: 5, tone: "coral", icon: RefreshCw },
    { label: "Lỗi domain / SSL", value: 3, tone: "coral", icon: Globe },
  ];
  return (
    <div className="space-y-6">
      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {ADMIN_KPIS.map((k) => (
          <Card key={k.label} className="flex items-center gap-3" pad>
            <IconTile icon={k.icon} tone={k.tone} />
            <div>
              <div className="text-xl font-extrabold leading-none tracking-tight text-ink">
                {k.value}
              </div>
              <div className="mt-1 text-[12px] font-medium text-subtle">{k.label}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_1.3fr]">
        {/* queues */}
        <Card>
          <PanelHead title="Hàng đợi ưu tiên" />
          <div className="space-y-2.5">
            {queues.map((q) => (
              <button
                key={q.label}
                className="flex w-full items-center justify-between rounded-xl border border-line bg-slate-50/60 px-3.5 py-3 text-left transition-colors hover:bg-slate-100"
              >
                <span className="flex items-center gap-2.5">
                  <IconTile icon={q.icon} tone={q.tone} size="sm" />
                  <span className="text-[13.5px] font-semibold text-ink">{q.label}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Badge tone={q.tone}>{q.value}</Badge>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </span>
              </button>
            ))}
          </div>
        </Card>

        {/* recent audit */}
        <Card pad={false} className="overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <PanelHead title="Audit log gần đây" />
            <Badge tone="slate" icon={History}>
              Realtime
            </Badge>
          </div>
          <div className="divide-y divide-line">
            {AUDIT_LOG.slice(0, 4).map((a, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3">
                <span className={`h-2 w-2 shrink-0 rounded-full ${DOT_TONE[a.tone] || "bg-slate-500"}`} />
                <div className="min-w-0 flex-1">
                  <span className="text-[13px] font-semibold text-ink">{a.action}</span>
                  <span className="text-[13px] text-subtle"> · {a.target}</span>
                </div>
                <span className="shrink-0 text-[11px] font-medium text-slate-400">{a.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Module: Users & Workspaces                                         */
/* ------------------------------------------------------------------ */
function AdminUsers() {
  return (
    <div className="space-y-4">
      <PanelHead title="Người dùng & Workspace" desc="Tìm kiếm, kiểm tra và xử lý tài khoản vi phạm.">
        <div className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            placeholder="Tìm theo tên hoặc email…"
            className="w-56 bg-transparent text-[13px] text-ink outline-none placeholder:text-slate-400"
          />
        </div>
      </PanelHead>

      <AdminTable
        head={[
          { k: "Người dùng" },
          { k: "Gói" },
          { k: "Workspace" },
          { k: "Trạng thái" },
          { k: "Rủi ro" },
          { k: "Hành động", right: true },
        ]}
      >
        {ADMIN_USERS.map((u) => (
          <tr key={u.email} className="text-[13px] hover:bg-slate-50/60">
            <td className="px-5 py-3">
              <div className="flex items-center gap-3">
                <Avatar name={u.name} size="sm" />
                <div>
                  <div className="font-semibold text-ink">{u.name}</div>
                  <div className="text-[12px] text-subtle">{u.email}</div>
                </div>
              </div>
            </td>
            <td className="px-5 py-3">
              <Badge tone="violet">{u.plan}</Badge>
            </td>
            <td className="px-5 py-3 text-subtle">{u.workspaces} workspace</td>
            <td className="px-5 py-3">
              <StatusPill
                status={u.status}
                label={
                  u.status === "Active"
                    ? "Hoạt động"
                    : u.status === "Suspended"
                    ? "Đã khoá"
                    : "Cảnh báo"
                }
              />
            </td>
            <td className="px-5 py-3">
              <Badge tone={RISK_TONE[u.risk]}>{u.risk}</Badge>
            </td>
            <td className="px-5 py-3">
              <div className="flex items-center justify-end gap-1.5">
                {u.status === "Suspended" ? (
                  <Button variant="secondary" size="sm" icon={UserCheck}>
                    Mở khoá
                  </Button>
                ) : (
                  <Button variant="danger" size="sm" icon={Ban}>
                    Tạm khoá
                  </Button>
                )}
                <ReasonBadge />
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Module: Reports & Moderation                                       */
/* ------------------------------------------------------------------ */
function AdminReports() {
  return (
    <div className="space-y-4">
      <PanelHead
        title="Báo cáo & Kiểm duyệt"
        desc="Xem xét đối tượng bị báo cáo, đánh giá rủi ro rồi xử lý hoặc bỏ qua."
      />
      <div className="grid gap-4">
        {ADMIN_REPORTS.map((r) => (
          <Card key={r.id} className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <IconTile icon={Flag} tone="coral" />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[12px] font-bold text-subtle">{r.id}</span>
                  <Badge tone={RISK_TONE[r.risk]}>Rủi ro: {r.risk}</Badge>
                </div>
                <div className="mt-1 text-[14px] font-semibold text-ink">{r.target}</div>
                <div className="mt-0.5 text-[12.5px] text-subtle">
                  {r.type} · báo cáo bởi {r.reporter} · {r.time}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <ReasonBadge />
              <Button variant="ghost" size="sm" icon={X}>
                Bỏ qua
              </Button>
              <Button variant="secondary" size="sm" icon={EyeOff}>
                Gỡ publish
              </Button>
              <Button variant="dangerSolid" size="sm" icon={Check}>
                Xử lý vi phạm
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Module: Sites & Templates                                          */
/* ------------------------------------------------------------------ */
function AdminSites() {
  return (
    <div className="space-y-6">
      <div>
        <PanelHead title="Website đã publish" desc="Giám sát site đang hoạt động và can thiệp khi cần." />
        <AdminTable
          head={[
            { k: "Website" },
            { k: "Subdomain" },
            { k: "Domain riêng" },
            { k: "Trạng thái" },
            { k: "Hành động", right: true },
          ]}
        >
          {PROJECTS.map((p) => (
            <tr key={p.id} className="text-[13px] hover:bg-slate-50/60">
              <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${p.cover}`} />
                  <span className="font-semibold text-ink">{p.name}</span>
                </div>
              </td>
              <td className="px-5 py-3 font-mono text-[12px] text-subtle">{p.subdomain}</td>
              <td className="px-5 py-3">
                {p.customDomain.value === "—" ? (
                  <span className="text-slate-400">—</span>
                ) : (
                  <StatusPill status={p.customDomain.status} label={p.customDomain.value} />
                )}
              </td>
              <td className="px-5 py-3">
                <StatusPill status={p.status} label={p.status === "Published" ? "Đã publish" : "Bản nháp"} />
              </td>
              <td className="px-5 py-3">
                <div className="flex items-center justify-end gap-1.5">
                  <Button variant="danger" size="sm" icon={EyeOff}>
                    Gỡ publish
                  </Button>
                  <ConfirmBadge />
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      </div>

      <div>
        <PanelHead title="Quản lý template" desc="Duyệt nội dung trước khi đưa template lên thư viện công khai." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((t) => (
            <Card key={t.name} className="flex flex-col">
              <div className={`h-24 rounded-xl2 bg-gradient-to-br ${t.tone}`} />
              <div className="mt-3 flex items-center justify-between">
                <h3 className="text-[14px] font-bold text-ink">{t.name}</h3>
                <Badge tone="slate">{t.plan}</Badge>
              </div>
              <p className="mt-0.5 text-[12px] text-subtle">{t.tag}</p>
              <div className="mt-3 flex items-center gap-2">
                <Button variant="secondary" size="sm" icon={Eye} full>
                  Publish
                </Button>
                <Button variant="ghost" size="sm" icon={EyeOff}>
                  Ẩn
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Module: Live / Meeting control                                     */
/* ------------------------------------------------------------------ */
function AdminRooms() {
  const rooms = [
    { name: "Demo studio 3D", host: "Minh Anh", type: "Live", viewers: 328, status: "Live" },
    { name: "Lớp luyện thi tối", host: "Thuỳ Linh", type: "Meeting", viewers: 24, status: "Live" },
    { name: "Hội thảo creator 2026", host: "Gia Huy", type: "Live", viewers: 0, status: "Draft" },
  ];
  return (
    <div className="space-y-4">
      <PanelHead title="Điều phối Live / Meeting" desc="Theo dõi phòng đang hoạt động và tạm dừng khi vi phạm." />
      <AdminTable
        head={[
          { k: "Phòng" },
          { k: "Host" },
          { k: "Loại" },
          { k: "Người xem" },
          { k: "Trạng thái" },
          { k: "Hành động", right: true },
        ]}
      >
        {rooms.map((r) => (
          <tr key={r.name} className="text-[13px] hover:bg-slate-50/60">
            <td className="px-5 py-3 font-semibold text-ink">{r.name}</td>
            <td className="px-5 py-3 text-subtle">{r.host}</td>
            <td className="px-5 py-3">
              <Badge tone={r.type === "Live" ? "coral" : "cyan"} icon={r.type === "Live" ? Radio : undefined}>
                {r.type}
              </Badge>
            </td>
            <td className="px-5 py-3 text-subtle">{r.viewers}</td>
            <td className="px-5 py-3">
              <StatusPill status={r.status} label={r.status === "Live" ? "Đang phát" : "Bản nháp"} />
            </td>
            <td className="px-5 py-3">
              <div className="flex items-center justify-end gap-1.5">
                <Button variant="danger" size="sm" icon={Ban} disabled={r.status !== "Live"}>
                  Dừng phòng
                </Button>
                <ConfirmBadge />
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Module: Billing & Plans                                            */
/* ------------------------------------------------------------------ */
function AdminBilling() {
  return (
    <div className="space-y-4">
      <PanelHead title="Hỗ trợ thanh toán" desc="Xử lý hoá đơn lỗi, kiểm tra webhook và hoàn tiền theo yêu cầu." />
      <AdminTable
        head={[
          { k: "Hoá đơn" },
          { k: "Chủ tài khoản" },
          { k: "Gói" },
          { k: "Số tiền" },
          { k: "Vấn đề" },
          { k: "Hành động", right: true },
        ]}
        min={820}
      >
        {ADMIN_BILLING.map((b) => (
          <tr key={b.id} className="text-[13px] hover:bg-slate-50/60">
            <td className="px-5 py-3 font-mono font-semibold text-ink">{b.id}</td>
            <td className="px-5 py-3 text-ink">{b.owner}</td>
            <td className="px-5 py-3">
              <Badge tone="violet">{b.plan}</Badge>
            </td>
            <td className="px-5 py-3 font-semibold text-ink">{b.amount}</td>
            <td className="px-5 py-3">
              <div className="flex items-center gap-2">
                <StatusPill
                  status={b.status}
                  label={
                    b.status === "Failed" ? "Thất bại" : b.status === "Processing" ? "Đang xử lý" : "Chờ duyệt"
                  }
                />
                <span className="text-[12px] text-subtle">{b.issue}</span>
              </div>
            </td>
            <td className="px-5 py-3">
              <div className="flex items-center justify-end gap-1.5">
                <Button variant="ghost" size="sm" icon={RotateCcw}>
                  Hoàn tiền
                </Button>
                <Button variant="secondary" size="sm" icon={RefreshCw}>
                  Thử lại
                </Button>
                <ReasonBadge />
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Module: Domain & Integrations                                      */
/* ------------------------------------------------------------------ */
function AdminDomains() {
  return (
    <div className="space-y-4">
      <PanelHead title="Domain & SSL" desc="Can thiệp thủ công khi DNS hoặc SSL không tự xử lý được." />
      <div className="grid gap-4">
        {ADMIN_DOMAINS.map((d) => (
          <Card key={d.domain} className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <IconTile icon={Globe} tone={d.status === "Failed" ? "coral" : "amber"} />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[14px] font-bold text-ink">{d.domain}</span>
                  <StatusPill
                    status={d.status}
                    label={d.status === "Failed" ? "Lỗi" : d.status === "Warning" ? "Cảnh báo" : "Chờ xử lý"}
                  />
                </div>
                <div className="mt-1 text-[13px] text-subtle">{d.owner}</div>
                <div className="mt-1 flex items-center gap-3 text-[12px]">
                  <span className="flex items-center gap-1 text-slate-500">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-500" /> {d.issue}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500">SSL: {d.ssl}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <ConfirmBadge />
              <Button variant="secondary" size="sm" icon={RefreshCw}>
                Xác minh lại
              </Button>
              <Button variant="primary" size="sm" icon={Wrench}>
                Ghi đè thủ công
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Module: Audit, Policy & Settings                                   */
/* ------------------------------------------------------------------ */
function AdminAudit() {
  return (
    <div className="space-y-4">
      <PanelHead
        title="Audit, Chính sách & Cấu hình"
        desc="Mọi hành động admin nhạy cảm đều được ghi lại kèm lý do."
      >
        <Badge tone="ink" icon={ShieldCheck}>
          Super Admin
        </Badge>
      </PanelHead>

      <Card pad={false} className="overflow-hidden">
        <div className="divide-y divide-line">
          {AUDIT_LOG.map((a, i) => (
            <div key={i} className="flex flex-col gap-2 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${DOT_TONE[a.tone] || "bg-slate-500"}`} />
                <div>
                  <div className="text-[13.5px]">
                    <span className="font-semibold text-ink">{a.action}</span>
                    <span className="text-subtle"> → {a.target}</span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-1.5 text-[12px] text-subtle">
                    <FileText className="h-3.5 w-3.5 text-slate-400" />
                    Lý do: {a.reason}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 pl-5 sm:pl-0">
                <Badge tone="slate">{a.actor}</Badge>
                <span className="text-[12px] font-medium text-slate-400">{a.time}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Chính sách nội dung", desc: "Quy định an toàn cho site & room", icon: ShieldCheck, tone: "teal" },
          { label: "Phân quyền admin", desc: "Super Admin · roadmap mở rộng role", icon: Lock, tone: "violet" },
          { label: "Nhật ký hệ thống", desc: "486 sự kiện trong 24 giờ", icon: History, tone: "slate" },
        ].map((c) => (
          <Card key={c.label} hover>
            <IconTile icon={c.icon} tone={c.tone} />
            <h3 className="mt-3 text-[14px] font-bold text-ink">{c.label}</h3>
            <p className="mt-1 text-[12.5px] text-subtle">{c.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Router                                                             */
/* ------------------------------------------------------------------ */
const VIEWS = {
  dashboard: AdminDashboard,
  users: AdminUsers,
  sites: AdminSites,
  rooms: AdminRooms,
  reports: AdminReports,
  billingadmin: AdminBilling,
  domains: AdminDomains,
  audit: AdminAudit,
};

export default function Backoffice() {
  const [active, setActive] = useState("dashboard");
  const View = VIEWS[active] || AdminDashboard;

  return (
    <ScreenFrame
      title="Backoffice"
      subtitle="Bảng điều khiển nội bộ cho Super Admin: quản lý người dùng, nội dung, thanh toán, domain và audit log."
      badge="Super Admin"
      badgeTone="ink"
    >
      {/* admin console banner */}
      <Card
        pad={false}
        className="mb-5 overflow-hidden border-slate-800 bg-slate-900 text-white"
      >
        <div className="relative flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl2 bg-white/10 backdrop-blur">
              <ShieldCheck className="h-6 w-6 text-emerald-300" />
            </div>
            <div>
              <div className="text-[15px] font-bold">Lumora Admin Console</div>
              <div className="text-[12.5px] text-slate-300">
                Mọi hành động nhạy cảm đều cần lý do và được ghi vào audit log.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-[12px] font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-400/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Hệ thống ổn định
            </span>
          </div>
        </div>
      </Card>

      {/* admin sub-nav */}
      <div className="mb-6 -mx-1 overflow-x-auto px-1 pb-1">
        <div className="flex items-center gap-1.5">
          {ADMIN_MODULES.map((m) => {
            const on = active === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActive(m.id)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-[13px] font-semibold transition-all duration-200 ${
                  on
                    ? "border-transparent bg-ink text-white shadow-soft"
                    : "border-line bg-white text-subtle hover:border-slate-300 hover:text-ink"
                }`}
              >
                <m.icon className="h-4 w-4" />
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      <View />
    </ScreenFrame>
  );
}
