"use client";

import { ArrowLeft, ArrowUpRight, Shield } from "lucide-react";

export default function Navbar({ isSimulation = false, onExit }) {
  return (
    <header className="relative z-10 flex h-[76px] items-center justify-between border-b border-white/[0.07] px-5 sm:px-8 lg:px-12">
      <a
        href="#inicio"
        onClick={isSimulation ? (event) => event.preventDefault() : undefined}
        className="flex items-center gap-3"
        aria-label="CYPHER — início"
      >
        <span className="flex size-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.08)]">
          <Shield size={20} strokeWidth={1.8} />
        </span>
        <span className="text-[15px] font-bold tracking-[0.2em] text-white">
          CYPHER<span className="text-cyan-300">.</span>
        </span>
      </a>

      {isSimulation ? (
        <>
          <div className="absolute left-1/2 hidden -translate-x-1/2 text-center sm:block">
            <p className="text-sm font-medium text-slate-200">Simulação Interativa</p>
            <p className="mt-0.5 text-[10px] font-medium tracking-[0.15em] text-slate-500 uppercase">
              Ambiente demonstrativo
            </p>
          </div>
          <button
            type="button"
            onClick={onExit}
            className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white sm:px-4 sm:text-sm"
          >
            <ArrowLeft size={15} />
            <span className="hidden sm:inline">Sair da simulação</span>
            <span className="sm:hidden">Voltar</span>
          </button>
        </>
      ) : (
        <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-slate-400 sm:px-4 sm:text-xs">
          <span className="size-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.9)]" />
          Proteção inteligente, sem complexidade
          <ArrowUpRight size={13} className="hidden text-slate-500 sm:block" />
        </div>
      )}
    </header>
  );
}