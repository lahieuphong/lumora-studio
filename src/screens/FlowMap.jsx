import React, { useState } from "react";
import ScreenFrame from "../components/ScreenFrame.jsx";
import { Card, Badge, Segmented } from "../components/primitives.jsx";
import { FLOW_LEGEND, CUSTOMER_FLOWS, BACKOFFICE_FLOWS } from "../data/flows.js";
import { Users, ShieldCheck, ChevronRight, Info } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Step kind → visual treatment (static classes, JIT-safe)            */
/* ------------------------------------------------------------------ */
const KIND = {
  main: { chip: "bg-white border-slate-200", bar: "bg-slate-300", text: "text-ink", dot: "bg-slate-400" },
  decision: { chip: "bg-amber-50 border-amber-200", bar: "bg-amber-400", text: "text-amber-900", dot: "bg-amber-500" },
  system: { chip: "bg-sky-50 border-sky-200", bar: "bg-sky-400", text: "text-sky-900", dot: "bg-sky-500" },
  admin: { chip: "bg-violet-50 border-violet-200", bar: "bg-violet-400", text: "text-violet-900", dot: "bg-violet-500" },
  success: { chip: "bg-emerald-50 border-emerald-200", bar: "bg-emerald-400", text: "text-emerald-900", dot: "bg-emerald-500" },
  error: { chip: "bg-rose-50 border-rose-200", bar: "bg-rose-400", text: "text-rose-900", dot: "bg-rose-500" },
};

const LEGEND_DOT = {
  main: "bg-slate-400",
  decision: "bg-amber-500",
  system: "bg-sky-500",
  admin: "bg-violet-500",
  success: "bg-emerald-500",
  error: "bg-rose-500",
};

const TONE_BAR = {
  teal: "bg-teal-400",
  violet: "bg-violet-400",
  cyan: "bg-sky-400",
  green: "bg-emerald-400",
  amber: "bg-amber-400",
  coral: "bg-rose-400",
  slate: "bg-slate-400",
};

/* ------------------------------------------------------------------ */
/*  Flow row                                                           */
/* ------------------------------------------------------------------ */
function FlowRow({ flow }) {
  return (
    <Card pad={false} className="overflow-hidden">
      <div className="flex">
        {/* accent rail */}
        <div className={`w-1.5 shrink-0 ${TONE_BAR[flow.tone] || "bg-slate-300"}`} />
        <div className="min-w-0 flex-1 p-5">
          {/* header */}
          <div className="mb-4 flex flex-wrap items-center gap-2.5">
            <span className="rounded-lg bg-ink px-2 py-1 font-mono text-[11px] font-bold text-white">
              {flow.id}
            </span>
            <h3 className="text-[15px] font-bold tracking-tight text-ink">{flow.title}</h3>
            <Badge tone="slate">{flow.actor}</Badge>
          </div>

          {/* steps */}
          <div className="-mx-1 overflow-x-auto px-1 pb-1.5">
            <div className="flex items-stretch gap-1.5">
              {flow.steps.map((s, i) => {
                const k = KIND[s.k] || KIND.main;
                return (
                  <React.Fragment key={i}>
                    <div
                      className={`relative flex w-[132px] shrink-0 flex-col overflow-hidden rounded-xl border ${k.chip} px-3 py-2.5`}
                    >
                      <span className={`absolute inset-x-0 top-0 h-1 ${k.bar}`} />
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className={`h-1.5 w-1.5 rounded-full ${k.dot}`} />
                        <span className="text-[10px] font-bold text-slate-400">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <span className={`mt-1 text-[12px] font-semibold leading-snug ${k.text}`}>
                        {s.t}
                      </span>
                    </div>
                    {i < flow.steps.length - 1 && (
                      <div className="flex shrink-0 items-center">
                        <ChevronRight className="h-4 w-4 text-slate-300" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* rule */}
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-line bg-slate-50/70 px-3 py-2">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-teal" />
            <span className="text-[12.5px] leading-snug text-slate-600">{flow.rule}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Screen                                                             */
/* ------------------------------------------------------------------ */
export default function FlowMap() {
  const [scope, setScope] = useState("customer");
  const flows = scope === "customer" ? CUSTOMER_FLOWS : BACKOFFICE_FLOWS;

  return (
    <ScreenFrame
      title="Flow Map"
      subtitle="Bản đồ luồng sản phẩm dạng stepper: từ hành trình người dùng đến quy trình vận hành ở Backoffice."
      badge="Blueprint"
      badgeTone="violet"
      actions={
        <Segmented
          options={[
            { value: "customer", label: "Customer", icon: Users },
            { value: "backoffice", label: "Backoffice", icon: ShieldCheck },
          ]}
          value={scope}
          onChange={setScope}
        />
      }
    >
      {/* legend */}
      <Card className="mb-5">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-subtle">
            Chú thích
          </span>
          {FLOW_LEGEND.map((l) => (
            <span key={l.kind} className="inline-flex items-center gap-2 text-[12.5px] font-medium text-slate-600">
              <span className={`h-2.5 w-2.5 rounded-full ${LEGEND_DOT[l.kind]}`} />
              {l.label}
            </span>
          ))}
        </div>
      </Card>

      {/* flows */}
      <div className="space-y-4">
        {flows.map((f) => (
          <FlowRow key={f.id} flow={f} />
        ))}
      </div>
    </ScreenFrame>
  );
}
