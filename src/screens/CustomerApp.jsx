import React, { useState } from "react";
import ScreenFrame from "../components/ScreenFrame.jsx";
import {
  Card,
  Button,
  Badge,
  StatusPill,
  Meter,
  SectionTitle,
  Toggle,
  IconTile,
  cx,
} from "../components/primitives.jsx";
import { PROJECTS, TEMPLATES, ONBOARDING } from "../data/mock.js";
import {
  Plus,
  LayoutTemplate,
  Sparkles,
  Radio,
  Globe,
  Pencil,
  Eye,
  Rocket,
  Check,
  ArrowRight,
  Layers,
} from "lucide-react";

const QUICK_ACTIONS = [
  { label: "Tạo website mới", desc: "Bắt đầu từ trang trắng", icon: Plus, tone: "teal", target: "builder" },
  { label: "Chọn template", desc: "6 mẫu sẵn sàng", icon: LayoutTemplate, tone: "cyan", target: "builder" },
  { label: "Tạo bằng AI", desc: "Dựng trang từ prompt", icon: Sparkles, tone: "violet", target: "builder" },
  { label: "Tạo live room", desc: "Live có chat & poll", icon: Radio, tone: "coral", target: "live" },
  { label: "Kết nối domain", desc: "Trỏ tên miền riêng", icon: Globe, tone: "green", target: "billing" },
];

function ProjectCard({ project, onNavigate }) {
  const [published, setPublished] = useState(project.status === "Published");
  return (
    <Card pad={false} hover className="group overflow-hidden">
      {/* cover */}
      <div className={cx("relative h-32 bg-gradient-to-br", project.cover)}>
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute left-4 top-4">
          <StatusPill status={published ? "Published" : "Draft"} />
        </div>
        {/* faux browser chrome */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center gap-1.5 rounded-lg bg-white/85 px-2.5 py-1.5 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-rose-400" />
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="ml-1.5 truncate text-[11px] font-medium text-slate-600">
            {project.subdomain}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-[15px] font-bold tracking-tight text-ink">
              {project.name}
            </h3>
            <p className="mt-0.5 text-[12px] text-subtle">
              Cập nhật {project.updated}
            </p>
          </div>
          <Badge tone="violet">{project.plan}</Badge>
        </div>

        <div className="mt-3 space-y-2 rounded-xl bg-slate-50 p-3">
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-subtle">Custom domain</span>
            <span className="font-semibold text-ink">
              {project.customDomain.value}
            </span>
          </div>
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-subtle">Trạng thái domain</span>
            <StatusPill status={project.customDomain.status} />
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between text-[12px]">
              <span className="text-subtle">Hạn mức gói</span>
              <span className="font-semibold text-ink">{project.usage}%</span>
            </div>
            <Meter value={project.usage} tone="aurora" />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <Button size="sm" variant="secondary" icon={Pencil} onClick={() => onNavigate("builder")}>
            Sửa
          </Button>
          <Button size="sm" variant="ghost" icon={Eye}>
            Xem
          </Button>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-[11px] font-medium text-subtle">Publish</span>
            <Toggle checked={published} onChange={setPublished} />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function CustomerApp({ onNavigate }) {
  return (
    <ScreenFrame
      title="Customer App"
      subtitle="Workspace dashboard cho Owner — tạo, quản lý và publish website chỉ trong vài bước."
      badge="UF-01 · Signup → First Website"
      badgeTone="cyan"
      actions={
        <Button variant="brand" icon={Plus} onClick={() => onNavigate("builder")}>
          Tạo website mới
        </Button>
      }
    >
      <div className="space-y-7">
        {/* Greeting banner */}
        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-aurora opacity-80 blur-2xl" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl2 bg-aurora-strong text-lg font-extrabold text-white shadow-glow">
                MA
              </div>
              <div>
                <div className="text-[12px] font-semibold uppercase tracking-wider text-brand-teal">
                  Studio của Minh Anh
                </div>
                <h2 className="text-xl font-bold tracking-tight text-ink">
                  Chào mừng trở lại, Minh Anh 👋
                </h2>
                <p className="mt-0.5 text-[13px] text-subtle">
                  Bạn có 1 website đang ở bản nháp và 1 thanh toán cần xử lý.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" icon={Sparkles} onClick={() => onNavigate("builder")}>
                Tạo bằng AI
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick actions */}
        <div>
          <SectionTitle eyebrow="Thao tác nhanh" title="Bắt đầu nhanh" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {QUICK_ACTIONS.map((a) => (
              <button
                key={a.label}
                onClick={() => onNavigate(a.target)}
                className="group flex flex-col items-start gap-3 rounded-xl3 border border-line bg-white p-4 text-left shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-card"
              >
                <IconTile icon={a.icon} tone={a.tone} />
                <div>
                  <div className="text-[13.5px] font-bold text-ink">{a.label}</div>
                  <div className="mt-0.5 text-[12px] text-subtle">{a.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-7 lg:grid-cols-[1.6fr_1fr]">
          {/* Projects */}
          <div>
            <SectionTitle
              eyebrow="Website của bạn"
              title="Dự án gần đây"
              right={
                <Button size="sm" variant="ghost" iconRight={ArrowRight}>
                  Xem tất cả
                </Button>
              }
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {PROJECTS.map((p) => (
                <ProjectCard key={p.id} project={p} onNavigate={onNavigate} />
              ))}
            </div>
          </div>

          {/* Onboarding */}
          <div>
            <SectionTitle eyebrow="Hành trình" title="Tiến độ onboarding" />
            <Card>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[13px] font-semibold text-ink">
                  4 / 6 bước hoàn tất
                </span>
                <Badge tone="teal">67%</Badge>
              </div>
              <Meter value={67} tone="aurora" className="mb-5" />
              <ol className="space-y-1">
                {ONBOARDING.map((step, i) => (
                  <li
                    key={step.label}
                    className={cx(
                      "flex items-center gap-3 rounded-xl px-2.5 py-2.5 transition-colors",
                      step.current && "bg-slate-50 ring-1 ring-line"
                    )}
                  >
                    <span
                      className={cx(
                        "grid h-7 w-7 shrink-0 place-items-center rounded-full text-[12px] font-bold",
                        step.done
                          ? "bg-emerald-500 text-white"
                          : step.current
                          ? "bg-aurora-strong text-white"
                          : "bg-slate-100 text-slate-400"
                      )}
                    >
                      {step.done ? <Check className="h-4 w-4" /> : i + 1}
                    </span>
                    <span
                      className={cx(
                        "flex-1 text-[13px]",
                        step.done
                          ? "font-medium text-subtle line-through decoration-slate-300"
                          : step.current
                          ? "font-bold text-ink"
                          : "font-medium text-subtle"
                      )}
                    >
                      {step.label}
                    </span>
                    {step.current && (
                      <Button size="sm" variant="brand" onClick={() => onNavigate("builder")}>
                        Tiếp tục
                      </Button>
                    )}
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </div>

        {/* Template gallery */}
        <div>
          <SectionTitle
            eyebrow="Thư viện"
            title="Template Gallery"
            desc="Chọn mẫu phù hợp cho creator, lớp học, sự kiện live hoặc landing bán hàng."
            right={
              <Button size="sm" variant="secondary" icon={Layers} onClick={() => onNavigate("builder")}>
                Mở Builder
              </Button>
            }
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {TEMPLATES.map((t) => (
              <Card key={t.name} pad={false} hover className="group overflow-hidden">
                <div className={cx("relative h-24 bg-gradient-to-br", t.tone)}>
                  <div className="absolute inset-0 bg-dots opacity-30" />
                  <div className="absolute right-2 top-2">
                    <Badge tone={t.plan === "Free" ? "green" : t.plan === "Creator" ? "violet" : "cyan"}>
                      {t.plan}
                    </Badge>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-center pb-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <span className="rounded-lg bg-white/90 px-2.5 py-1 text-[11px] font-bold text-ink shadow">
                      Dùng mẫu này
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-[13px] font-bold text-ink">{t.name}</div>
                  <div className="mt-0.5 text-[11px] text-subtle">{t.tag}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}
