import {
  Activity,
  AlertTriangle,
  FileCheck2,
  FileWarning,
  Radio,
  ShieldCheck,
} from "lucide-react";

export const flowSteps = [
  {
    number: "01",
    title: "Detecção",
    actor: "CYPHERAgent",
    description:
      "O CYPHERAgent monitora arquivos-isca estratégicos para identificar alterações ou exclusões suspeitas que possam indicar um ataque de ransomware.",
    Icon: FileWarning,
    tone: "cyan",
  },
  {
    number: "02",
    title: "Alerta",
    actor: "CYPHERAgent → CYPHERADM",
    description:
      "Ao detectar uma alteração suspeita, o CYPHERAgent envia um alerta emergencial ao CYPHERADM para iniciar o processo de resposta.",
    Icon: Radio,
    tone: "amber",
  },
  {
    number: "03",
    title: "Resposta",
    actor: "CYPHERADM → CYPHERGuardian",
    description:
      "O CYPHERADM processa o alerta e aciona o CYPHERGuardian para iniciar o isolamento da máquina comprometida.",
    Icon: Activity,
    tone: "violet",
  },
  {
    number: "04",
    title: "Isolamento",
    actor: "CYPHERGuardian",
    description:
      "O CYPHERGuardian aplica regras de firewall para bloquear conexões de saída, mantendo a comunicação necessária com o painel administrativo.",
    Icon: ShieldCheck,
    tone: "emerald",
  },
];

export const alerts = [
  {
    id: "critical",
    sender: "CYPHERAgent — Monitoramento",
    subject: "ALERTA CRÍTICO: Alteração suspeita em arquivo-isca",
    preview: "Violação detectada em Financeiro/folha_pagamento.xlsx",
    time: "Agora",
    severity: "critical",
    Icon: AlertTriangle,
    category: "Detecção de ameaça",
    body:
      "Uma alteração não autorizada foi detectada em um arquivo-isca estratégico. O comportamento é compatível com a atividade de criptografia em massa associada a ransomware.",
    file: "Financeiro/folha_pagamento.xlsx",
    host: "FIN-WS-04 · 192.168.1.24",
  },
  {
    id: "telemetry",
    sender: "CYPHERADM",
    subject: "Relatório de Telemetria do Endpoint",
    preview: "Resumo de integridade e atividade do endpoint.",
    time: "12:40",
    severity: "info",
    Icon: Activity,
    category: "Telemetria",
    body:
      "O endpoint concluiu o envio de telemetria. Nenhum desvio adicional foi registrado no período analisado.",
    file: "Endpoint FIN-WS-04",
    host: "FIN-WS-04 · 192.168.1.24",
  },
  {
    id: "protection",
    sender: "CYPHERGuardian",
    subject: "Status de Proteção do Endpoint",
    preview: "Agente ativo e políticas locais sincronizadas.",
    time: "10:12",
    severity: "info",
    Icon: ShieldCheck,
    category: "Proteção",
    body:
      "O CYPHERGuardian está ativo. As regras locais de proteção estão sincronizadas com o painel administrativo.",
    file: "Política de firewall local",
    host: "FIN-WS-04 · 192.168.1.24",
  },
  {
    id: "fraud",
    sender: "CYPHERAgent — Validação de Documentos",
    subject: "Análise Antifraude de Boletos PDF",
    preview: "Verificação ilustrativa de autenticidade documental.",
    time: "Ontem",
    severity: "info",
    Icon: FileCheck2,
    category: "Análise antifraude",
    body:
      "A análise do documento foi concluída. Os dados do boleto passaram pela validação demonstrativa de consistência.",
    file: "boleto_fornecedor_2841.pdf",
    host: "Análise documental",
  },
];