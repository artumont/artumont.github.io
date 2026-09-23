# Datos confirmados por el usuario

Verdad de referencia para `cv-recruiter` y `cv-writer`. Confirmado el 2026-09-22.

Ningún agente puede contradecir estos datos. Si un hallazgo exige un dato que **no** está
aquí, se escala al usuario con `contact_supervisor`; no se inventa.

---

## Contacto

| Campo | Valor canónico | Nota |
| --- | --- | --- |
| Correo | `artumontg@gmail.com` | `cv-data.ts` (`contact.email`) y `About.tsx` ya son correctos. `Footer.tsx` tiene el `href` equivocado (`mailto:artumont@gmail.com`) y debe alinearse. |
| Teléfono | `+52 81 2446 4219` | |
| Sitio | `artumont.online` | |
| GitHub | `github.com/artumont` | Debe aparecer en el top third del CV. |
| LinkedIn | `https://www.linkedin.com/in/artumont` | Fuente: `About.tsx` (`profileButtons`). Verificado en el repo; usable en `sameAs` del JSON-LD. |
| Ubicación | Nuevo León, México | |

## Posicionamiento

- Título: **Backend & DevOps Engineer**
- Seniority objetivo: **Junior**
- Modalidad: **Híbrido, Monterrey (Nuevo León)**
- Línea de posicionamiento: se puede redactar libremente, pero debe contener título,
  seniority y modalidad de esta sección.

## Observabilidad — CONFIRMADA

El usuario confirmó: **Prometheus + Grafana** para métricas y **Loki** para logs.

- Estos tres nombres SÍ pueden y deben aparecer en el CV (`en` y `es`): en el bullet de
  infraestructura del rol actual y en la línea de `skills` que ya contiene Docker y
  Kubernetes.
- **PROHIBIDO ampliarlo.** El usuario NO confirmó alerting, alertas, on-call, SLO/SLI,
  tracing, dashboards de negocio ni ninguna otra capacidad de observabilidad. No inventarlas,
  no sugerirlas y no reportar su ausencia como hallazgo una vez aplicadas.

## Infraestructura del rol actual

**No hay nube pública.** SiaERP corre on-prem: Proxmox LXC + Docker + Terraform + Ansible.

Consecuencia obligatoria: ningún bullet del rol actual puede mencionar AWS, Azure, GCP ni
cualquier nube pública como infraestructura. AWS aparece únicamente como **credencial** en
`skills` y `certifications`. Ningún agente puede "resolver" una carencia de keyword de nube
agregándola al rol actual.

**Sin conteo de servicios.** El CV NO debe declarar un número de microservicios o servicios
de dominio. La enumeración real cubre 8 módulos y el numeral "7" era inconsistente con ella.
Se describe la cobertura por módulos, sin numeral. Prohibido escribir "seven", "siete",
"7 servicios" o cualquier variante en `en` o `es`.

La misma regla aplica al **sitio**: `Projects.tsx` ("through 7 domain microservices") y
`About.tsx` ("with 7 business services") deben omitir el conteo para que sitio y CV
coincidan. El conteo es verdadero, pero no se publica en ninguno de los dos artefactos.

**Arquitectura de datos — CONFIRMADA por el usuario:** un solo PostgreSQL, con una base de
datos o esquema por servicio. El aislamiento "database-per-service" ocurre *dentro* de esa
única instancia.

Consecuencias obligatorias:

- La frase del CV `a single PostgreSQL instance` / `un solo PostgreSQL` es **correcta**.
- El sitio NO puede decir `database-per-service isolation` ni `database-per-service pattern`
  a secas: debe aclarar que es a nivel base de datos o esquema dentro de una sola instancia
  de PostgreSQL.

## Certificaciones

Entran al CV **7 certificaciones técnicas**, como objetos `{ issuer, name, date }`. Los
valores exactos salen de `src/components/sections/About.tsx`:

| issuer | name | date |
| --- | --- | --- |
| AWS Academy | Cloud Foundations | Sep 2024 |
| AWS Academy | Cloud Operations | Apr 2026 |
| Cisco | Python Essentials 1 | Sep 2024 |
| Cisco | Networking Basics | Feb 2026 |
| Tecmilenio | Fundamentos de DevOps | Jun 2026 |
| Tecmilenio | Desarrollo Full Stack | Jun 2026 |
| Tecmilenio | Bases de Datos | Oct 2025 |

**Fuera del CV y fuera del sitio:** `IBM — Data Visualization with R (Dec 2024)`. El usuario
decidió eliminarla también de `src/components/sections/About.tsx`, para que sitio y CV
coincidan en las mismas 7 certificaciones técnicas.

Nomenclatura: `cvData.en` y `cvData.es` deben usar el mismo `name` para cada certificación
(no traducir el nombre de la credencial). El prefijo actual `"AWS Academy Graduate - "` y la
variante `"Fundamentos de DevOps - Tecmilenio"` son drift a unificar.

---

## Métricas de impacto confirmadas

Confirmadas por el usuario. Son los **únicos** números de negocio que pueden aparecer en el
CV para el rol actual.

| Métrica | Valor autorizado | Nota de redacción obligatoria |
| --- | --- | --- |
| Aprovisionamiento de un LXC en Proxmox | de ~1 hora manual a ~10 minutos automatizado | Aplica a **entornos nuevos desde cero** (`entornos vacíos`). El bullet DEBE conservar ese calificador. No generalizar a "cualquier aprovisionamiento", ni a migraciones, ni a entornos existentes. |
| Servicios y ambientes | 7 servicios de dominio y 3 ambientes (dev/staging/prod) — **verdad interna confirmada** | Los 3 ambientes SÍ se publican en el CV. El numeral de servicios es verdadero, pero el CV NO lo publica (ver "Sin conteo de servicios"). No hay contradicción entre las dos reglas: una fija el hecho, la otra la publicación. |
| Usuarios de SiaERP | ~15–20 usuarios | Es una cifra **aproximada**. Redactar como aproximación (`~15–20 usuarios internos`); nunca presentarla como exacta. |

**Prohibido de forma explícita:** facturas y/u órdenes de compra por mes. El usuario decidió
**no publicar** esa cifra. No debe aparecer en `en` ni en `es`, ni como número, ni como
rango, ni como "más de N".

Sin datos disponibles (no inventar): reducción de errores manuales, latencia, throughput,
y cualquier métrica de negocio distinta a las tres de la tabla.

---

## Datos que NO están confirmados

Si un finding necesita alguno de estos, el writer debe escalarlo, no inventarlo:

- Fecha estimada de graduación (hoy `"Aug 2024 - Present"`).

## Decisiones de formato aprobadas

- **Fechas en `es`:** unificar a las abreviaturas de mes en inglés que ya usan las
  certificaciones (`Apr`, `Aug`), conservando la palabra `Actualidad` en los periodos
  abiertos. Es decir `Abr 2025` → `Apr 2025` y `Ago 2024` → `Aug 2024`.
- **Nombre del PDF:** patrón `Arturo-Montes-Backend-DevOps-Engineer-EN.pdf` y
  `Arturo-Montes-Backend-DevOps-Engineer-ES.pdf`.
- **Paginación: 1 página.** Aprobado por el usuario en el rediseño del layout. El CV debe
  caber en EXACTAMENTE 1 página A4 en `en` y en `es`, con una sola columna, todo en flujo
  normal y sin `position: absolute`. El objetivo es legibilidad y acabado, no densidad: si el
  contenido no cabe, se recorta contenido y **nunca** se baja la tipografía. Suelos
  obligatorios: cuerpo y metadatos ≥9pt, bullets del rol y de proyectos ≥10pt.
  `node scripts/cv-preview.mjs` renderiza PDF + PNG y avisa cuando el resultado no da 1 página.
- **Fuente embebida: RECHAZADO — no volver a proponerlo.** Decisión explícita del usuario.
  El PDF sigue usando Helvetica base-14 (`cvFonts.helvetica.sources = []`) y los 4 TTF de
  Monaspace Neon en `public/fonts/cv/` quedan sin usar. No activar
  `cvAppearance.font = "monaspaceNeon"`, no borrar la entrada `helvetica`, no borrar los TTF.
  Esto NO es un pendiente ni un hallazgo abierto: es un "no" deliberado. Los agentes no
  deben reportarlo como P2 ni mencionarlo como mejora disponible.

## Decisiones de layout aprobadas (rediseño a 1 página)

- **El `summary` no repite el título.** El campo `title` ya se renderiza justo arriba en el
  header. `en`: `Junior · Hybrid in Monterrey, Nuevo León`. `es`:
  `Junior · Híbrido en Monterrey, Nuevo León`. Conserva seniority, modalidad y lugar.
- **Lista de módulos de SiaERP: los 8, idénticos y en el mismo orden** en el bullet del rol
  actual y en la descripción del proyecto, en `en` y en `es`. Sin numeral. Nunca permitir que
  las dos listas difieran: ya ocurrió una vez y es un error de credibilidad.
- **Sin línea "Otros proyectos".** `otherProjects` y `labels.otherProjects` están eliminados.
  GitHotswap y altur-vconstruct no aparecen en el CV. Los 4 proyectos destacados son SiaERP,
  DotSlashStream, EcommerceDocker y ConcurrentChatSystem, en ese orden.
- **Encabezados de sección alineados a la IZQUIERDA**, con el nodo del motivo alineado al
  inicio del texto y la regla extendiéndose a la derecha. No volver a alinearlos a la derecha.
- **Enlaces sin color.** Toda la paleta es monocromática (`#ffffff`, `#000000` y grises). Los
  enlaces usan negro con subrayado. Cero azul o cualquier color fuera de la paleta.
- **Separador de Idiomas:** `—`, el mismo que usan las Certificaciones. No usar `-`.
- **Landing del sitio:** el primer viewport debe mostrar el nombre completo y la
  ubicación/modalidad: `Arturo Montes — Backend & DevOps Engineer · Monterrey, Nuevo León
  (Hybrid)`. El wordmark del NavBar dice `Arturo Montes`, no `Artu`.
- **Educación:** la duración usa el avance real del programa tal como lo confirmó el usuario:
  `en` → `Aug 2024 - Present (5th of 8 semesters)`; `es` →
  `Aug 2024 - Actualidad (5º de 8 semestres)`. El mes y año exactos de graduación NO están
  confirmados: no inventarlos.
- **Resumen de 2 líneas (nuevo).** El CV lleva un resumen de prosa de máximo 2 líneas bajo el
  header. Debe responder dos cosas: **qué tipo de rol busca** (backend/platform, nivel junior)
  y que tiene **experiencia hands-on en producción**. Prohibido: mencionar una cifra de años o
  meses de experiencia, repetir el `title` (ya está renderizado arriba), listar tecnologías que
  no estén en `facts.md`, o duplicar el contenido de los bullets. Mismo contenido factual en
  `en` y en `es`.
  - **Ajuste posterior:** además está prohibido repetir el nivel (`junior`/`Junior`, ya visible
    en la línea de posicionamiento) y prohibido usar `on-prem` o cualquier anglicismo suelto
    dentro de una frase en `es`. El resumen debe aportar valor, no reformular el header:
    apunta a la autonomía real (diseñar **y** operar), sin listar tecnologías (eso ya está en
    `skills`) y sin duplicar los bullets.
- **Skills: AWS NO va en el bloque de skills.** `AWS (Cloud Foundations, Cloud Operations)` vive
  únicamente en `certifications`. El bloque de skills mantiene las familias (Backend & APIs /
  Data & Storage / Infrastructure / Observability / CI/CD & Security, más `Distributed Systems
  (microservices)` reubicado en la familia semánticamente correcta). **El bloque de skills debe
  renderizar el MISMO número de líneas en `en` y en `es`** — la paridad de líneas es un
  requisito del layout, no una casualidad.
- **Ritmo vertical: los valores originales son la referencia.** La compactación de 10 valores que
  se hizo para meter el resumen fue un parche temporal, ya revertido. Valores originales que
  deben conservarse: header `paddingTop` 12 y `paddingBottom` 9; `main.paddingTop` 8;
  `watermarkRow.marginTop` 2; `section.marginBottom` 7; `highlight.marginTop` 3;
  `projectItem.marginBottom` 5; `projectMeta.marginTop` 1; `skillItem.marginBottom` 1.5;
  `certificationItem.marginBottom` 2. Si algo no cabe en 1 página, se recorta **contenido** —
  nunca se vuelve a comprimir el espaciado en silencio.
- **Certificaciones: orden cronológico DESCENDENTE**, la más reciente primero, con el MISMO
  orden en `en` y en `es`. No agrupar por emisor. Orden vigente: Jun 2026 (Fundamentos de
  DevOps) · Jun 2026 (Desarrollo Full Stack) · Apr 2026 (Cloud Operations) · Feb 2026
  (Networking Basics) · Oct 2025 (Bases de Datos) · Sep 2024 (Cloud Foundations) · Sep 2024
  (Python Essentials 1).
- **Watermark: UNA sola cita, fija.** La cita es `Follow the white rabbit.` con el icono
  `rabbit`. La rotación diaria por `getDay()` está ELIMINADA: el PDF no puede cambiar de
  contenido según el día en que se abra. El campo `quotes` conserva esa única entrada. Los
  otros 6 PNG de `public/icons/cv/watermark/` quedan en disco como alternativas disponibles
  para el usuario — NO son assets muertos, no reportarlos como huérfanos y no borrarlos. Si el
  usuario quiere otra cita, se cambia la entrada de `quotes` a mano.
