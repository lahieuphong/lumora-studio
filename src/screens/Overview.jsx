import React from "react";
import ScreenFrame from "../components/ScreenFrame.jsx";
import {
  Card,
  Button,
  Badge,
  MetricCard,
  ModuleCard,
  SectionTitle,
  StatusPill,
} from "../components/primitives.jsx";
import { KPIS, MODULES } from "../data/mock.js";
import { Sparkles, Radio, Play, ArrowUpRight, Zap } from "lucide-react";

function Hero({ onNavigate }) {
  return (
    <Card pad={false} className="relative overflow-hidden border-slate-800 bg-slate-900 text-white">
      {/* aurora glows */}
      <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-teal-500/30 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-violet-600/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-48 w-72 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="relative grid gap-8 p-7 md:grid-cols-[1.4fr_1fr] md:p-9">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[12px] font-semibold backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            MVP · Demo end-to-end · Mock data
          </div>

          <h2 className="mt-5 text-[34px] font-extrabold leading-[1.05] tracking-tight md:text-[44px]">
            Lumora{" "}
            <span className="bg-aurora-strong bg-clip-text text-transparent">
              Studio
            </span>
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-300">
            AI website builder + Live/Meeting modules + Production billing +
            Backoffice management. Tạo website có live room trong vài phút —
            không cần code.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="brand" size="lg" icon={Sparkles} onClick={() => onNavigate("builder")}>
              Mở Builder Studio
            </Button>
            <Button
              size="lg"
              icon={Play}
              onClick={() => onNavigate("live")}
              className="border-white/20 bg-white/10 text-white hover:bg-white/15"
            >
              Xem Live demo
            </Button>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-slate-400">
            <span className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-brand-cyan" /> Publish an toàn với draft &
              quota check
            </span>
            <span className="flex items-center gap-2">
              <Radio className="h-4 w-4 text-brand-coral" /> Live · Meeting · Chat ·
              Poll · Q&A
            </span>
          </div>
        </div>

        {/* Mini live preview card */}
        <div className="relative">
          <div className="rounded-xl2 border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold uppercase tracking-wider text-slate-300">
                Phòng live
              </span>
              <StatusPill status="Live" />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {["from-teal-400 to-sky-500", "from-violet-400 to-fuchsia-500", "from-amber-400 to-rose-400", "from-sky-400 to-indigo-500"].map(
                (g, i) => (
                  <div
                    key={i}
                    className={`relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br ${g}`}
                  >
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute bottom-1.5 left-1.5 rounded-md bg-black/40 px-1.5 py-0.5 text-[9px] font-semibold backdrop-blur">
                      {i === 0 ? "Host" : `Khách ${i}`}
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="mt-3 space-y-1.5">
              <div className="flex items-start gap-2 rounded-lg bg-white/5 px-2.5 py-1.5">
                <span className="text-[11px]">💬</span>
                <span className="text-[11px] text-slate-300">
                  <b className="text-white">Bảo Châu:</b> Lớp học sắp bắt đầu chưa ạ?
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white/5 px-2.5 py-1.5">
                <span className="text-[11px] text-slate-300">👀 1.248 đang xem</span>
                <span className="text-[11px] font-semibold text-brand-cyan">
                  ❤️ 4.2K
                </span>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-3 -right-3 hidden rounded-xl2 border border-white/10 bg-slate-800/90 px-3 py-2 shadow-card backdrop-blur md:block">
            <div className="text-[10px] uppercase tracking-wider text-slate-400">
              AI credits
            </div>
            <div className="text-[15px] font-bold">642K đã dùng</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function Overview({ onNavigate }) {
  return (
    <ScreenFrame
      title="Tổng quan"
      subtitle="Product Command Center — trung tâm điều phối toàn bộ nền tảng Lumora Studio."
      badge="Control Center"
      badgeTone="teal"
      actions={
        <>
          <Button variant="secondary" icon={ArrowUpRight}>
            Báo cáo tuần
          </Button>
          <Button variant="brand" icon={Sparkles} onClick={() => onNavigate("customer")}>
            Tạo website mới
          </Button>
        </>
      }
    >
      <div className="space-y-7">
        <Hero onNavigate={onNavigate} />

        {/* KPI grid */}
        <div>
          <SectionTitle
            eyebrow="Chỉ số realtime"
            title="Sức khoẻ nền tảng"
            desc="Số liệu mô phỏng cập nhật theo thời gian thực trong môi trường sandbox."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {KPIS.map((k) => (
              <MetricCard key={k.label} {...k} />
            ))}
          </div>
        </div>

        {/* Module grid */}
        <div>
          <SectionTitle
            eyebrow="Hệ sinh thái module"
            title="12 module sản phẩm"
            desc="Mỗi module có trạng thái triển khai riêng — bấm để mở khu vực tương ứng."
            right={
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge tone="green">MVP Ready</Badge>
                <Badge tone="amber">In Progress</Badge>
                <Badge tone="violet">Production</Badge>
                <Badge tone="slate">Admin</Badge>
                <Badge tone="coral">Risk</Badge>
              </div>
            }
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {MODULES.map((m) => (
              <ModuleCard
                key={m.title}
                {...m}
                onClick={() => onNavigate(m.target)}
              />
            ))}
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}
