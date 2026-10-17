"use client";

import { useState } from "react";
import {
  Activity,
  ChevronRight,
  CircleHelp,
  FileClock,
  Files,
  Inbox,
  Search,
  Shield,
  ShieldCheck,
} from "lucide-react";
import { alerts } from "../data/mockData";
import AlertNotification from "./AlertNotification";
import Navbar from "./Navbar";
import SystemImpactModal from "./SystemImpactModal";

export default function StepEmailClient({ onExit }) {
  const [selectedAlert, setSelectedAlert] = useState(alerts[0]);
  const [isContainmentOpen, setIsContainmentOpen] = useState(false);

  function handleSelectAlert(alert) {
    setSelectedAlert(alert);
    if (alert.severity === "critical") setIsContainmentOpen(true);
  }

  const DetailIcon = selectedAlert.Icon;

  return (
    <main className="min-h-screen bg-[#070c14] text-slate-200">
      <Navbar isSimulation onExit={onExit} />

      <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.17em] text-slate-500 uppercase">
              <span>Workspace</span>
              <ChevronRight size={12} />
              <span className="text-cyan-300">Central de Alertas</span>
            </div>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-[28px]">
              Visão geral de segurança
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Acompanhe eventos e a resposta coordenada do ecossistema CYPHER.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-emerald-300/10 bg-emerald-300/[0.04] px-3 py-2 text-[11px] text-emerald-300">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-40" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Todos os sistemas operacionais
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[210px_minmax(320px,1fr)_minmax(300px,0.88fr)] xl:grid-cols-[230px_minmax(380px,1.1fr)_minmax(340px,0.9fr)]">
          <aside className="rounded-2xl border border-white/[0.07] bg-slate-900/55 p-3">
            <div className="px-3 pb-3 pt-2 text-[10px] font-semibold tracking-[0.15em] text-slate-500 uppercase">
              Workspace
            </div>
            <button
              type="button"
              className="flex min-h-11 w-full items-center gap-3 rounded-xl border border-cyan-300/10 bg-cyan-300/[0.08] px-3 text-left text-sm font-medium text-cyan-100"
            >
              <Inbox size={17} className="text-cyan-300" />
              Central de Alertas
              <span className="ml-auto rounded-md bg-red-400/15 px-1.5 py-0.5 text-[10px] font-semibold text-red-300">
                1
              </span>
            </button>

            <div className="mt-7 px-3 text-[10px] font-semibold tracking-[0.15em] text-slate-500 uppercase">
              Atividade
            </div>
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-slate-400">
                <FileClock size={15} className="text-slate-500" />
                Eventos registrados
                <span className="ml-auto font-mono text-slate-300">24</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-slate-400">
                <Files size={15} className="text-slate-500" />
                Arquivos monitorados
                <span className="ml-auto font-mono text-slate-300">4</span>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-white/[0.06] bg-slate-950/40 p-3.5">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <ShieldCheck size={15} className="text-emerald-400" />
                CYPHERGuardian
              </div>
              <p className="mt-2 text-[11px] leading-5 text-slate-500">
                Firewall local ativo neste endpoint.
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-[10px] text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                Protegido
              </div>
            </div>

            <div className="mt-3 hidden items-center gap-2 px-3 py-2 text-[10px] text-slate-600 lg:flex">
              <CircleHelp size={13} />
              Ambiente demonstrativo
            </div>
          </aside>

          <section className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.07] bg-slate-900/55">
            <div className="flex min-h-[65px] items-center justify-between border-b border-white/[0.06] px-4 sm:px-5">
              <div>
                <h2 className="text-sm font-semibold text-white">Caixa de entrada</h2>
                <p className="mt-0.5 text-[10px] text-slate-500">4 eventos recentes</p>
              </div>
              <button
                type="button"
                aria-label="Pesquisar alertas"
                className="flex size-8 items-center justify-center rounded-lg border border-white/[0.07] text-slate-500 transition hover:bg-white/[0.04] hover:text-slate-200"
              >
                <Search size={15} />
              </button>
            </div>
            <div>
              {alerts.map((alert) => (
                <AlertNotification
                  key={alert.id}
                  alert={alert}
                  isSelected={selectedAlert.id === alert.id}
                  onClick={() => handleSelectAlert(alert)}
                />
              ))}
            </div>
            <div className="flex items-center justify-between px-4 py-3 text-[10px] text-slate-600 sm:px-5">
              <span>Exibindo todos os eventos</span>
              <span>Atualizado agora</span>
            </div>
          </section>

          <section className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.07] bg-slate-900/55">
            <div className="flex min-h-[65px] items-center justify-between border-b border-white/[0.06] px-4 sm:px-5">
              <div>
                <h2 className="text-sm font-semibold text-white">Detalhes do evento</h2>
                <p className="mt-0.5 text-[10px] text-slate-500">Informações do alerta selecionado</p>
              </div>
              <Activity size={16} className="text-slate-500" />
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <span
                  className={`flex size-9 items-center justify-center rounded-lg ${
                    selectedAlert.severity === "critical"
                      ? "bg-red-400/10 text-red-300"
                      : "bg-cyan-300/[0.08] text-cyan-300"
                  }`}
                >
                  <DetailIcon size={18} />
                </span>
                <span
                  className={`rounded-full border px-2 py-1 text-[9px] font-semibold tracking-wide uppercase ${
                    selectedAlert.severity === "critical"
                      ? "border-red-400/15 bg-red-400/[0.06] text-red-300"
                      : "border-cyan-300/15 bg-cyan-300/[0.05] text-cyan-200"
                  }`}
                >
                  {selectedAlert.category}
                </span>
              </div>
              <h3 className="mt-5 text-lg leading-6 font-semibold text-white">
                {selectedAlert.subject}
              </h3>
              <p className="mt-3 text-[13px] leading-6 text-slate-400">{selectedAlert.body}</p>

              <div className="mt-6 space-y-4 border-t border-white/[0.06] pt-5">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.12em] text-slate-500 uppercase">
                    Origem
                  </p>
                  <p className="mt-1.5 text-xs text-slate-200">{selectedAlert.sender}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.12em] text-slate-500 uppercase">
                    Ativo relacionado
                  </p>
                  <p className="mt-1.5 break-words font-mono text-[11px] text-slate-300">
                    {selectedAlert.file}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.12em] text-slate-500 uppercase">
                    Endpoint
                  </p>
                  <p className="mt-1.5 font-mono text-[11px] text-slate-300">{selectedAlert.host}</p>
                </div>
              </div>

              {selectedAlert.severity === "critical" ? (
                <button
                  type="button"
                  onClick={() => setIsContainmentOpen(true)}
                  className="mt-6 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-red-300/20 bg-red-300/[0.07] px-4 text-xs font-semibold text-red-200 transition hover:bg-red-300/[0.12]"
                >
                  <Shield size={15} />
                  Ver contenção automática
                </button>
              ) : (
                <div className="mt-6 flex items-center gap-2 rounded-lg border border-white/[0.06] bg-slate-950/30 px-3 py-2.5 text-[11px] text-slate-500">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  Evento informativo · sem ação necessária
                </div>
              )}
            </div>
          </section>
        </div>

        <footer className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.05] pt-4 text-[10px] text-slate-600">
          <span className="flex items-center gap-2">
            <Shield size={12} />
            CYPHER Security Operations
          </span>
          <span>Dados ilustrativos para demonstração — nenhuma ação é aplicada em sistemas reais.</span>
        </footer>
      </div>

      {isContainmentOpen && (
        <SystemImpactModal onClose={() => setIsContainmentOpen(false)} />
      )}
    </main>
  );
}