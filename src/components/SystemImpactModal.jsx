"use client";

import { useEffect } from "react";
import {
  Check,
  CheckCircle2,
  LockKeyhole,
  ShieldAlert,
  X,
} from "lucide-react";

const containmentMetrics = [
  "Detecção: <10ms",
  "Notificação enviada",
  "Regra de Firewall ativada: Host em Quarentena",
];

export default function SystemImpactModal({ onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-md"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="presentation"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="containment-title"
        className="animate-fade-up relative my-auto w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#0c1421] shadow-[0_30px_100px_rgba(0,0,0,0.65)]"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar simulação de contenção"
          className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/[0.06] hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="p-6 sm:p-9">
          <div className="relative mx-auto flex size-[76px] items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.08] text-emerald-300">
            <LockKeyhole size={34} strokeWidth={1.6} />
            <span className="absolute -right-2 -bottom-2 flex size-7 items-center justify-center rounded-full border-4 border-[#0c1421] bg-emerald-400 text-slate-950">
              <Check size={14} strokeWidth={3} />
            </span>
          </div>

          <div className="mt-6 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-300/[0.07] px-3 py-1 text-[10px] font-semibold tracking-[0.13em] text-emerald-300 uppercase">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
              Contenção concluída
            </span>
            <h2
              id="containment-title"
              className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
            >
              Ameaça isolada.
              <span className="block text-emerald-300">Operação protegida.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-slate-400">
              O <strong className="font-semibold text-slate-200">CYPHERAgent</strong>{" "}
              detectou uma violação no honeyfile. Em resposta, o{" "}
              <strong className="font-semibold text-slate-200">CYPHERGuardian</strong>{" "}
              aplicou regras de firewall local instantaneamente, isolando o host e
              preservando a comunicação com o painel administrativo.
            </p>
          </div>

          <div className="mt-7 rounded-2xl border border-white/[0.07] bg-slate-950/60 p-4 sm:p-5">
            <div className="mb-4 flex items-center gap-2 text-[10px] font-semibold tracking-[0.14em] text-slate-500 uppercase">
              <ShieldAlert size={14} className="text-emerald-400" />
              Linha do tempo da resposta
            </div>
            <div className="space-y-3">
              {containmentMetrics.map((metric) => (
                <div key={metric} className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
                  {metric}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Host FIN-WS-04 · Apenas simulação visual
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-300 px-5 text-sm font-bold text-slate-950 transition hover:bg-emerald-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-200"
          >
            <Check size={16} strokeWidth={2.5} />
            Entendi, continuar
          </button>
        </div>
      </section>
    </div>
  );
}