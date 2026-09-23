// CV improvement loop
// ==================
// A recruiter agent audits the CV (data + site + PDF) against .pi/cv/rubric.md,
// a writer agent applies the P0/P1 findings, and the recruiter re-audits.
// The loop stops when the recruiter score reaches the target with no blockers,
// when no blockers remain, when the audit shape is unusable, or at maxRounds.
//
// Launch:
//   subagent({
//     workflowScriptPath: ".pi/workflows/cv-loop.js",
//     cwd: "/home/artu/Desktop/Code/artumont.github.io",
//     args: { targetScore: 9, maxRounds: 3 },
//     async: true
//   });
//
// Args (all optional):
//   targetScore  number  default 9      score at which the loop stops
//   maxRounds    number  default 3      hard cap on recruiter rounds
//   focus        string  default ""     extra audit focus, e.g. "roles de plataforma"
//   dryRun       boolean default false  audit only, never launch the writer
//   reportsDir   string  default ".pi/cv/reports"
//                                       Report NAME prefix. A workflow child's `output` is routed
//                                       to the session's managed artifact dir, NOT to the repo cwd,
//                                       so this only controls the report filename.

const targetScore = typeof args.targetScore === "number" ? args.targetScore : 9;
const maxRounds = Number.isInteger(args.maxRounds) && args.maxRounds > 0 ? args.maxRounds : 3;
const focus = typeof args.focus === "string" ? args.focus.trim() : "";
const dryRun = args.dryRun === true;
const reportsDir = typeof args.reportsDir === "string" && args.reportsDir.trim()
  ? args.reportsDir.trim()
  : ".pi/cv/reports";
const rubricPath = ".pi/cv/rubric.md";
const factsPath = ".pi/cv/facts.md";

const auditSurface = [
  "Superficie auditada:",
  "- src/data/cv-data.ts (bloques `en` y `es`, cvAppearance)",
  "- src/components/CvPdf.tsx y src/components/PdfDownload.tsx",
  "- src/app/page.tsx, src/app/layout.tsx, src/app/cv/page.tsx, src/app/cv/layout.tsx",
  "- src/components/sections/*.tsx y src/components/ui/*.tsx",
  "- src/app/sitemap.ts y src/app/robots.ts",
].join("\n");

const rounds = [];
let previousFindingIds = [];
let previousSummary = "";
let finalScore = null;
let stopReason = "max-rounds";

for (let round = 1; round <= maxRounds; round += 1) {
  const auditTask = [
    "## Auditoría de CV — ronda " + round + " de " + maxRounds,
    "",
    "Lee la rúbrica compartida en " + rubricPath + " y audita el CV completo del repositorio.",
    "Lee también los datos confirmados por el usuario en " + factsPath + ": son verdad de referencia.",
    "No reportes como hallazgo nada que contradiga esos datos, y no propongas valores para los datos que ese archivo marca como no confirmados.",
    "Estás en modo solo lectura: no edites ni crees ningún archivo.",
    "",
    auditSurface,
    "",
    focus ? "Foco adicional solicitado por el usuario: " + focus : "Sin foco adicional.",
    "",
    previousFindingIds.length > 0
      ? "Findings reportados en rondas previas: " + previousFindingIds.join(", ") + ".\n" +
        "Verifica cada uno contra los archivos actuales. Pon en `resolved` solo los ids que ya no aplican.\n" +
        "Reutiliza el id original para los que sigan abiertos; no inventes ids nuevos para el mismo problema.\n" +
        "Resumen de la ronda previa: " + previousSummary
      : "Esta es la primera auditoría: no hay findings previos.",
    "",
    "Entrega el resultado llamando exactamente una vez a la herramienta de salida estructurada.",
    "Los valores de texto van en español (México); las claves del esquema quedan en inglés.",
  ].join("\n");

  const audit = await runs.run("audit-" + round, {
    label: "Auditar CV ronda " + round,
    agent: "cv-recruiter",
    task: auditTask,
    output: reportsDir + "/round-" + round + "-audit.md",
  });

  const structured = audit && audit.structuredOutput ? audit.structuredOutput : null;

  if (!structured || typeof structured.score !== "number") {
    rounds.push({
      round,
      state: "audit-sin-salida-estructurada",
      auditRunId: audit ? audit.runId : null,
      auditOk: audit ? audit.ok === true : false,
      outputReference: audit ? audit.outputReference || null : null,
      nota:
        "El reclutador no devolvió el esquema esperado; se detiene el loop para no escribir a ciegas.",
    });
    stopReason = "audit-sin-salida-estructurada";
    break;
  }

  const allFindings = Array.isArray(structured.findings) ? structured.findings : [];
  const blocking = allFindings.filter(
    (finding) => finding && (finding.severity === "P0" || finding.severity === "P1"),
  );
  const resolved = Array.isArray(structured.resolved) ? structured.resolved : [];

  finalScore = structured.score;
  previousFindingIds = allFindings.map((finding) => finding.id).filter(Boolean);
  previousSummary = structured.summary || "";

  const record = {
    round,
    state: "auditada",
    score: structured.score,
    dimensions: structured.dimensions || null,
    topThirdVerdict: structured.topThirdVerdict || null,
    summary: structured.summary || null,
    strengths: Array.isArray(structured.strengths) ? structured.strengths : [],
    resolved,
    findings: allFindings,
    p0: blocking.filter((finding) => finding.severity === "P0").length,
    p1: blocking.filter((finding) => finding.severity === "P1").length,
    auditRunId: audit.runId || null,
    auditReport: audit.outputReference || null,
  };

  if (blocking.length === 0) {
    record.fixState = dryRun ? "no-aplicado-dryRun" : "no-requerido";
    rounds.push(record);
    stopReason = structured.score >= targetScore ? "umbral-alcanzado" : "sin-bloqueantes";
    break;
  }

  if (dryRun) {
    record.fixState = "no-aplicado-dryRun";
    rounds.push(record);
    stopReason = "dry-run";
    break;
  }

  if (round === maxRounds) {
    record.fixState = "no-aplicado-limite-de-rondas";
    rounds.push(record);
    stopReason = "max-rounds";
    break;
  }

  const fixTask = [
    "## Ronda de mejora " + round + " de " + maxRounds,
    "",
    "Lee la rúbrica compartida en " + rubricPath + " y los datos confirmados en " + factsPath + ".",
    "Los datos de " + factsPath + " son verdad de referencia: úsalos tal cual, no los reinterpretes.",
    "Aplica los findings de la auditoría.",
    "",
    "Score actual del reclutador: " + structured.score + "/10 (objetivo " + targetScore + ").",
    "Resumen de la auditoría: " + (structured.summary || "sin resumen"),
    "Veredicto de los primeros 6 segundos: " + (structured.topThirdVerdict || "sin veredicto"),
    resolved.length > 0 ? "Ya resueltos desde la ronda previa (no los toques): " + resolved.join(", ") : "",
    "",
    "Aplica SOLO estos findings P0/P1:",
    JSON.stringify(blocking, null, 2),
    "",
    "Reglas de la ronda:",
    "- No cambies ningún hecho: ni empleadores, fechas, métricas, tecnologías ni certificaciones.",
    "- Si un finding exige un dato que no tienes, escálalo con contact_supervisor (need_decision) y repórtalo como bloqueado.",
    "- Sincroniza siempre `cvData.en` y `cvData.es` en el mismo pase, con los mismos hechos.",
    "- Mantén el contrato de tipos (`as const`, tipos exportados). Nada de `any` ni `@ts-ignore`.",
    "- `npx tsc --noEmit` debe terminar en 0.",
    "- No hagas barridos de formato ni refactors fuera de los findings.",
    "",
    "Informe de auditoría completo: " + (audit.outputReference || "(solo en la respuesta inline)"),
  ]
    .filter((line) => line !== "")
    .join("\n");

  const fix = await runs.run("fix-" + round, {
    label: "Mejorar CV ronda " + round,
    agent: "cv-writer",
    task: fixTask,
    gate: "npx tsc --noEmit",
  });

  record.fixState = fix.ok === true ? "aplicado" : "fallido";
  record.fixRunId = fix.runId || null;
  record.fixSummary = fix.output || null;
  rounds.push(record);
}

return {
  targetScore,
  maxRounds,
  focus: focus || null,
  dryRun,
  finalScore,
  stopReason,
  rounds,
};
