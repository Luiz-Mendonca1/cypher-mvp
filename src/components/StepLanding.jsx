"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  Fingerprint,
  LockKeyhole,
  Shield,
  Sparkles,
} from "lucide-react";
import Navbar from "./Navbar";
import { flowSteps } from "../data/mockData";

const toneStyles = {
  cyan: "border-cyan-300/15 bg-cyan-300/[0.08] text-cyan-300",
  amber: "border-amber-300/15 bg-amber-300/[0.08] text-amber-300",
  violet: "border-violet-300/15 bg-violet-300/[0.08] text-violet-300",
  emerald: "border-emerald-300/15 bg-emerald-300/[0.08] text-emerald-300",
};

export default function StepLanding({ onStart }) {
  return (
    <main id="inicio" className="relative min-h-screen overflow-hidden bg-[#050a13]">
      <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute -top-72 left-1/2 size-[680px] -translate-x-1/2 rounded-full bg-cyan-500/[0.09] blur-[130px]" />
      <Navbar />

      <section className="relative mx-auto max-w-7xl px-5 pb-24 pt-16 sm:px-8 sm:pt-24 lg:px-12 lg:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-3 py-1.5 text-[11px] font-semibold tracking-wide text-cyan-200 sm:px-4 sm:text-xs">
            <Sparkles size={13} />
            Demonstração Ilustrativa
          </div>

          <h1 className="animate-fade-up animate-delay-1 mt-7 text-4xl leading-[1.1] font-semibold tracking-[-0.055em] text-white sm:text-6xl lg:text-[76px]">
            Conheça o Ecossistema
            <span className="mt-2 block bg-gradient-to-r from-cyan-200 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              CYPHER
            </span>
          </h1>
          <p className="animate-fade-up animate-delay-2 mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
            Detecte ameaças. Contenha ataques. Proteja cada endpoint.
            <span className="block text-slate-300">
              Da detecção à resposta automatizada em menos de 1 segundo.
            </span>
          </p>

          <div className="animate-fade-up animate-delay-3 mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={onStart}
              className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-cyan-300 px-7 text-sm font-bold text-slate-950 shadow-[0_8px_35px_rgba(34,211,238,0.18)] transition hover:-translate-y-0.5 hover:bg-cyan-200 hover:shadow-[0_12px_40px_rgba(34,211,238,0.27)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 sm:w-auto"
            >
              Iniciar a Demonstração
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </button>
            <span className="flex items-center gap-2 text-xs text-slate-500">
              <Shield size={14} className="text-emerald-400" />
              Ambiente seguro, sem backend conectado
            </span>
          </div>
        </div>

        <div className="animate-fade-up animate-delay-4 mx-auto mt-20 max-w-5xl sm:mt-28">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.18em] text-cyan-300/80 uppercase">
                Resposta coordenada
              </p>
              <h2 className="mt-1.5 text-lg font-semibold tracking-tight text-white sm:text-xl">
                Do primeiro sinal à contenção
              </h2>
            </div>
            <div className="hidden items-center gap-2 text-[11px] text-slate-500 sm:flex">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
              Fluxo automatizado
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {flowSteps.map(({ number, title, actor, description, Icon, tone }, index) => (
              <article
                key={number}
                className={`group relative rounded-2xl border border-white/[0.07] bg-slate-900/55 p-5 transition duration-300 hover:-translate-y-1 hover:border-white/[0.14] hover:bg-slate-900/90 ${
                  index === 0 ? "animate-delay-1" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className={`flex size-11 items-center justify-center rounded-xl border ${toneStyles[tone]}`}>
                    <Icon size={20} strokeWidth={1.7} />
                  </span>
                  <span className="font-mono text-xs text-slate-600">{number}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-1 text-[10px] font-semibold tracking-wide text-slate-500 uppercase">
                  {actor}
                </p>
                <p className="mt-4 text-[13px] leading-[1.7] text-slate-400">{description}</p>
                {index < flowSteps.length - 1 && (
                  <ArrowRight
                    size={14}
                    className="absolute -right-[10px] top-8 z-10 hidden text-slate-600 xl:block"
                  />
                )}
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-5 rounded-3xl border border-white/[0.08] bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 sm:mt-20 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-10 sm:p-9 lg:p-11">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] text-cyan-300/80 uppercase">
              Segurança que cabe no seu negócio
            </p>
            <h2 className="mt-3 max-w-xl text-2xl leading-tight font-semibold tracking-tight text-white sm:text-3xl">
              Menos tempo de exposição. Mais confiança para operar.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
              PMEs nem sempre contam com um SOC para responder a ameaças em tempo real.
              O CYPHER reduz essa janela com uma abordagem de Confiança Zero e isolamento
              no próprio host — sem exigir redes complexas ou reconfiguração de VLANs.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
              {[
                { Icon: Clock3, text: "Resposta em menos de 1 segundo" },
                { Icon: Fingerprint, text: "Princípio de Confiança Zero" },
                { Icon: LockKeyhole, text: "Isolamento no nível do host" },
              ].map(({ Icon, text }) => (
                <span key={text} className="flex items-center gap-2 text-xs text-slate-300">
                  <Icon size={14} className="text-cyan-300" />
                  {text}
                </span>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={onStart}
            className="group flex min-h-14 w-full items-center justify-center gap-3 rounded-xl border border-cyan-300/25 bg-cyan-300/[0.08] px-5 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/50 hover:bg-cyan-300/[0.14] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 sm:w-auto sm:whitespace-nowrap"
          >
            Experimentar simulação
            <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="mx-auto mt-10 flex max-w-5xl flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-[11px] text-slate-600">
            CYPHER · Cibersegurança acessível, automatizada e inteligente
          </p>
          <p className="flex items-center gap-1.5 text-[10px] text-slate-600">
            <Check size={12} className="text-emerald-500" />
            Simulação demonstrativa — sem ações em sistemas reais
          </p>
        </div>
      </section>
    </main>
  );
}