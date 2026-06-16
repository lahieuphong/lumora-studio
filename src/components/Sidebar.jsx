import React from "react";
import { Logo, cx, Badge } from "./primitives.jsx";
import { NAV } from "../data/mock.js";
import { Sparkles, ChevronRight } from "lucide-react";

export default function Sidebar({ active, onNavigate, onClose }) {
  const groups = [...new Set(NAV.map((n) => n.group))];

  return (
    <aside className="flex h-full w-[256px] flex-col border-r border-line bg-white/80 backdrop-blur-xl">
      {/* Brand */}
      <div className="flex h-16 items-center px-5">
        <Logo />
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-2">
        {groups.map((group) => (
          <div key={group}>
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              {group}
            </div>
            <div className="space-y-0.5">
              {NAV.filter((n) => n.group === group).map((item) => {
                const isActive = item.id === active;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      onClose?.();
                    }}
                    className={cx(
                      "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-slate-900 text-white shadow-soft"
                        : "text-subtle hover:bg-slate-100 hover:text-ink"
                    )}
                  >
                    {isActive && (
                      <span className="absolute -left-3 top-1/2 h-6 -translate-y-1/2 rounded-full bg-aurora-strong" style={{ width: 3 }} />
                    )}
                    <Icon
                      className={cx(
                        "h-[18px] w-[18px] shrink-0",
                        isActive ? "text-white" : "text-slate-400 group-hover:text-ink"
                      )}
                    />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Upgrade card */}
      <div className="p-3">
        <div className="relative overflow-hidden rounded-xl2 border border-line bg-gradient-to-br from-slate-900 to-slate-800 p-4 text-white shadow-card">
          <div className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full bg-aurora-strong opacity-50 blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="grid h-7 w-7 place-items-center rounded-lg bg-white/10">
                <Sparkles className="h-4 w-4 text-brand-cyan" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/70">
                Gói Creator
              </span>
            </div>
            <p className="mt-3 text-[13px] font-semibold leading-snug">
              Mở khoá AI credit cao và team workspace
            </p>
            <button
              onClick={() => {
                onNavigate("billing");
                onClose?.();
              }}
              className="mt-3 inline-flex items-center gap-1 text-[12px] font-bold text-brand-cyan transition-colors hover:text-white"
            >
              Nâng cấp Studio
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
