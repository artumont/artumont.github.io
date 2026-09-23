---
description: Loop reclutador + escritor de CV hasta alcanzar el score objetivo
argument-hint: "[foco] [rondas]"
---
Lanza el loop de mejora de CV con el tool `subagent`.

Foco adicional: ${1:-ninguno}
Rondas máximas: ${2:-3}
Directorio de reportes: ${3:-.pi/cv/reports}

Haz una sola llamada top-level, async, con el script guardado:

```js
subagent({
  workflowScriptPath: ".pi/workflows/cv-loop.js",
  cwd: "/home/artu/Desktop/Code/artumont.github.io",
  args: {
    targetScore: 9,
    maxRounds: ${2:-3},
    focus: "${1:-}",
    reportsDir: "${3:-.pi/cv/reports}"
  },
  async: true
})
```

Reglas del loop:

- El agente `cv-recruiter` audita `src/data/cv-data.ts` (EN+ES), `CvPdf.tsx`, el sitio y el SEO
  contra `.pi/cv/rubric.md`. Es de solo lectura y devuelve output estructurado (score,
  dimensiones, findings P0/P1/P2).
- El agente `cv-writer` aplica únicamente los findings P0/P1, sincroniza ambos idiomas y no
  inventa hechos. Su gate de verificación es `npx tsc --noEmit`.
- El loop corta cuando el score llega a 9 sin bloqueantes, cuando no quedan bloqueantes,
  cuando la auditoría no devuelve el esquema esperado, o al llegar a las rondas máximas.

Al terminar, reporta al usuario: rondas ejecutadas, score inicial y final, findings
resueltos, archivos cambiados, decisiones que requieren su aprobación y el motivo de parada.
No inventes mejoras adicionales fuera del loop.
