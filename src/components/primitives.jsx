import React from "react";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
export function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ */
/*  Logo                                                               */
/* ------------------------------------------------------------------ */
export function Logo({ compact = false }) {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className="relative grid h-9 w-9 place-items-center rounded-xl2 bg-aurora-strong shadow-glow">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path
            d="M8 6v12h9"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="16.5" cy="7" r="2" fill="white" />
        </svg>
      </div>
      {!compact && (
        <div className="leading-none">
          <div className="text-[15px] font-extrabold tracking-tight text-ink">
            Lumora
            <span className="bg-aurora-strong bg-clip-text text-transparent">
              {" "}
              Studio
            </span>
          </div>
          <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-subtle">
            Creator Cloud
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Button                                                             */
/* ------------------------------------------------------------------ */
const BTN_VARIANTS = {
  primary:
    "bg-ink text-white hover:bg-slate-800 shadow-soft border border-transparent",
  brand:
    "text-white bg-aurora-strong hover:opacity-95 shadow-pop border border-transparent",
  secondary:
    "bg-white text-ink border border-line hover:border-slate-300 hover:bg-slate-50 shadow-soft",
  ghost:
    "bg-transparent text-subtle hover:text-ink hover:bg-slate-100 border border-transparent",
  danger:
    "bg-white text-brand-coral border border-rose-200 hover:bg-rose-50 shadow-soft",
  dangerSolid:
    "bg-brand-coral text-white hover:brightness-95 shadow-soft border border-transparent",
};

const BTN_SIZES = {
  sm: "h-8 px-3 text-[12.5px] gap-1.5 rounded-lg",
  md: "h-10 px-4 text-sm gap-2 rounded-xl",
  lg: "h-11 px-5 text-[15px] gap-2 rounded-xl2",
};

export function Button({
  children,
  variant = "secondary",
  size = "md",
  icon: Icon,
  iconRight: IconRight,
  className = "",
  full = false,
  ...props
}) {
  return (
    <button
      className={cx(
        "inline-flex select-none items-center justify-center font-semibold transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/50 disabled:cursor-not-allowed disabled:opacity-50",
        BTN_VARIANTS[variant],
        BTN_SIZES[size],
        full && "w-full",
        className
      )}
      {...props}
    >
      {Icon && <Icon className={size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]"} />}
      {children}
      {IconRight && (
        <IconRight className={size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]"} />
      )}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Card                                                               */
/* ------------------------------------------------------------------ */
export function Card({
  children,
  className = "",
  hover = false,
  pad = true,
  as: Tag = "div",
  ...props
}) {
  return (
    <Tag
      className={cx(
        "rounded-xl3 border border-line bg-white shadow-soft",
        pad && "p-5",
        hover &&
          "cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card hover:border-slate-300",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Section title                                                      */
/* ------------------------------------------------------------------ */
export function SectionTitle({ eyebrow, title, desc, right }) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        {eyebrow && (
          <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-teal">
            {eyebrow}
          </div>
        )}
        <h2 className="text-lg font-bold tracking-tight text-ink">{title}</h2>
        {desc && <p className="mt-1 text-sm text-subtle">{desc}</p>}
      </div>
      {right}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Badge / Pills                                                      */
/* ------------------------------------------------------------------ */
const BADGE_TONES = {
  teal: "bg-teal-50 text-teal-700 ring-teal-600/15",
  cyan: "bg-sky-50 text-sky-700 ring-sky-600/15",
  violet: "bg-violet-50 text-violet-700 ring-violet-600/15",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  amber: "bg-amber-50 text-amber-700 ring-amber-600/15",
  coral: "bg-rose-50 text-rose-600 ring-rose-500/15",
  slate: "bg-slate-100 text-slate-600 ring-slate-500/15",
  ink: "bg-slate-900 text-white ring-transparent",
};

export function Badge({ children, tone = "slate", icon: Icon, className = "" }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset",
        BADGE_TONES[tone] || BADGE_TONES.slate,
        className
      )}
    >
      {Icon && <Icon className="h-3 w-3" />}
      {children}
    </span>
  );
}

/* Status pill with a leading dot — for site/room/payment states */
const STATUS_MAP = {
  Active: { tone: "green", dot: "bg-emerald-500" },
  Published: { tone: "green", dot: "bg-emerald-500" },
  Live: { tone: "coral", dot: "bg-rose-500", pulse: true },
  Draft: { tone: "slate", dot: "bg-slate-400" },
  Processing: { tone: "cyan", dot: "bg-sky-500", pulse: true },
  Pending: { tone: "amber", dot: "bg-amber-500" },
  Warning: { tone: "amber", dot: "bg-amber-500" },
  Failed: { tone: "coral", dot: "bg-rose-500" },
  Suspended: { tone: "coral", dot: "bg-rose-500" },
  Verified: { tone: "green", dot: "bg-emerald-500" },
  Paid: { tone: "green", dot: "bg-emerald-500" },
  Overdue: { tone: "coral", dot: "bg-rose-500" },
};

export function StatusPill({ status, label }) {
  const cfg = STATUS_MAP[status] || STATUS_MAP.Draft;
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset",
        BADGE_TONES[cfg.tone]
      )}
    >
      <span
        className={cx(
          "h-1.5 w-1.5 rounded-full",
          cfg.dot,
          cfg.pulse && "animate-pulse-dot"
        )}
      />
      {label || status}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Icon tile (gradient square behind an icon)                         */
/* ------------------------------------------------------------------ */
const TILE_TONES = {
  teal: "from-teal-400 to-teal-600",
  cyan: "from-sky-400 to-sky-600",
  violet: "from-violet-400 to-violet-600",
  green: "from-emerald-400 to-emerald-600",
  amber: "from-amber-400 to-amber-500",
  coral: "from-rose-400 to-rose-500",
  slate: "from-slate-400 to-slate-600",
  ink: "from-slate-700 to-slate-900",
  aurora: "from-teal-400 via-sky-400 to-violet-500",
};

export function IconTile({ icon: Icon, tone = "aurora", size = "md", className = "" }) {
  const dim =
    size === "sm" ? "h-8 w-8 rounded-lg" : size === "lg" ? "h-12 w-12 rounded-xl2" : "h-10 w-10 rounded-xl";
  const ic = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5";
  return (
    <div
      className={cx(
        "grid place-items-center bg-gradient-to-br text-white shadow-soft",
        dim,
        TILE_TONES[tone] || TILE_TONES.aurora,
        className
      )}
    >
      <Icon className={ic} strokeWidth={2.2} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Avatar (initials, gradient)                                        */
/* ------------------------------------------------------------------ */
const AVA_GRADIENTS = [
  "from-teal-400 to-sky-500",
  "from-violet-400 to-fuchsia-500",
  "from-amber-400 to-orange-500",
  "from-sky-400 to-indigo-500",
  "from-rose-400 to-pink-500",
  "from-emerald-400 to-teal-500",
];

export function Avatar({ name = "?", size = "md", ring = false }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(-2)
    .join("")
    .toUpperCase();
  const idx =
    name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % AVA_GRADIENTS.length;
  const dim =
    size === "sm"
      ? "h-7 w-7 text-[10px]"
      : size === "lg"
      ? "h-11 w-11 text-sm"
      : "h-9 w-9 text-xs";
  return (
    <div
      className={cx(
        "grid shrink-0 place-items-center rounded-full bg-gradient-to-br font-bold text-white",
        AVA_GRADIENTS[idx],
        dim,
        ring && "ring-2 ring-white"
      )}
    >
      {initials}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Progress bar / meter                                               */
/* ------------------------------------------------------------------ */
const METER_TONES = {
  teal: "bg-teal-500",
  cyan: "bg-sky-500",
  violet: "bg-violet-500",
  green: "bg-emerald-500",
  amber: "bg-amber-500",
  coral: "bg-rose-500",
  aurora: "bg-aurora-strong",
};

export function Meter({ value, tone = "aurora", className = "" }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={cx("h-2 w-full overflow-hidden rounded-full bg-slate-100", className)}>
      <div
        className={cx("h-full rounded-full transition-all duration-500", METER_TONES[tone])}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Metric / KPI card                                                  */
/* ------------------------------------------------------------------ */
export function MetricCard({
  label,
  value,
  delta,
  deltaTone = "green",
  icon: Icon,
  tone = "aurora",
  hint,
}) {
  return (
    <Card className="relative overflow-hidden" hover>
      <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-aurora opacity-70 blur-2xl" />
      <div className="relative flex items-start justify-between">
        {Icon && <IconTile icon={Icon} tone={tone} />}
        {delta && (
          <Badge tone={deltaTone}>{delta}</Badge>
        )}
      </div>
      <div className="relative mt-4">
        <div className="text-[26px] font-extrabold leading-none tracking-tight text-ink">
          {value}
        </div>
        <div className="mt-1.5 text-[13px] font-medium text-subtle">{label}</div>
        {hint && <div className="mt-2 text-[11px] text-slate-400">{hint}</div>}
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Module card (overview grid)                                        */
/* ------------------------------------------------------------------ */
export function ModuleCard({ icon, title, desc, tone, badge, badgeTone, onClick }) {
  return (
    <Card hover onClick={onClick} className="group">
      <div className="flex items-start justify-between gap-3">
        <IconTile icon={icon} tone={tone} size="lg" />
        {badge && <Badge tone={badgeTone}>{badge}</Badge>}
      </div>
      <h3 className="mt-4 text-[15px] font-bold tracking-tight text-ink">
        {title}
      </h3>
      <p className="mt-1 text-[13px] leading-relaxed text-subtle">{desc}</p>
      <div className="mt-3 flex items-center gap-1 text-[12px] font-semibold text-brand-teal opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Mở module
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
          <path
            d="M5 12h14m-6-6 6 6-6 6"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Toggle switch                                                      */
/* ------------------------------------------------------------------ */
export function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-2.5"
    >
      <span
        className={cx(
          "relative h-6 w-11 rounded-full transition-colors duration-200",
          checked ? "bg-aurora-strong" : "bg-slate-200"
        )}
      >
        <span
          className={cx(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200",
            checked ? "left-[22px]" : "left-0.5"
          )}
        />
      </span>
      {label && <span className="text-sm font-medium text-ink">{label}</span>}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Segmented control / tabs                                           */
/* ------------------------------------------------------------------ */
export function Segmented({ options, value, onChange, size = "md" }) {
  return (
    <div
      className={cx(
        "inline-flex items-center gap-1 rounded-xl border border-line bg-slate-50 p-1",
        size === "sm" ? "text-[12px]" : "text-[13px]"
      )}
    >
      {options.map((opt) => {
        const v = typeof opt === "string" ? opt : opt.value;
        const label = typeof opt === "string" ? opt : opt.label;
        const Icon = typeof opt === "object" ? opt.icon : null;
        const active = v === value;
        return (
          <button
            key={v}
            onClick={() => onChange(v)}
            className={cx(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold transition-all duration-200",
              active
                ? "bg-white text-ink shadow-soft"
                : "text-subtle hover:text-ink"
            )}
          >
            {Icon && <Icon className="h-4 w-4" />}
            {label}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Empty state                                                        */
/* ------------------------------------------------------------------ */
export function EmptyState({ icon: Icon, title, desc, action }) {
  return (
    <div className="grid place-items-center rounded-xl3 border border-dashed border-line bg-slate-50/60 px-6 py-12 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-xl2 bg-white text-subtle shadow-soft">
        <Icon className="h-6 w-6" />
      </div>
      <h4 className="mt-4 text-sm font-bold text-ink">{title}</h4>
      <p className="mt-1 max-w-xs text-[13px] text-subtle">{desc}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
