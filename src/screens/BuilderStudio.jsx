import React, { useState } from "react";
import {
  Card,
  Button,
  Badge,
  StatusPill,
  Meter,
  Segmented,
  IconTile,
  cx,
} from "../components/primitives.jsx";
import { BLOCKS, AI_SUGGESTIONS } from "../data/mock.js";
import {
  Save,
  Eye,
  Rocket,
  Monitor,
  Tablet,
  Smartphone,
  Sparkles,
  Wand2,
  SlidersHorizontal,
  Check,
  X,
  RefreshCw,
  Plus,
  FileText,
  ChevronRight,
  CircleDot,
  Layout,
} from "lucide-react";

const PAGES = [
  { name: "Trang chủ", blocks: 6, active: true },
  { name: "Lịch học", blocks: 3 },
  { name: "Liên hệ", blocks: 2 },
  { name: "Cảm ơn", blocks: 1 },
];

const DEVICE_WIDTH = {
  desktop: "max-w-full",
  tablet: "max-w-[760px]",
  mobile: "max-w-[380px]",
};

/* ---------- Canvas: a mock landing page ---------- */
function Canvas({ device, selected, onSelect }) {
  const sel = (id) =>
    cx(
      "relative cursor-pointer transition-all duration-200",
      selected === id
        ? "outline outline-2 outline-offset-2 outline-brand-cyan"
        : "hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-brand-cyan/40"
    );

  return (
    <div className="flex justify-center">
      <div
        className={cx(
          "w-full overflow-hidden rounded-xl2 border border-line bg-white shadow-card transition-all duration-300",
          DEVICE_WIDTH[device]
        )}
      >
        {/* Hero */}
        <section
          onClick={() => onSelect("hero")}
          className={sel("hero")}
        >
          {selected === "hero" && (
            <span className="absolute left-2 top-2 z-10 rounded-md bg-brand-cyan px-2 py-0.5 text-[10px] font-bold text-white">
              Hero
            </span>
          )}
          <div className="relative overflow-hidden bg-slate-900 px-6 py-12 text-center text-white sm:px-10 sm:py-16">
            <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-teal-500/30 blur-3xl" />
            <div className="pointer-events-none absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-violet-600/30 blur-3xl" />
            <div className="relative">
              <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold">
                🎬 Lớp học livestream
              </span>
              <h2 className="mx-auto mt-4 max-w-xl text-2xl font-extrabold leading-tight sm:text-[32px]">
                Ra mắt lớp học livestream của bạn{" "}
                <span className="bg-aurora-strong bg-clip-text text-transparent">
                  trong vài phút
                </span>
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[13px] text-slate-300">
                Dựng trang, bật phòng live, thu hút học viên và nhận đăng ký ngay
                trên một nền tảng.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <span className="rounded-xl bg-aurora-strong px-4 py-2 text-[13px] font-bold shadow-pop">
                  Tham gia buổi demo
                </span>
                <span className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-[13px] font-semibold">
                  Xem lịch học
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Lịch học */}
        <section onClick={() => onSelect("schedule")} className={sel("schedule")}>
          {selected === "schedule" && (
            <span className="absolute left-2 top-2 z-10 rounded-md bg-brand-cyan px-2 py-0.5 text-[10px] font-bold text-white">
              Lịch học
            </span>
          )}
          <div className="px-6 py-10 sm:px-10">
            <div className="text-center">
              <div className="text-[11px] font-bold uppercase tracking-wider text-brand-teal">
                Lịch học
              </div>
              <h3 className="mt-1 text-lg font-bold text-ink">
                Các buổi sắp diễn ra
              </h3>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { d: "T2 · 20:00", t: "Nhập môn dựng cảnh 3D" },
                { d: "T4 · 20:00", t: "Ánh sáng & kết xuất" },
                { d: "T6 · 20:00", t: "Live Q&A cùng mentor" },
              ].map((s) => (
                <div
                  key={s.t}
                  className="rounded-xl border border-line bg-slate-50 p-3 text-left"
                >
                  <div className="text-[11px] font-semibold text-brand-violet">
                    {s.d}
                  </div>
                  <div className="mt-1 text-[13px] font-bold text-ink">{s.t}</div>
                  <div className="mt-2 inline-flex rounded-md bg-white px-2 py-0.5 text-[10px] font-semibold text-subtle ring-1 ring-line">
                    Còn 12 chỗ
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live room embed */}
        <section onClick={() => onSelect("live")} className={sel("live")}>
          {selected === "live" && (
            <span className="absolute left-2 top-2 z-10 rounded-md bg-brand-cyan px-2 py-0.5 text-[10px] font-bold text-white">
              Live Room
            </span>
          )}
          <div className="px-6 py-10 sm:px-10">
            <div className="overflow-hidden rounded-xl2 border border-line bg-slate-900">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                <div className="flex items-center gap-2 text-white">
                  <StatusPill status="Live" />
                  <span className="text-[12px] font-semibold">Phòng demo trực tiếp</span>
                </div>
                <span className="text-[11px] text-slate-400">👀 1.248</span>
              </div>
              <div className="relative aspect-video bg-gradient-to-br from-violet-500/40 via-sky-500/30 to-teal-500/40">
                <div className="absolute inset-0 grid place-items-center">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-white/90 text-slate-900 shadow-lg">
                    ▶
                  </span>
                </div>
                <div className="absolute bottom-2 left-2 rounded-md bg-black/40 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur">
                  Host · Minh Anh
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form đăng ký */}
        <section onClick={() => onSelect("form")} className={sel("form")}>
          {selected === "form" && (
            <span className="absolute left-2 top-2 z-10 rounded-md bg-brand-cyan px-2 py-0.5 text-[10px] font-bold text-white">
              Contact Form
            </span>
          )}
          <div className="bg-slate-50 px-6 py-10 sm:px-10">
            <div className="mx-auto max-w-md rounded-xl2 border border-line bg-white p-5 shadow-soft">
              <h3 className="text-center text-base font-bold text-ink">
                Đăng ký tham gia buổi demo
              </h3>
              <div className="mt-4 space-y-2.5">
                <div className="h-9 rounded-lg border border-line bg-slate-50 px-3 text-[12px] leading-9 text-slate-400">
                  Họ và tên
                </div>
                <div className="h-9 rounded-lg border border-line bg-slate-50 px-3 text-[12px] leading-9 text-slate-400">
                  Email
                </div>
                <div className="h-9 rounded-lg border border-line bg-slate-50 px-3 text-[12px] leading-9 text-slate-400">
                  Số điện thoại
                </div>
                <div className="grid h-10 place-items-center rounded-xl bg-aurora-strong text-[13px] font-bold text-white">
                  Giữ chỗ ngay
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------- Inspector tab ---------- */
function Inspector({ selected }) {
  const labels = {
    hero: "Hero",
    schedule: "Lịch học",
    live: "Live Room",
    form: "Contact Form",
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 ring-1 ring-line">
        <CircleDot className="h-4 w-4 text-brand-cyan" />
        <span className="text-[12px] text-subtle">Đang chọn</span>
        <span className="ml-auto text-[12px] font-bold text-ink">
          {labels[selected]}
        </span>
      </div>

      <div>
        <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Bố cục
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {["Trái", "Giữa", "Phải"].map((a, i) => (
            <button
              key={a}
              className={cx(
                "rounded-lg border px-2 py-2 text-[11px] font-semibold transition-colors",
                i === 1
                  ? "border-brand-cyan bg-sky-50 text-sky-700"
                  : "border-line bg-white text-subtle hover:border-slate-300"
              )}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Màu nền
        </div>
        <div className="flex flex-wrap gap-2">
          {["bg-slate-900", "bg-white", "bg-teal-500", "bg-sky-500", "bg-violet-500", "bg-amber-400"].map(
            (c, i) => (
              <button
                key={c}
                className={cx(
                  "h-8 w-8 rounded-lg ring-1 ring-line transition-transform hover:scale-110",
                  c,
                  i === 0 && "ring-2 ring-brand-cyan ring-offset-2"
                )}
              />
            )
          )}
        </div>
      </div>

      <div className="space-y-3">
        {[
          { label: "Khoảng đệm", value: "64px", pct: 70 },
          { label: "Bo góc", value: "20px", pct: 40 },
        ].map((r) => (
          <div key={r.label}>
            <div className="mb-1.5 flex items-center justify-between text-[12px]">
              <span className="text-subtle">{r.label}</span>
              <span className="font-semibold text-ink">{r.value}</span>
            </div>
            <Meter value={r.pct} tone="cyan" />
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-line bg-slate-50 p-3 text-[12px] text-subtle">
        Mọi thay đổi được lưu vào <b className="text-ink">bản nháp</b> và chỉ hiển
        thị công khai sau khi publish.
      </div>
    </div>
  );
}

/* ---------- AI Assistant tab ---------- */
function AIPanel() {
  const [applied, setApplied] = useState(null);
  const [prompt, setPrompt] = useState(
    "Tạo landing page cho studio 3D có live demo"
  );
  return (
    <div className="space-y-4">
      <div className="rounded-xl2 border border-violet-200 bg-violet-50/60 p-3">
        <div className="mb-2 flex items-center gap-2">
          <IconTile icon={Sparkles} tone="violet" size="sm" />
          <span className="text-[13px] font-bold text-ink">Lumora AI</span>
          <Badge tone="violet" className="ml-auto">
            128 credits
          </Badge>
        </div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          className="w-full resize-none rounded-xl border border-line bg-white p-2.5 text-[13px] text-ink outline-none placeholder:text-slate-400 focus:border-brand-violet/60 focus:ring-2 focus:ring-violet-200"
          placeholder="Mô tả trang bạn muốn tạo…"
        />
        <Button variant="brand" full icon={Wand2} className="mt-2">
          Tạo gợi ý
        </Button>
      </div>

      <div>
        <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Gợi ý cho trang này
        </div>
        <div className="space-y-2">
          {AI_SUGGESTIONS.map((s, i) => (
            <div
              key={s.title}
              className={cx(
                "rounded-xl border bg-white p-3 transition-all duration-200",
                applied === i
                  ? "border-emerald-300 bg-emerald-50/50"
                  : "border-line hover:border-slate-300"
              )}
            >
              <div className="flex items-start gap-2">
                <span className={cx("mt-0.5 h-2 w-2 shrink-0 rounded-full", {
                  violet: "bg-violet-500",
                  green: "bg-emerald-500",
                  amber: "bg-amber-500",
                  coral: "bg-rose-500",
                }[s.tone])} />
                <div className="flex-1">
                  <div className="text-[12.5px] font-bold text-ink">{s.title}</div>
                  <div className="mt-0.5 text-[11.5px] text-subtle">{s.desc}</div>
                </div>
              </div>
              <div className="mt-2.5 flex items-center gap-1.5">
                {applied === i ? (
                  <span className="inline-flex items-center gap-1 text-[11.5px] font-bold text-emerald-600">
                    <Check className="h-3.5 w-3.5" /> Đã áp dụng
                  </span>
                ) : (
                  <>
                    <Button size="sm" variant="brand" icon={Check} onClick={() => setApplied(i)}>
                      Áp dụng
                    </Button>
                    <Button size="sm" variant="ghost" icon={X}>
                      Bỏ qua
                    </Button>
                    <Button size="sm" variant="ghost" icon={RefreshCw} className="ml-auto">
                      Tạo lại
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BuilderStudio() {
  const [device, setDevice] = useState("desktop");
  const [selected, setSelected] = useState("hero");
  const [rightTab, setRightTab] = useState("inspector");

  return (
    <div className="flex h-[calc(100dvh-64px)] flex-col">
      {/* Builder topbar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-line bg-white px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-aurora-strong text-white shadow-glow">
            <Layout className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-bold text-ink">
                Lớp học Livestream
              </span>
              <StatusPill status="Draft" />
            </div>
            <span className="flex items-center gap-1.5 text-[11px] text-subtle">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-500" />
              Tự động lưu · 12:04
            </span>
          </div>
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <Segmented
            size="sm"
            value={device}
            onChange={setDevice}
            options={[
              { value: "desktop", label: "", icon: Monitor },
              { value: "tablet", label: "", icon: Tablet },
              { value: "mobile", label: "", icon: Smartphone },
            ]}
          />
          <Button size="sm" variant="secondary" icon={Save}>
            Lưu nháp
          </Button>
          <Button size="sm" variant="secondary" icon={Eye}>
            Xem trước
          </Button>
          <Button size="sm" variant="brand" icon={Rocket}>
            Publish
          </Button>
        </div>
      </div>

      {/* 3-panel body */}
      <div className="grid flex-1 grid-cols-1 gap-0 overflow-hidden xl:grid-cols-[244px_minmax(0,1fr)_330px]">
        {/* LEFT: pages + blocks */}
        <div className="overflow-y-auto border-line bg-white p-4 xl:border-r">
          <div className="mb-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Trang
              </span>
              <button className="grid h-6 w-6 place-items-center rounded-lg text-subtle hover:bg-slate-100 hover:text-ink">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-0.5">
              {PAGES.map((p) => (
                <button
                  key={p.name}
                  className={cx(
                    "flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-[13px] transition-colors",
                    p.active
                      ? "bg-slate-100 font-bold text-ink"
                      : "font-medium text-subtle hover:bg-slate-50 hover:text-ink"
                  )}
                >
                  <FileText className="h-4 w-4 text-slate-400" />
                  <span className="flex-1 text-left">{p.name}</span>
                  <span className="text-[10px] text-slate-400">{p.blocks}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Thư viện block
            </span>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {BLOCKS.map((b) => (
                <button
                  key={b.name}
                  className="flex items-center gap-2 rounded-xl border border-line bg-white px-2.5 py-2 text-left text-[11.5px] font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-cyan/50 hover:shadow-soft"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-slate-100 text-[12px] text-subtle">
                    {b.icon}
                  </span>
                  <span className="truncate">{b.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER: canvas */}
        <div className="overflow-y-auto bg-grid bg-canvas p-4 md:p-6">
          <div className="mb-3 flex items-center justify-between">
            <Badge tone="cyan" icon={Monitor}>
              {device === "desktop" ? "Desktop" : device === "tablet" ? "Tablet" : "Mobile"} ·{" "}
              {device === "desktop" ? "1280px" : device === "tablet" ? "760px" : "380px"}
            </Badge>
            <span className="text-[11px] text-subtle">
              UF-02 · Builder → Preview → Publish
            </span>
          </div>
          <Canvas device={device} selected={selected} onSelect={setSelected} />
        </div>

        {/* RIGHT: inspector / AI */}
        <div className="flex flex-col overflow-hidden border-line bg-white xl:border-l">
          <div className="border-b border-line p-3">
            <Segmented
              value={rightTab}
              onChange={setRightTab}
              options={[
                { value: "inspector", label: "Inspector", icon: SlidersHorizontal },
                { value: "ai", label: "AI Assistant", icon: Sparkles },
              ]}
            />
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {rightTab === "inspector" ? (
              <Inspector selected={selected} />
            ) : (
              <AIPanel />
            )}
          </div>
          {/* bottom status */}
          <div className="border-t border-line bg-slate-50 p-3">
            <div className="mb-1.5 flex items-center justify-between text-[11px]">
              <span className="font-semibold text-subtle">Quota AI tháng này</span>
              <span className="font-bold text-ink">6.400 / 10.000</span>
            </div>
            <Meter value={64} tone="violet" />
            <div className="mt-2 flex items-center justify-between text-[10.5px] text-slate-400">
              <span>Phiên bản v12 · nháp</span>
              <span className="inline-flex items-center gap-1 text-emerald-600">
                <Check className="h-3 w-3" /> Đã đồng bộ
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
