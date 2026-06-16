import React, { useState } from "react";
import { Avatar, Badge, cx } from "./primitives.jsx";
import {
  Search,
  Bell,
  Menu,
  ChevronDown,
  Check,
  Command,
} from "lucide-react";

const WORKSPACES = [
  { name: "Studio của Minh Anh", plan: "Creator", active: true },
  { name: "Lumora Education", plan: "Studio" },
  { name: "Sự kiện 2026", plan: "Starter" },
];

export default function Topbar({ onOpenSidebar }) {
  const [wsOpen, setWsOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [ws, setWs] = useState(WORKSPACES[0]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-canvas/80 px-4 backdrop-blur-xl md:px-6">
      {/* mobile menu */}
      <button
        onClick={onOpenSidebar}
        className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-white text-subtle transition-colors hover:text-ink lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Workspace switcher */}
      <div className="relative">
        <button
          onClick={() => {
            setWsOpen((v) => !v);
            setNotifOpen(false);
          }}
          className="flex items-center gap-2 rounded-xl border border-line bg-white px-2.5 py-1.5 text-sm shadow-soft transition-colors hover:border-slate-300"
        >
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-aurora-strong text-[11px] font-bold text-white">
            MA
          </span>
          <span className="hidden font-semibold text-ink sm:inline">
            {ws.name}
          </span>
          <Badge tone="violet" className="hidden sm:inline-flex">
            {ws.plan}
          </Badge>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </button>

        {wsOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setWsOpen(false)} />
            <div className="absolute left-0 top-12 z-20 w-72 animate-fade-up rounded-xl2 border border-line bg-white p-1.5 shadow-card">
              <div className="px-2.5 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Chuyển workspace
              </div>
              {WORKSPACES.map((w) => (
                <button
                  key={w.name}
                  onClick={() => {
                    setWs(w);
                    setWsOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-left transition-colors hover:bg-slate-50"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-teal-400 to-violet-500 text-[11px] font-bold text-white">
                      {w.name
                        .split(" ")
                        .map((x) => x[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                    <span>
                      <span className="block text-[13px] font-semibold text-ink">
                        {w.name}
                      </span>
                      <span className="block text-[11px] text-subtle">
                        Gói {w.plan}
                      </span>
                    </span>
                  </span>
                  {w.name === ws.name && (
                    <Check className="h-4 w-4 text-brand-teal" />
                  )}
                </button>
              ))}
              <button className="mt-1 w-full rounded-xl px-2.5 py-2 text-left text-[13px] font-semibold text-brand-teal hover:bg-slate-50">
                + Tạo workspace mới
              </button>
            </div>
          </>
        )}
      </div>

      {/* Search */}
      <div className="relative ml-1 hidden flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          placeholder="Tìm website, phòng live, template, hoá đơn…"
          className="h-10 w-full max-w-md rounded-xl border border-line bg-white pl-9 pr-16 text-sm text-ink shadow-soft outline-none transition-colors placeholder:text-slate-400 focus:border-brand-cyan/60 focus:ring-2 focus:ring-brand-cyan/20"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-line bg-slate-50 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 lg:flex">
          <Command className="h-3 w-3" /> K
        </span>
      </div>

      <div className="ml-auto flex items-center gap-2 md:ml-0">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen((v) => !v);
              setWsOpen(false);
            }}
            className="relative grid h-10 w-10 place-items-center rounded-xl border border-line bg-white text-subtle shadow-soft transition-colors hover:text-ink"
          >
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-brand-coral ring-2 ring-white" />
          </button>
          {notifOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setNotifOpen(false)} />
              <div className="absolute right-0 top-12 z-20 w-80 animate-fade-up rounded-xl2 border border-line bg-white p-1.5 shadow-card">
                <div className="flex items-center justify-between px-2.5 py-2">
                  <span className="text-[13px] font-bold text-ink">Thông báo</span>
                  <span className="text-[11px] font-semibold text-brand-teal">
                    Đánh dấu đã đọc
                  </span>
                </div>
                {[
                  { t: "Thanh toán INV-2026-0264 thất bại", d: "Cần thử lại thẻ", tone: "bg-rose-500" },
                  { t: "Domain minhanh.studio đã active", d: "SSL đã cấp thành công", tone: "bg-emerald-500" },
                  { t: "AI đã tạo xong section Pricing", d: "Xem trước trong Builder", tone: "bg-violet-500" },
                ].map((n, i) => (
                  <div
                    key={i}
                    className="flex gap-2.5 rounded-xl px-2.5 py-2.5 transition-colors hover:bg-slate-50"
                  >
                    <span className={cx("mt-1.5 h-2 w-2 shrink-0 rounded-full", n.tone)} />
                    <span>
                      <span className="block text-[13px] font-semibold text-ink">
                        {n.t}
                      </span>
                      <span className="block text-[12px] text-subtle">{n.d}</span>
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Avatar */}
        <button className="flex items-center gap-2 rounded-xl border border-line bg-white py-1 pl-1 pr-2.5 shadow-soft transition-colors hover:border-slate-300">
          <Avatar name="Minh Anh" size="sm" />
          <span className="hidden text-left leading-none lg:block">
            <span className="block text-[12.5px] font-bold text-ink">Minh Anh</span>
            <span className="block text-[10.5px] text-subtle">Owner</span>
          </span>
        </button>
      </div>
    </header>
  );
}
