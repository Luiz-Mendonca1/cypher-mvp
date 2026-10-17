"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileClock,
  FileWarning,
  Files,
  Fingerprint,
  Inbox,
  LockKeyhole,
  Radio,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

type Step = "landing" | "simulation";
type AlertSeverity = "critical" | "info";

type AlertItem = {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  severity: AlertSeverity;
  category: string;
  body: string;
  file: string;
  host: string;
  Icon: typeof Activity;
};

const flowSteps = [
  {
    number: "01",
    title: "Detecção da Ameaça",
    actor: "CYPHERAgent",
    description:
      "O CYPHERAgent monitora arquivos-isca (honeyfiles) estratégicos para identificar alterações não autorizadas.",
    Icon: FileWarning,
    tone: "cyan",
  },
  {
    number: "02",
    title: "Alerta de Segurança",
    actor: "CYPHERAgent → CYPHERADM",
    description:
      "Ao detectar violações, o CYPHERAgent envia um alerta emergencial ao CYPHERADM.",
    Icon: Radio,
    tone: "amber",
  },
  {
    number: "03",
    title: "Resposta Automatizada",
    actor: "CYPHERADM → CYPHERGuardian",
    description:
      "O CYPHERADM processa o incidente e aciona o CYPHERGuardian para iniciar a contenção.",
    Icon: Activity,
    tone: "violet",
  },
  {
    number: "04",
    title: "Isolamento do Dispositivo",
    actor: "CYPHERGuardian",
    description:
      "O CYPHERGuardian bloqueia o tráfego de saída no firewall do host, mantendo a conexão de gestão.",
    Icon: ShieldCheck,
    tone: "emerald",
  },
] as const;

const alertItems: AlertItem[] = [
  {
    id: "critical",
    sender: "CYPHERAgent — Monitoramento",
    subject: "ALERTA CRÍTICO: Alteração suspeita em arquivo-isca",
    preview: "Violação detectada em Financeiro/folha_pagamento.xlsx",
    time: "Agora",
    severity: "critical",
    category: "Detecção de ameaça",
    body:
      "Uma alteração não autorizada foi detectada em um arquivo-isca estratégico. O comportamento pode indicar uma tentativa de criptografia em massa associada a ransomware.",
    file: "Financeiro/folha_pagamento.xlsx",
    host: "FIN-WS-04 · 192.168.1.24",
    Icon: ShieldAlert,
  },
  {
    id: "telemetry",
    sender: "CYPHERADM",
    subject: "Relatório de Telemetria do Endpoint",
    preview: "Resumo de integridade e atividade do endpoint.",
    time: "12:40",
    severity: "info",
    category: "Telemetria",
    body:
      "O endpoint concluiu o envio de telemetria. Nenhum desvio adicional foi registrado no período analisado.",
    file: "Endpoint FIN-WS-04",
    host: "FIN-WS-04 · 192.168.1.24",
    Icon: Activity,
  },
  {
    id: "protection",
    sender: "CYPHERGuardian",
    subject: "Status de Proteção do Endpoint",
    preview: "Agente ativo e políticas locais sincronizadas.",
    time: "10:12",
    severity: "info",
    category: "Proteção",
    body:
      "O CYPHERGuardian está ativo. As regras locais de proteção estão sincronizadas com o painel administrativo.",
    file: "Política de firewall local",
    host: "FIN-WS-04 · 192.168.1.24",
    Icon: ShieldCheck,
  },
  {
    id: "fraud",
    sender: "CYPHERAgent — Validação de Documentos",
    subject: "Análise Antifraude de Boletos PDF",
    preview: "Verificação ilustrativa de autenticidade documental.",
    time: "Ontem",
    severity: "info",
    category: "Análise antifraude",
    body:
      "A análise do documento foi concluída. Os dados do boleto passaram pela validação demonstrativa de consistência.",
    file: "boleto_fornecedor_2841.pdf",
    host: "Análise documental",
    Icon: FileCheck2,
  },
];

const flowToneStyles: Record<string, string> = {
  cyan: "border-cyan-300/15 bg-cyan-300/[0.08] text-cyan-300",
  amber: "border-amber-300/15 bg-amber-300/[0.08] text-amber-300",
  violet: "border-violet-300/15 bg-violet-300/[0.08] text-violet-300",
  emerald: "border-emerald-300/15 bg-emerald-300/[0.08] text-emerald-300",
};

function Brand({ simulation = false, onExit }: { simulation?: boolean; onExit?: () => void }) {
  return (
    <header className="relative z-10 flex h-[76px] items-center justify-between border-b border-white/[0.07] px-5 sm:px-8 lg:px-12">
      <a href="#inicio" className="flex items-center gap-3" aria-label="CYPHER — início">
        <span className="flex size-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-300">
          <Shield size={20} strokeWidth={1.8} />
        </span>
        <span className="text-[15px] font-bold tracking-[0.2em] text-white">
          CYPHER<span className="text-cyan-300">.</span>
        </span>
      </a>
      {simulation ? (
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
        <span className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-slate-400 sm:px-4 sm:text-xs">
          <span className="size-1.5 rounded-full bg-cyan-300" />
          Proteção inteligente, sem complexidade
        </span>
      )}
    </header>
  );
}

function StepLanding({ onStart }: { onStart: () => void }) {
  return (
    <main id="inicio" className="relative min-h-screen overflow-hidden bg-[#050a13]">
      <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute -top-72 left-1/2 size-[680px] -translate-x-1/2 rounded-full bg-cyan-500/[0.09] blur-[130px]" />
      <Brand />

      <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:px-12 lg:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-3 py-1.5 text-[11px] font-semibold tracking-wide text-cyan-200 sm:px-4 sm:text-xs">
            <Sparkles size={13} />
            Demonstração Ilustrativa
          </span>
          <h1 className="mt-7 text-4xl leading-[1.1] font-semibold tracking-[-0.055em] text-white sm:text-6xl lg:text-[76px]">
            Conheça o Ecossistema
            <span className="mt-2 block bg-gradient-to-r from-cyan-200 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              CYPHER
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
            Detecte ameaças. Contenha ataques. Proteja cada endpoint.
            <span className="block text-slate-300">
              Detecção e isolamento automatizado de hosts em menos de 1 segundo.
            </span>
          </p>
          <button
            type="button"
            onClick={onStart}
            className="group mt-9 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-cyan-300 px-7 text-sm font-bold text-slate-950 shadow-[0_8px_35px_rgba(34,211,238,0.18)] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 sm:w-auto"
          >
            Iniciar a Demonstração
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="mx-auto mt-20 max-w-5xl sm:mt-28">
          <div className="mb-5">
            <p className="text-[10px] font-semibold tracking-[0.18em] text-cyan-300/80 uppercase">
              Resposta coordenada
            </p>
            <h2 className="mt-1.5 text-lg font-semibold tracking-tight text-white sm:text-xl">
              Do primeiro sinal à contenção
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {flowSteps.map(({ number, title, actor, description, Icon, tone }) => (
              <article
                key={number}
                className="group rounded-2xl border border-white/[0.07] bg-slate-900/55 p-5 transition duration-300 hover:-translate-y-1 hover:border-white/[0.14] hover:bg-slate-900/90"
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`flex size-11 items-center justify-center rounded-xl border ${flowToneStyles[tone]}`}
                  >
                    <Icon size={20} strokeWidth={1.7} />
                  </span>
                  <span className="font-mono text-xs text-slate-600">{number}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-1 text-[10px] font-semibold tracking-wide text-slate-500 uppercase">
                  {actor}
                </p>
                <p className="mt-4 text-[13px] leading-[1.7] text-slate-400">{description}</p>
              </article>
            ))}
          </div>
        </div>

        <section className="mx-auto mt-16 grid max-w-5xl gap-5 rounded-3xl border border-white/[0.08] bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 sm:mt-20 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-10 sm:p-9 lg:p-11">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] text-cyan-300/80 uppercase">
              Segurança que cabe no seu negócio
            </p>
            <h2 className="mt-3 max-w-xl text-2xl leading-tight font-semibold tracking-tight text-white sm:text-3xl">
              Menos tempo de exposição. Mais confiança para operar.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
              PMEs nem sempre contam com uma equipe SOC para responder a ameaças em tempo
              real. O CYPHER reduz essa janela com uma abordagem de Confiança Zero
              (Zero Trust) e firewall local no próprio host, sem exigir redes complexas
              ou reconfiguração de VLANs.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
              <span className="flex items-center gap-2 text-xs text-slate-300">
                <Clock3 size={14} className="text-cyan-300" />
                Resposta em menos de 1 segundo
              </span>
              <span className="flex items-center gap-2 text-xs text-slate-300">
                <Fingerprint size={14} className="text-cyan-300" />
                Princípio de Confiança Zero
              </span>
              <span className="flex items-center gap-2 text-xs text-slate-300">
                <LockKeyhole size={14} className="text-cyan-300" />
                Firewall local por host
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onStart}
            className="group flex min-h-14 w-full items-center justify-center gap-3 rounded-xl border border-cyan-300/25 bg-cyan-300/[0.08] px-5 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/50 hover:bg-cyan-300/[0.14] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 sm:w-auto sm:whitespace-nowrap"
          >
            Experimentar simulação
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
        </section>
        <footer className="mx-auto mt-10 flex max-w-5xl flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-[11px] text-slate-600">
            CYPHER · Cibersegurança acessível, automatizada e inteligente
          </p>
          <p className="flex items-center gap-1.5 text-[10px] text-slate-600">
            <Check size={12} className="text-emerald-500" />
            Simulação demonstrativa — sem ações em sistemas reais
          </p>
        </footer>
      </section>
    </main>
  );
}

function AlertRow({
  alert,
  selected,
  onSelect,
}: {
  alert: AlertItem;
  selected: boolean;
  onSelect: () => void;
}) {
  const isCritical = alert.severity === "critical";
  const Icon = alert.Icon;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`w-full border-b border-white/[0.06] p-4 text-left transition sm:p-5 ${
        selected
          ? isCritical
            ? "bg-red-400/[0.08]"
            : "bg-cyan-300/[0.06]"
          : "hover:bg-white/[0.025]"
      } ${isCritical ? "border-l-2 border-l-red-400" : "border-l-2 border-l-transparent"}`}
    >
      <span className="flex items-start gap-3">
        <span
          className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg ${
            isCritical ? "bg-red-400/10 text-red-300" : "bg-slate-800 text-slate-400"
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
      </span>
    </button>
  );
}

function ContainmentModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
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
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="containment-title"
        className="relative my-auto w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#0c1421] shadow-[0_30px_100px_rgba(0,0,0,0.65)]"
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
              aplicou as regras de firewall local instantaneamente, isolando o host
              enquanto preserva a conexão com a gestão.
            </p>
          </div>
          <div className="mt-7 rounded-2xl border border-white/[0.07] bg-slate-950/60 p-4 sm:p-5">
            <div className="mb-4 flex items-center gap-2 text-[10px] font-semibold tracking-[0.14em] text-slate-500 uppercase">
              <ShieldAlert size={14} className="text-emerald-400" />
              Linha do tempo da resposta
            </div>
            <div className="space-y-3">
              {[
                "Detecção: <10ms",
                "Notificação enviada via API REST",
                "Regra de Firewall ativada: Host Isolado",
              ].map((metric) => (
                <div key={metric} className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
                  {metric}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-5 flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Host FIN-WS-04 · Apenas simulação visual
          </p>
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

function StepEmailClient({ onExit }: { onExit: () => void }) {
  const [selectedAlert, setSelectedAlert] = useState(alertItems[0]);
  const [showContainment, setShowContainment] = useState(false);
  const DetailIcon = selectedAlert.Icon;

  function selectAlert(alert: AlertItem) {
    setSelectedAlert(alert);
    if (alert.severity === "critical") setShowContainment(true);
  }

  return (
    <main className="min-h-screen bg-[#070c14] text-slate-200">
      <Brand simulation onExit={onExit} />
      <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.17em] text-slate-500 uppercase">
              <span>Workspace</span>
              <span>/</span>
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
            <span className="size-2 rounded-full bg-emerald-400" />
            Todos os sistemas operacionais
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[210px_minmax(320px,1fr)_minmax(300px,0.88fr)] xl:grid-cols-[230px_minmax(380px,1.1fr)_minmax(340px,0.9fr)]">
          <aside className="rounded-2xl border border-white/[0.07] bg-slate-900/55 p-3">
            <p className="px-3 pb-3 pt-2 text-[10px] font-semibold tracking-[0.15em] text-slate-500 uppercase">
              Workspace
            </p>
            <div className="flex min-h-11 items-center gap-3 rounded-xl border border-cyan-300/10 bg-cyan-300/[0.08] px-3 text-sm font-medium text-cyan-100">
              <Inbox size={17} className="text-cyan-300" />
              Central de Alertas
              <span className="ml-auto rounded-md bg-red-400/15 px-1.5 py-0.5 text-[10px] font-semibold text-red-300">
                1
              </span>
            </div>
            <p className="mt-7 px-3 text-[10px] font-semibold tracking-[0.15em] text-slate-500 uppercase">
              Atividade
            </p>
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
            {alertItems.map((alert) => (
              <AlertRow
                key={alert.id}
                alert={alert}
                selected={selectedAlert.id === alert.id}
                onSelect={() => selectAlert(alert)}
              />
            ))}
            <div className="flex items-center justify-between px-4 py-3 text-[10px] text-slate-600 sm:px-5">
              <span>Exibindo todos os eventos</span>
              <span>Atualizado agora</span>
            </div>
          </section>

          <section className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.07] bg-slate-900/55">
            <div className="flex min-h-[65px] items-center justify-between border-b border-white/[0.06] px-4 sm:px-5">
              <div>
                <h2 className="text-sm font-semibold text-white">Detalhes do evento</h2>
                <p className="mt-0.5 text-[10px] text-slate-500">
                  Informações do alerta selecionado
                </p>
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
                  <p className="mt-1.5 font-mono text-[11px] text-slate-300">
                    {selectedAlert.host}
                  </p>
                </div>
              </div>
              {selectedAlert.severity === "critical" ? (
                <button
                  type="button"
                  onClick={() => setShowContainment(true)}
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
          <span>Dados ilustrativos — nenhuma ação é aplicada em sistemas reais.</span>
        </footer>
      </div>
      {showContainment && <ContainmentModal onClose={() => setShowContainment(false)} />}
    </main>
  );
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>("landing");

  return currentStep === "landing" ? (
    <StepLanding onStart={() => setCurrentStep("simulation")} />
  ) : (
    <StepEmailClient onExit={() => setCurrentStep("landing")} />
  );
}
