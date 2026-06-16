import React from "react";
import { Badge } from "./primitives.jsx";

export default function ScreenFrame({
  title,
  subtitle,
  badge,
  badgeTone = "teal",
  actions,
  children,
}) {
  return (
    <div className="mx-auto w-full max-w-[1320px] animate-fade-up px-4 py-6 md:px-8 md:py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-[26px] font-extrabold tracking-tight text-ink md:text-[30px]">
              {title}
            </h1>
            {badge && <Badge tone={badgeTone}>{badge}</Badge>}
          </div>
          {subtitle && (
            <p className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-subtle">
              {subtitle}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
        )}
      </div>
      {children}
    </div>
  );
}
