export type CvLanguage = "en" | "es";

export const cvFonts = {
  helvetica: {
    family: "Helvetica",
    sources: [],
  },
  monaspaceNeon: {
    family: "Monaspace Neon",
    sources: [
      {
        src: "/fonts/cv/MonaspaceNeon-Regular.ttf",
        fontWeight: 400 as const,
        fontStyle: "normal" as const,
      },
      {
        src: "/fonts/cv/MonaspaceNeon-Bold.ttf",
        fontWeight: 700 as const,
        fontStyle: "normal" as const,
      },
      {
        src: "/fonts/cv/MonaspaceNeon-Italic.ttf",
        fontWeight: 400 as const,
        fontStyle: "italic" as const,
      },
      {
        src: "/fonts/cv/MonaspaceNeon-BoldItalic.ttf",
        fontWeight: 700 as const,
        fontStyle: "italic" as const,
      },
    ],
  },
} as const;

export const cvAppearance = {
  font: "helvetica" as keyof typeof cvFonts,
};

export const cvData = {
  en: {
    name: "Arturo Montes",
    title: "Backend & DevOps Engineer",
    summary: "Junior · Hybrid in Monterrey, Nuevo León",
    pitch: "Backend and platform engineering, with full autonomy to design and operate services in production.",
    labels: {
      phone: "Phone",
      email: "Email",
      website: "Web",
      github: "GitHub",
      location: "Location",
      skills: "Skills",
      languages: "Languages",
      certifications: "Certifications",
      experience: "Work Experience",
      projects: "Projects",
      education: "Education",
    },
    contact: {
      phone: "+52 81 2446 4219",
      email: "artumontg@gmail.com",
      website: "artumont.online",
      github: "github.com/artumont",
      location: "Nuevo León, Mexico",
    },
    skills: [
      { family: "Backend & APIs", items: "Python · FastAPI · Go · REST API Design · Distributed Systems (microservices)" },
      { family: "Data & Storage", items: "PostgreSQL · Redis · MinIO" },
      {
        family: "Infrastructure",
        items: "Docker · Kubernetes (K8s) · Terraform · Ansible · Infrastructure as Code (IaC)",
      },
      { family: "Observability", items: "Prometheus · Grafana · Loki" },
      {
        family: "CI/CD & Security",
        items: "CI/CD (continuous integration and delivery) · JWT · RBAC",
      },
    ],
    languages: [
      { name: "English", level: "C2 Proficient" },
      { name: "Spanish", level: "Native" },
    ],
    workExperience: [
      {
        company: "Servicios de Automatización e Instrumentación SA de CV",
        location: "Monterrey, Nuevo León",
        duration: "Nov 2025 - Present",
        role: "Backend & DevOps Engineer",
        highlights: [
          {
            label: "Development and Architecture",
            text: "Built SiaERP: FastAPI services covering clients, projects, quotations, invoices and payments, expenses, inventory, document workflows, and analytics, serving ~15–20 internal users.",
          },
          {
            label: "Infrastructure and DevOps",
            text: "Shipped Vault-secured Docker stacks to dev/staging/prod instrumented with Prometheus and Grafana for metrics and Loki for logs, and cut new from-scratch Proxmox LXC provisioning from ~1 hour to ~10 minutes with Terraform and Ansible.",
          },
          {
            label: "Data Management and Security",
            text: "Modeled the relational data layer as one database per service inside a single PostgreSQL instance, secured with JWT authentication and role-based access control (RBAC).",
          },
          {
            label: "Automation",
            text: "Delivered MinIO as the platform's single file store (S3-compatible), plus an end-to-end automated invoice and purchase-order workflow.",
          },
        ],
      },
    ],
    projects: [
      {
        name: "SiaERP",
        description:
          "Enterprise platform covering clients, projects, quotations, invoices and payments, expenses, inventory, document workflows, and analytics as FastAPI domain services.",
        stack:
          "Python, FastAPI, PostgreSQL, Redis, S3, Docker, Terraform, Ansible",
        duration: "Nov 2025 - Present",
        link: null,
      },
      {
        name: "EcommerceDocker",
        description:
          "REST API with Docker Compose, health checks, and Kubernetes (K8s) manifests; CI via GitHub Actions.",
        stack: "Node.js, MongoDB, Docker, Kubernetes (K8s)",
        duration: "Mar 2025",
        link: "https://github.com/artumont/EcommerceDocker",
      },
      {
        name: "ConcurrentChatSystem",
        description:
          "Real-time chat with concurrent rooms and a Phoenix Channels/WebSockets backend.",
        stack: "Elixir, Phoenix, Next.js",
        duration: "Mar 2025",
        link: "https://github.com/artumont/ConcurrentChatSystem",
      },
    ],
    education: [
      {
        institution: "Universidad Tecmilenio San Nicolás",
        location: "Monterrey, Nuevo León",
        duration: "Aug 2024 - Present (5th of 8 semesters)",
        program: "Software Development Engineering",
      },
    ],
    // Orden cronologico descendente (mas reciente primero), identico en en/es.
    certifications: [
      { issuer: "Tecmilenio", name: "Fundamentos de DevOps", date: "Jun 2026" },
      { issuer: "Tecmilenio", name: "Desarrollo Full Stack", date: "Jun 2026" },
      { issuer: "AWS Academy", name: "Cloud Operations", date: "Apr 2026" },
      { issuer: "Cisco", name: "Networking Basics", date: "Feb 2026" },
      { issuer: "Tecmilenio", name: "Bases de Datos", date: "Oct 2025" },
      { issuer: "AWS Academy", name: "Cloud Foundations", date: "Sep 2024" },
      { issuer: "Cisco", name: "Python Essentials 1", date: "Sep 2024" },
    ],
  },
  es: {
    name: "Arturo Montes",
    title: "Ingeniero Backend y DevOps",
    summary: "Junior · Híbrido en Monterrey, Nuevo León",
    pitch: "Ingeniería backend y de plataforma, con autonomía total para diseñar y operar servicios en producción.",
    labels: {
      phone: "Teléfono",
      email: "Correo",
      website: "Web",
      github: "GitHub",
      location: "Ubicación",
      skills: "Habilidades",
      languages: "Idiomas",
      certifications: "Certificaciones",
      experience: "Experiencia Laboral",
      projects: "Proyectos",
      education: "Educación",
    },
    contact: {
      phone: "+52 81 2446 4219",
      email: "artumontg@gmail.com",
      website: "artumont.online",
      github: "github.com/artumont",
      location: "Nuevo León, México",
    },
    skills: [
      { family: "Backend y APIs", items: "Python · FastAPI · Go · Diseño de APIs REST · Sistemas Distribuidos (microservicios)" },
      { family: "Datos y almacenamiento", items: "PostgreSQL · Redis · MinIO" },
      {
        family: "Infraestructura",
        items: "Docker · Kubernetes (K8s) · Terraform · Ansible · Infraestructura como Código (IaC)",
      },
      { family: "Observabilidad", items: "Prometheus · Grafana · Loki" },
      {
        family: "CI/CD y seguridad",
        items: "CI/CD (integración y entrega continuas) · JWT · RBAC",
      },
    ],
    languages: [
      { name: "Inglés", level: "C2 Competente" },
      { name: "Español", level: "Nativo" },
    ],
    workExperience: [
      {
        company: "Servicios de Automatización e Instrumentación SA de CV",
        location: "Monterrey, Nuevo León",
        duration: "Nov 2025 - Actualidad",
        role: "Ingeniero Backend y DevOps",
        highlights: [
          {
            label: "Desarrollo y Arquitectura",
            text: "Construcción de SiaERP: servicios FastAPI que cubren clientes, proyectos, cotizaciones, facturas y pagos, gastos, inventario, flujos documentales y analítica para ~15–20 usuarios internos.",
          },
          {
            label: "Infraestructura y DevOps",
            text: "Despliegue de stacks Docker asegurados con Vault en dev/staging/prod, instrumentados con Prometheus y Grafana para métricas y Loki para logs, y reducción del aprovisionamiento desde cero de LXC en Proxmox de ~1 hora a ~10 minutos con Terraform y Ansible.",
          },
          {
            label: "Datos y Seguridad",
            text: "Modelado de la capa de datos relacional como una base de datos por servicio dentro de una sola instancia de PostgreSQL, asegurada con autenticación JWT y control de acceso basado en roles (RBAC).",
          },
          {
            label: "Automatización",
            text: "Entrega de MinIO como el almacén único de archivos de la plataforma (compatible con S3), junto con el flujo automatizado de facturas y órdenes de compra de punta a punta.",
          },
        ],
      },
    ],
    projects: [
      {
        name: "SiaERP",
        description:
          "Plataforma empresarial que cubre clientes, proyectos, cotizaciones, facturas y pagos, gastos, inventario, flujos documentales y analítica como servicios FastAPI de dominio.",
        stack:
          "Python, FastAPI, PostgreSQL, Redis, S3, Docker, Terraform, Ansible",
        duration: "Nov 2025 - Actualidad",
        link: null,
      },
      {
        name: "EcommerceDocker",
        description:
          "API REST con Docker Compose, health checks y manifiestos Kubernetes (K8s); CI con GitHub Actions.",
        stack: "Node.js, MongoDB, Docker, Kubernetes (K8s)",
        duration: "Mar 2025",
        link: "https://github.com/artumont/EcommerceDocker",
      },
      {
        name: "ConcurrentChatSystem",
        description:
          "Chat en tiempo real con salas concurrentes y backend Phoenix Channels/WebSockets.",
        stack: "Elixir, Phoenix, Next.js",
        duration: "Mar 2025",
        link: "https://github.com/artumont/ConcurrentChatSystem",
      },
    ],
    education: [
      {
        institution: "Universidad Tecmilenio San Nicolás",
        location: "Monterrey, Nuevo León",
        duration: "Aug 2024 - Actualidad (5º de 8 semestres)",
        program: "Ingeniería en Desarrollo de Software",
      },
    ],
    // Orden cronologico descendente (mas reciente primero), identico en en/es.
    certifications: [
      { issuer: "Tecmilenio", name: "Fundamentos de DevOps", date: "Jun 2026" },
      { issuer: "Tecmilenio", name: "Desarrollo Full Stack", date: "Jun 2026" },
      { issuer: "AWS Academy", name: "Cloud Operations", date: "Apr 2026" },
      { issuer: "Cisco", name: "Networking Basics", date: "Feb 2026" },
      { issuer: "Tecmilenio", name: "Bases de Datos", date: "Oct 2025" },
      { issuer: "AWS Academy", name: "Cloud Foundations", date: "Sep 2024" },
      { issuer: "Cisco", name: "Python Essentials 1", date: "Sep 2024" },
    ],
  },
} as const;
