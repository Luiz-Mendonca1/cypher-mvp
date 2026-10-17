export default function AlertNotification({ alert, isSelected, onClick }) {
  const Icon = alert.Icon;
  const isCritical = alert.severity === "critical";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      className={`w-full border-b border-white/[0.06] p-4 text-left transition sm:p-5 ${
        isSelected
          ? isCritical
            ? "bg-red-400/[0.08]"
            : "bg-cyan-300/[0.06]"
          : "hover:bg-white/[0.025]"
      } ${isCritical ? "border-l-2 border-l-red-400" : "border-l-2 border-l-transparent"}`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg ${
            isCritical
              ? "bg-red-400/10 text-red-300"
              : "bg-slate-800 text-slate-400"
          }`}
        >
          <Icon size={17} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-start justify-between gap-2">
            <span className="truncate text-[11px] font-semibold text-slate-300">
              {alert.sender}
            </span>
            <span className="shrink-0 text-[10px] text-slate-500">{alert.time}</span>
          </span>
          <span
            className={`mt-1 block text-[13px] leading-5 font-semibold ${
              isCritical ? "text-red-200" : "text-slate-200"
            }`}
          >
            {alert.subject}
          </span>
          <span className="mt-1 block truncate text-xs text-slate-500">{alert.preview}</span>
        </span>
      </div>
    </button>
  );
}