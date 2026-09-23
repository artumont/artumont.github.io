# CV & Portfolio Rubric — ATS + Technical Recruiter

Single source of truth for the `cv-recruiter` and `cv-writer` agents.

Both agents MUST read this file before acting. The recruiter scores against it; the
writer only changes what the rubric can justify.

Repo: `artumont.github.io` (Next.js 15, App Router, Tailwind, `@react-pdf/renderer`).
Owner: Arturo Montes — Backend & DevOps Engineer, Nuevo León, México. Target: backend /
DevOps / platform roles.

**Datos confirmados por el usuario:** `.pi/cv/facts.md`. Es la verdad de referencia sobre
correo canónico, modalidad, seniority y certificaciones. Ningún agente puede contradecirla,
y ningún agente puede inventar un dato que facts.md marque como no confirmado — se escala.

---

## 1. Repository map (audited surface)

| Path | Role |
| --- | --- |
| `src/data/cv-data.ts` | Canonical CV content. `cvData.en` and `cvData.es` must stay in sync. Also `cvAppearance.watermark`. |
| `src/components/CvPdf.tsx` | PDF layout (`@react-pdf/renderer`). Currently two-column, `SIDEBAR_WIDTH = 260` of `PAGE_WIDTH = 595.28`. |
| `src/components/PdfDownload.tsx` | Client-side PDF render + download trigger. |
| `src/app/cv/page.tsx`, `src/app/cv/layout.tsx` | `/cv` route. |
| `src/app/page.tsx`, `src/app/layout.tsx` | Landing page and global metadata (title, description, keywords, OG, canonical). |
| `src/components/sections/{Header,About,Projects,Footer}.tsx` | Landing sections. |
| `src/components/ui/{NavBar,TerminalText,Loading}.tsx` | UI chrome. |
| `src/app/sitemap.ts`, `src/app/robots.ts` | SEO plumbing. |
| `public/logos/*`, `public/icons/cv/*`, `public/fonts/cv/*` | Assets referenced by data/components. |

Verification command available in-repo: `npx tsc --noEmit` (exits 0 on the clean tree).

---

## 2. Scoring model

Every dimension is scored `0–10`. The final `score` is the weighted average, rounded to
one decimal.

| Dimension | Weight | Question it answers |
| --- | --- | --- |
| `ats` | 25% | Can a parser and a keyword filter read it without loss? |
| `keywords` | 20% | Does it mirror the target role's vocabulary in context? |
| `impact` | 20% | Does each bullet prove outcome, scale, and ownership? |
| `structure` | 15% | Can a recruiter extract role/stack/contact in 6 seconds? |
| `credibility` | 10% | Is every claim verifiable and internally consistent? |
| `web` | 5% | Does the portfolio site reinforce the CV for a recruiter/SEO? |
| `pdf` | 5% | Is the PDF ATS-safe and clean as a document? |

### Anchors (apply per dimension)

- `0–2` — broken for the intended purpose (parse failure, missing, false, unreadable).
- `3–4` — present but actively harmful: vague, generic, or contradicting evidence.
- `5–6` — baseline and acceptable; nothing lost, nothing gained.
- `7–8` — strong: specific, relevant, evidenced, low friction.
- `9–10` — exemplary: a recruiter would quote it to the hiring manager.

### Severity

- **P0 — blocks.** ATS parse loss of critical data (name, role, dates, contact, or an
  entire section), a false or unverifiable claim, a broken build/route/link, or a
  `tsc`/render failure.
- **P1 — materially lowers callback odds.** Missing keyword coverage for the target role,
  bullets without outcomes, unquantified impact where numbers exist, broken hierarchy,
  unscannable top third, stale or mismatched dates.
- **P2 — polish.** Wording, ordering, minor consistency, optional strengthening.

P2 is report-only. The writer never spends a round on P2 alone.

### Score ≥ 9 gate

A score of `9` or higher requires ALL of:

1. Zero P0 findings.
2. Zero P1 findings.
3. Every recent-role bullet contains a concrete outcome (metric, scale, or shipped
   artifact) — not a responsibility statement.
4. The top third of the CV answers: role, seniority, stack, location/work mode, contact,
   and code links.
5. `en` and `es` carry the same facts, with no translation drift.
6. Every external link resolves and matches the claim it supports.

P2 findings may remain at score 9. Report them, do not block on them.

---

## 3. Dimension criteria

### 3.1 `ats` — parseability

- Critical data must be plain text, selectable, in the main flow — not in an image, icon,
  watermark, text box, or header/footer region.
- Parse order must follow reading order. A fixed-width two-column layout is a P1: parsers
  frequently interleave the sidebar into the main column.
- Standard section headings only (`Experience` / `Work Experience`, `Education`, `Skills`,
  `Projects`, `Certifications`, `Languages`). No creative headings (`My Journey`,
  `Where I've Been`).
- Contact values (email, phone, site) must be literal text — `artumontg@gmail.com`, not a
  glyph or an obfuscated string.
- Dates in a single unambiguous format across the document (`Nov 2025 - Present`,
  `Mar 2025`). Never mix `2025-11`, `11/25`, and `Nov 2025`.
- Full technology names plus acronyms, both forms, at least once each:
  `CI/CD (continuous integration and delivery)`, `Infrastructure as Code (IaC)`,
  `role-based access control (RBAC)`, `PostgreSQL`, `Kubernetes (K8s)`.
- Decorative elements (the Matrix watermark quotes/icons in `cvAppearance`) must never sit
  over text and must never carry information. If they reduce text contrast or parser
  clarity, that is at minimum P1.

### 3.2 `keywords` — role alignment

- Mirror the target role's own vocabulary. For Backend/DevOps: distributed systems,
  microservices, REST/gRPC API design, data modeling, observability, CI/CD, IaC,
  container orchestration, on-call/reliability, cloud (AWS), security (JWT, RBAC, secrets
  management).
- A keyword must appear **in context** (inside a bullet that demonstrates it), not only in
  the skills list. A skills list alone is keyword salad.
- No keyword stuffing: if a technology has no supporting bullet, project, or certification,
  it does not belong in the skills list.
- Skills list ordered by relevance to the target role, not alphabetically or by novelty.
- Cap the skills list at ~12 items. 20+ items reads as breadth-without-depth.

### 3.3 `impact` — outcomes

Every bullet should satisfy the XYZ form: **Accomplished X, as measured by Y, by doing Z.**

- Strong past-tense action verb first. Banned openers: `Responsible for`, `Worked on`,
  `Helped with`, `Involved in`, `Participated in`, `Tasked with`, `Duties included`.
- No first person: no `I`, `my`, `we`. Implied subject.
- **En `es`, la regla de persona es más estricta.** La conjugación española marca la persona, así
  que `Construí`, `Diseñé`, `Modelé`, `Dejé` **son primera persona explícita** y quedan
  prohibidas. Usa forma nominal impersonal (`Construcción de…`, `Despliegue de…`, `Modelado de…`),
  que es la convención del CV en español sin sujeto. La forma verbal en inglés (`Built`,
  `Shipped`) sí es válida porque no marca persona.
  - **Consecuencia aceptada, no reportable:** en `es` los bullets abren con un sustantivo de
    acción y no con un verbo conjugado. Eso es correcto y deliberado. No reportarlo como
    "falta verbo de acción" ni como drift frente a `en`: la paridad entre idiomas se mide en
    **hechos, cifras, orden y cierre en resultado**, no en la categoría gramatical del arranque.
- Quantify when the number exists: services count, request/latency, throughput, data volume,
  record count, cost, time saved, error rate, environment count, team size.
- Never invent a metric. If a real number is unavailable, the writer must escalate rather
  than fabricate. An unverifiable number is P0.
- One to two lines per bullet. No bullet longer than ~2 rendered lines.
- Recent role: 4–6 bullets. Older roles: 2–4. Projects: 2–3 bullets or one dense sentence.
- Each bullet answers "so what?" for a hiring manager, not "what did the ticket say?".

### 3.4 `structure` — the 6-second scan

- Top third must contain: name, target title, one-line positioning, location + work mode,
  email, phone, site/GitHub.
- Reverse chronological everywhere. `Present` dates must be consistent and not overlap
  silently.
- Clear visual hierarchy: title > company > dates > bullets. Consistent margins and spacing.
- One page is the default for an early-career profile; two pages maximum. Density beats
  padding.
- Consistent punctuation: either all bullets end with a period or none do. Same for all
  date strings.
- Education entry shows institution, location, dates, and program; expected graduation
  format is explicit (`Aug 2024 - Present` is acceptable; `Aug 2024 - Dec 2027 (expected)`
  is better).
- No orphaned section, no single-item bullet list, no duplicated content across sections.

### 3.5 `credibility` — verifiability

- Every claim traceable to a real artifact: a repo, a project entry, a certification, or a
  role. Cross-check project claims against their own `stack` and `duration`.
- No inflation: `99.5% accuracy` needs the project and context that produced it; a hackathon
  build must not read like a production deployment.
- Dates must not contradict: a project dated `Sep 2026` while the CV says `Present` in 2025,
  an `altur-vconstruct` entry that claims enterprise scale, etc. Report contradictions.
- Links must resolve (GitHub URLs, `artumont.online`) and the target must match the claim.
- Certifications should carry issuer and, where available, date.
- Language levels must be honest and consistent (`C2 Proficient` vs `Native`).

### 3.6 `web` — portfolio site

- Landing page answers who / what / where and offers a working CV download within the first
  viewport.
- Global metadata (`src/app/layout.tsx`): title ≤ 60 chars, description 150–160 chars,
  canonical, OG/Twitter cards with a real image, `Person` JSON-LD.
- One `h1` per page; headings used semantically, not for styling.
- Every project card states problem → approach → impact and links to live + repo.
- `sitemap.ts` / `robots.ts` stay valid and reference the canonical host.
- Accessibility: alt text on meaningful images, visible focus states, keyboard-navigable
  nav, contrast on dark backgrounds, `prefers-reduced-motion` respected for animation.
- Performance: avoid layout shift from fonts/images, prefer `next/image`, keep LCP asset
  small.
- Mobile: nothing overflows, tap targets ≥ 44px, no horizontal scroll.
- The `/cv` route must actually render and download a valid PDF.

### 3.7 `pdf` — document quality

- ATS-safe layout preferred: single column, or a sidebar that does not carry critical data.
  `CvPdf.tsx`'s 260/595 split is a known risk — flag it.
- Text selectable and copyable; no rasterized text.
- Real hyperlinks (`Link` from `@react-pdf/renderer`) for email, site, and repos.
- Fonts embedded and legible at print size (≥ 9pt body, ≥ 10pt for bullets).
- No clipping, no overflow past the page, no orphaned last line.
- Consistent alignment between the `en` and `es` renders — same structure, same order.
- Suggested filename pattern: `Arturo-Montes-Backend-DevOps-Engineer.pdf`.

---

## 4. Evidence rules for findings

A finding is valid only if it can be defended with a file, a line, a string, or a
contradiction. Filler findings ("consider adding more impact") are invalid.

Each finding must carry:

- `id` — stable across rounds, format `<dimension>-<n>` (e.g. `ats-3`, `impact-7`). Reuse the
  same id in later rounds when the issue persists.
- `severity` — `P0` | `P1` | `P2`.
- `dimension` — one of the seven dimension keys.
- `location` — file path plus the section/field, or `cv/en`, `cv/es`, `pdf`, `web`, `seo`.
- `evidence` — the current text or structure that proves the issue. Quote it.
- `fix` — the smallest concrete change that resolves it. Not a direction, an edit.

Reject-and-skip rules for the recruiter:

- Do not report anything already fixed. Verify against the current file, not memory.
- Do not report styling preferences with no rubric anchor.
- Do not report the same underlying issue more than once; merge it into one finding with the
  highest severity it deserves.
- If a dimension is clean, say so and score it honestly. Do not invent work.

---

## 5. Writer rules

- Apply only `P0` and `P1` findings from the supplied audit. P2 is optional and must not
  consume the round.
- Never change a fact. The writer improves wording, structure, ordering, and presentation —
  it does not invent employers, dates, metrics, technologies, or achievements.
- If resolving a finding requires a fact the writer does not have (a real metric, a real
  graduation date), stop and escalate instead of guessing.
- Keep `cvData.en` and `cvData.es` factually identical: same entries, same numbers, same
  order, same links. Translate, do not paraphrase away detail.
- Preserve the `as const` contract and exported types in `cv-data.ts`. No `any`, no
  `@ts-ignore`.
- Do not break the PDF layout: if a layout change is required (e.g. collapsing the sidebar),
  keep the visual identity, and report the decision explicitly in the handoff.
- Do not delete the Matrix watermark without stating the ATS rationale and the trade-off.
  It is an identity choice owned by the user.
- Validation is mandatory: `npx tsc --noEmit` must pass, and the affected route must still
  render.
- Report: changed files, findings addressed by id, validation output, anything deferred, and
  any decision that needs the user.

---

## 6. Output language

- Structured field keys: English (schema contract).
- Every human-readable value (`summary`, `evidence`, `fix`, `strengths`, report prose):
  **Spanish (México)** — this is what the owner reads.
- CV content itself: keep the existing bilingual `en` / `es` split. Do not translate the CV
  into a third language.
