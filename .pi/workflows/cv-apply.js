// Targeted CV fix + verification pass
// ==================================
// Use this after cv-loop.js stops (or whenever the edits are already decided) and the
// changes do NOT need a fresh full audit first. It applies exactly the approved
// instructions, then verifies them with a recruiter pass.
//
// Launch:
//   subagent({
//     workflowScriptPath: ".pi/workflows/cv-apply.js",
//     cwd: "/home/artu/Desktop/Code/artumont.github.io",
//     args: {
//       label: "cierre P1 ronda 3",
//       instructions: [
//         "Quita el conteo de servicios de dominio en los 6 lugares listados.",
//         "Cierra los bullets de impacto usando solo hechos ya verificables."
//       ]
//     },
//     async: true
//   });
//
// Args:
//   instructions  string[]  REQUIRED  approved, self-contained instructions (verbatim)
//   label         string    default "aplicación dirigida"
//   reportsDir    string    default ".pi/cv/reports"
//   skipVerify    boolean   default false

const rawInstructions = Array.isArray(args.instructions) ? args.instructions : [];
const instructions = rawInstructions.filter(
  (instruction) => typeof instruction === "string" && instruction.trim().length > 0,
);

if (instructions.length === 0) {
  return {
    ok: false,
    stopReason: "sin-instrucciones",
    nota: "args.instructions debe traer al menos una instrucción aprobada. No se lanzó ningún child.",
  };
}

const reportsDir =
  typeof args.reportsDir === "string" && args.reportsDir.trim()
    ? args.reportsDir.trim()
    : ".pi/cv/reports";
const roundLabel =
  typeof args.label === "string" && args.label.trim() ? args.label.trim() : "aplicación dirigida";
const skipVerify = args.skipVerify === true;

const rubricPath = ".pi/cv/rubric.md";
const factsPath = ".pi/cv/facts.md";

let numbered = "";
for (let index = 0; index < instructions.length; index += 1) {
  numbered += (index + 1) + ". " + instructions[index] + "\n";
}

const fixTask = [
  "## Aplicación dirigida — " + roundLabel,
  "",
  "Lee " + rubricPath + " y " + factsPath + ".",
  "Los datos de " + factsPath + " son verdad de referencia: úsalos tal cual, no los reinterpretes.",
  "",
  "Aplica EXACTAMENTE estas instrucciones ya aprobadas por el usuario. No hagas nada más:",
  numbered,
  "Reglas de esta ronda:",
  "- No cambies ningún hecho fuera de lo que indiquen las instrucciones.",
  "- No inventes cifras, empleadores, fechas, tecnologías ni certificaciones.",
  "- Sincroniza `cvData.en` y `cvData.es` en el mismo pase, con los mismos hechos y el mismo orden.",
  "- No toques el layout ni la paginación salvo que una instrucción lo pida explícitamente.",
  "- No hagas barridos de formato ni refactors fuera de las instrucciones.",
  "- `npx tsc --noEmit` debe terminar en 0.",
].join("\n");

const fix = await runs.run("apply", {
  label: "Aplicar cambios aprobados",
  agent: "cv-writer",
  task: fixTask,
  gate: "npx tsc --noEmit",
});

const result = {
  label: roundLabel,
  instructions,
  fixOk: fix.ok === true,
  fixRunId: fix.runId || null,
  fixSummary: fix.output || null,
  verifyRunId: null,
  verifyScore: null,
  verifyVerdict: null,
  verifyFindings: [],
};

if (skipVerify) {
  result.stopReason = "aplicado-sin-verificar";
  return result;
}

const verifyTask = [
  "## Verificación dirigida — " + roundLabel,
  "",
  "Lee " + rubricPath + " y " + factsPath + ".",
  "",
  "Verifica ÚNICAMENTE que estas instrucciones aprobadas quedaron aplicadas y correctas:",
  numbered,
  "Reporta, para cada instrucción, si quedó aplicada, parcial o no aplicada, citando el",
  "archivo y el texto exacto que lo prueba.",
  "",
  "Además revisa solo dos cosas más:",
  "- Cualquier P0 nuevo introducido por este cambio (contradicción interna, hecho inventado,",
  "  pérdida de dato crítico, parseo ATS roto).",
  "- El score completo con las 7 dimensiones, para dejar registro.",
  "",
  "No edites ni crees ningún archivo. No reabras findings P2 anteriores.",
].join("\n");

const verify = await runs.run("verify", {
  label: "Verificar cambios aprobados",
  agent: "cv-recruiter",
  task: verifyTask,
  output: reportsDir + "/verify-apply.md",
});

const structured = verify && verify.structuredOutput ? verify.structuredOutput : null;

result.verifyRunId = verify.runId || null;
result.verifyScore = structured ? structured.score : null;
result.verifyVerdict = structured ? structured.summary : null;
result.verifyFindings = structured && Array.isArray(structured.findings) ? structured.findings : [];
result.stopReason = fix.ok === true ? "aplicado-y-verificado" : "aplicacion-fallida";

return result;
