import React, { useState } from "react";
import ScreenFrame from "../components/ScreenFrame.jsx";
import {
  Card,
  Button,
  Badge,
  StatusPill,
  SectionTitle,
  Meter,
  Segmented,
  IconTile,
} from "../components/primitives.jsx";
import { PLANS, INVOICES, USAGE, DNS_RECORDS } from "../data/mock.js";
import {
  Check,
  CreditCard,
  Sparkles,
  Globe,
  Plus,
  ArrowUpRight,
  AlertTriangle,
  Download,
  ShieldCheck,
  RefreshCw,
  Lock,
  Copy,
  ExternalLink,
  Zap,
  Server,
  Headphones,
  CheckCircle2,
  Loader2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Pricing card                                                       */
/* ------------------------------------------------------------------ */
function PricingCard({ plan, selected, onSelect }) {
  const ring =
    plan.tone === "violet"
      ? "ring-violet-500"
      : plan.tone === "cyan"
      ? "ring-sky-500"
      : "ring-teal-500";
  const dot =
    plan.tone === "violet"
      ? "text-violet-500"
      : plan.tone === "cyan"
      ? "text-sky-500"
      : "text-teal-500";

  return (
    <Card
      className={`relative flex flex-col ${
        selected ? `ring-2 ${ring} shadow-card` : "hover:border-slate-300"
      } ${plan.popular ? "lg:-mt-2 lg:mb-2" : ""}`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-aurora-strong px-3 py-1 text-[11px] font-bold text-white shadow-pop">
            Phổ biến nhất
          </span>
        </div>
      )}
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-extrabold tracking-tight text-ink">{plan.name}</h3>
        {selected && <Badge tone={plan.tone}>Đang chọn</Badge>}
      </div>
      <p className="mt-1 text-[12.5px] text-subtle">{plan.tagline}</p>
      <div className="mt-4 flex items-end gap-1">
        <span className="text-[28px] font-extrabold leading-none tracking-tight text-ink">
          {plan.price}
        </span>
        <span className="pb-0.5 text-[13px] font-medium text-subtle">{plan.period}</span>
      </div>

      <div className="mt-4 flex-1 space-y-2.5 border-t border-line pt-4">
        {plan.features.map((f) => (
          <div key={f} className="flex items-start gap-2 text-[13px] text-slate-600">
            <Check className={`mt-0.5 h-4 w-4 shrink-0 ${dot}`} strokeWidth={2.6} />
            {f}
          </div>
        ))}
      </div>

      <Button
        variant={selected ? "brand" : "secondary"}
        full
        className="mt-5"
        onClick={() => onSelect(plan.id)}
      >
        {selected ? "Gói hiện tại" : "Chọn gói này"}
      </Button>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Billing view                                                       */
/* ------------------------------------------------------------------ */
function BillingView() {
  const [selected, setSelected] = useState("creator");
  const [cycle, setCycle] = useState("month");

  return (
    <div className="space-y-6">
      {/* failed payment alert */}
      <div className="flex flex-col gap-3 rounded-xl3 border border-amber-200 bg-amber-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-600">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[13.5px] font-bold text-amber-900">
              Một hoá đơn chưa thanh toán thành công
            </div>
            <div className="text-[12.5px] text-amber-700">
              Hoá đơn INV-2026-0264 bị từ chối thẻ. Vui lòng thử lại để tránh gián đoạn dịch vụ.
            </div>
          </div>
        </div>
        <Button variant="dangerSolid" size="sm" icon={RefreshCw} className="shrink-0">
          Thử thanh toán lại
        </Button>
      </div>

      {/* pricing */}
      <div>
        <SectionTitle
          eyebrow="Gói cước"
          title="Chọn gói phù hợp với studio của bạn"
          desc="Nâng cấp bất cứ lúc nào. Quota và tính năng áp dụng ngay sau khi thanh toán."
          right={
            <Segmented
              options={[
                { value: "month", label: "Hằng tháng" },
                { value: "year", label: "Hằng năm · -20%" },
              ]}
              value={cycle}
              onChange={setCycle}
              size="sm"
            />
          }
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {PLANS.map((p) => (
            <PricingCard key={p.id} plan={p} selected={selected === p.id} onSelect={setSelected} />
          ))}
        </div>
      </div>

      {/* current plan + usage */}
      <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-aurora opacity-70 blur-2xl" />
          <div className="relative">
            <Badge tone="violet" icon={Sparkles}>
              Gói hiện tại
            </Badge>
            <h3 className="mt-3 text-xl font-extrabold tracking-tight text-ink">
              Lumora Creator
            </h3>
            <div className="mt-1 flex items-end gap-1">
              <span className="text-2xl font-extrabold text-ink">599.000đ</span>
              <span className="pb-1 text-[13px] text-subtle">/tháng</span>
            </div>
            <p className="mt-3 text-[13px] text-subtle">
              Gia hạn tiếp theo vào <span className="font-semibold text-ink">01/07/2026</span>.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="brand" size="sm" icon={ArrowUpRight}>
                Nâng cấp lên Studio
              </Button>
              <Button variant="ghost" size="sm">
                Quản lý gói
              </Button>
            </div>
          </div>
        </Card>

        <Card>
          <SectionTitle title="Hạn mức sử dụng" desc="Chu kỳ hiện tại · còn 15 ngày" />
          <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {USAGE.map((u) => {
              const pct = Math.round((u.used / u.total) * 100);
              const near = pct >= 75;
              return (
                <div key={u.label}>
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <span className="text-[13px] font-semibold text-ink">{u.label}</span>
                    <span
                      className={`text-[12px] font-medium ${
                        near ? "text-amber-600" : "text-subtle"
                      }`}
                    >
                      {u.used.toLocaleString("vi-VN")} / {u.total.toLocaleString("vi-VN")}{" "}
                      {u.unit}
                    </span>
                  </div>
                  <Meter value={pct} tone={near ? "amber" : u.tone} />
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-line bg-slate-50/60 px-3.5 py-2.5 text-[12.5px] text-subtle">
            <Zap className="h-4 w-4 text-brand-violet" />
            Khi chạm hạn mức, hệ thống sẽ nhắc nâng cấp gói thay vì gián đoạn dịch vụ.
          </div>
        </Card>
      </div>

      {/* invoices */}
      <Card pad={false} className="overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4">
          <SectionTitle title="Lịch sử hoá đơn" />
          <Button variant="secondary" size="sm" icon={Download}>
            Xuất tất cả
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-y border-line bg-slate-50/60 text-[11px] font-bold uppercase tracking-wide text-subtle">
                <th className="px-5 py-2.5">Mã hoá đơn</th>
                <th className="px-5 py-2.5">Ngày</th>
                <th className="px-5 py-2.5">Gói</th>
                <th className="px-5 py-2.5">Số tiền</th>
                <th className="px-5 py-2.5">Trạng thái</th>
                <th className="px-5 py-2.5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {INVOICES.map((inv) => (
                <tr key={inv.id} className="text-[13px] transition-colors hover:bg-slate-50/60">
                  <td className="px-5 py-3 font-mono font-semibold text-ink">{inv.id}</td>
                  <td className="px-5 py-3 text-subtle">{inv.date}</td>
                  <td className="px-5 py-3 text-ink">{inv.plan}</td>
                  <td className="px-5 py-3 font-semibold text-ink">{inv.amount}</td>
                  <td className="px-5 py-3">
                    <StatusPill status={inv.status} label={inv.status === "Paid" ? "Đã thanh toán" : "Thất bại"} />
                  </td>
                  <td className="px-5 py-3 text-right">
                    {inv.status === "Failed" ? (
                      <Button variant="danger" size="sm" icon={RefreshCw}>
                        Thử lại
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" icon={Download}>
                        Tải về
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Domain view                                                        */
/* ------------------------------------------------------------------ */
const DOMAIN_STEPS = [
  { label: "Thêm domain", state: "done" },
  { label: "Cấu hình DNS", state: "done" },
  { label: "Xác minh DNS", state: "active" },
  { label: "Cấp SSL", state: "pending" },
  { label: "Hoạt động", state: "pending" },
];

function DomainView() {
  const [domain, setDomain] = useState("dichvu.vn");

  return (
    <div className="space-y-6">
      {/* subdomain */}
      <Card>
        <SectionTitle
          eyebrow="Subdomain Lumora"
          title="Địa chỉ mặc định miễn phí"
          desc="Mỗi website được cấp một subdomain Lumora, kèm SSL tự động."
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-line bg-slate-50 px-3.5 py-2.5">
            <Globe className="h-4 w-4 shrink-0 text-brand-teal" />
            <span className="flex-1 truncate font-mono text-[13.5px] font-semibold text-ink">
              creator-minhanh.lumora.app
            </span>
            <StatusPill status="Active" label="Đang hoạt động" />
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="md" icon={Copy}>
              Sao chép
            </Button>
            <Button variant="ghost" size="md" icon={ExternalLink}>
              Mở
            </Button>
          </div>
        </div>
      </Card>

      {/* add custom domain */}
      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <Card>
          <SectionTitle
            eyebrow="Custom domain"
            title="Kết nối tên miền riêng"
            desc="Domain do bạn tự mua. Lumora hỗ trợ trỏ DNS và cấp SSL ở mức MVP."
          />
          <label className="text-[11px] font-bold uppercase tracking-[0.14em] text-subtle">
            Nhập tên miền
          </label>
          <div className="mt-1.5 flex flex-col gap-2 sm:flex-row">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2.5">
              <Globe className="h-4 w-4 text-slate-400" />
              <input
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="vd: studio-cua-ban.vn"
                className="flex-1 bg-transparent text-sm font-medium text-ink outline-none placeholder:text-slate-400"
              />
            </div>
            <Button variant="brand" icon={Plus}>
              Thêm domain
            </Button>
          </div>

          {/* progress stepper */}
          <div className="mt-5 rounded-xl2 border border-line bg-slate-50/60 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[13px] font-semibold text-ink">{domain}</span>
              <StatusPill status="Processing" label="Đang xác minh" />
            </div>
            <div className="flex items-center">
              {DOMAIN_STEPS.map((s, i) => (
                <React.Fragment key={s.label}>
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`grid h-7 w-7 place-items-center rounded-full text-[11px] font-bold ${
                        s.state === "done"
                          ? "bg-emerald-500 text-white"
                          : s.state === "active"
                          ? "bg-aurora-strong text-white shadow-glow"
                          : "border border-line bg-white text-slate-400"
                      }`}
                    >
                      {s.state === "done" ? (
                        <Check className="h-4 w-4" strokeWidth={3} />
                      ) : s.state === "active" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span
                      className={`max-w-[64px] text-center text-[10.5px] font-medium leading-tight ${
                        s.state === "pending" ? "text-slate-400" : "text-ink"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < DOMAIN_STEPS.length - 1 && (
                    <div
                      className={`mx-1 mb-5 h-0.5 flex-1 rounded ${
                        s.state === "done" ? "bg-emerald-400" : "bg-slate-200"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </Card>

        {/* SSL + fallback */}
        <div className="space-y-5">
          <Card>
            <div className="flex items-center gap-2.5">
              <IconTile icon={ShieldCheck} tone="green" />
              <div>
                <h3 className="text-sm font-bold text-ink">Chứng chỉ SSL</h3>
                <p className="text-[12px] text-subtle">Tự động cấp qua Let's Encrypt</p>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between rounded-lg border border-line bg-slate-50/60 px-3 py-2 text-[13px]">
                <span className="flex items-center gap-2 text-ink">
                  <Lock className="h-4 w-4 text-emerald-500" />
                  Subdomain Lumora
                </span>
                <StatusPill status="Verified" label="Đã cấp" />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-line bg-slate-50/60 px-3 py-2 text-[13px]">
                <span className="flex items-center gap-2 text-ink">
                  <Server className="h-4 w-4 text-sky-500" />
                  Custom domain
                </span>
                <StatusPill status="Processing" label="Đang cấp" />
              </div>
            </div>
          </Card>

          <Card className="border-slate-200 bg-slate-50/40">
            <div className="flex items-center gap-2.5">
              <IconTile icon={Headphones} tone="slate" />
              <div>
                <h3 className="text-sm font-bold text-ink">Hỗ trợ thủ công</h3>
                <p className="text-[12px] text-subtle">Khi DNS/SSL không tự xử lý được</p>
              </div>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
              Nếu xác minh thất bại nhiều lần, đội ngũ Lumora có thể ghi đè domain thủ công.
              Thao tác này được ghi vào audit log ở Backoffice.
            </p>
            <Button variant="secondary" size="sm" className="mt-3" icon={Headphones}>
              Yêu cầu hỗ trợ
            </Button>
          </Card>
        </div>
      </div>

      {/* DNS records */}
      <Card pad={false} className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <SectionTitle title="Bản ghi DNS" desc="Thêm các bản ghi sau vào nhà cung cấp tên miền của bạn." />
          <Button variant="secondary" size="sm" icon={RefreshCw}>
            Kiểm tra lại DNS
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-y border-line bg-slate-50/60 text-[11px] font-bold uppercase tracking-wide text-subtle">
                <th className="px-5 py-2.5">Loại</th>
                <th className="px-5 py-2.5">Host</th>
                <th className="px-5 py-2.5">Giá trị</th>
                <th className="px-5 py-2.5">Trạng thái</th>
                <th className="px-5 py-2.5 text-right">Sao chép</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {DNS_RECORDS.map((r) => (
                <tr key={r.type + r.host} className="text-[13px] hover:bg-slate-50/60">
                  <td className="px-5 py-3">
                    <Badge tone="cyan">{r.type}</Badge>
                  </td>
                  <td className="px-5 py-3 font-mono text-ink">{r.host}</td>
                  <td className="px-5 py-3 font-mono text-subtle">{r.value}</td>
                  <td className="px-5 py-3">
                    <StatusPill status={r.status} label={r.status === "Verified" ? "Đã xác minh" : "Chờ xác minh"} />
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button className="grid h-7 w-7 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-ink ml-auto">
                      <Copy className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Screen                                                             */
/* ------------------------------------------------------------------ */
export default function BillingDomain() {
  const [tab, setTab] = useState("billing");

  return (
    <ScreenFrame
      title="Billing / Domain"
      subtitle="Quản lý gói cước, hạn mức sử dụng, hoá đơn và kết nối tên miền riêng cho website production."
      badge="Production"
      badgeTone="green"
      actions={
        <Button variant="brand" icon={ArrowUpRight}>
          Nâng cấp gói
        </Button>
      }
    >
      <div className="mb-5">
        <Segmented
          options={[
            { value: "billing", label: "Gói & Billing", icon: CreditCard },
            { value: "domain", label: "Tên miền & Publish", icon: Globe },
          ]}
          value={tab}
          onChange={setTab}
        />
      </div>

      {tab === "billing" ? <BillingView /> : <DomainView />}
    </ScreenFrame>
  );
}
