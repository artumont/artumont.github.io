export type CvLanguage = 'en' | 'es';

export const cvFonts = {
  helvetica: {
    family: 'Helvetica',
    sources: [],
  },
  monaspaceNeon: {
    family: 'Monaspace Neon',
    sources: [
      { src: '/fonts/cv/MonaspaceNeon-Regular.ttf', fontWeight: 400 as const, fontStyle: 'normal' as const },
      { src: '/fonts/cv/MonaspaceNeon-Bold.ttf', fontWeight: 700 as const, fontStyle: 'normal' as const },
      { src: '/fonts/cv/MonaspaceNeon-Italic.ttf', fontWeight: 400 as const, fontStyle: 'italic' as const },
      { src: '/fonts/cv/MonaspaceNeon-BoldItalic.ttf', fontWeight: 700 as const, fontStyle: 'italic' as const },
    ],
  },
} as const;

export const cvAppearance = {
  font: 'helvetica' as keyof typeof cvFonts,
  watermark: {
    enabled: true,
    quotes: [
      { text: 'Follow the white rabbit.', icon: '/icons/cv/rabbit.png' },
      { text: 'There is no spoon.', icon: '/icons/cv/utensils.png' },
      { text: 'Free your mind.', icon: '/icons/cv/eye.png' },
      { text: 'Wake up, Neo.', icon: '/icons/cv/power.png' },
      { text: 'The Matrix has you.', icon: '/icons/cv/binary.png' },
      { text: 'Know thyself.', icon: '/icons/cv/scan-face.png' },
      { text: 'Everything that has a beginning has an end.', icon: '/icons/cv/refresh-cw.png' },
    ],
  },
};

export const cvData = {
  en: {
    name: 'Arturo Montes',
    title: 'Backend & DevOps Engineer',
    labels: {
      phone: 'Phone', email: 'Email', website: 'Web', location: 'Location',
      skills: 'Skills', languages: 'Languages', certifications: 'Certifications',
      experience: 'Work Experience', projects: 'Projects', education: 'Education',
    },
    contact: {
      phone: '+52 81 2446 4219',
      email: 'artumontg@gmail.com',
      website: 'artumont.online',
      location: 'Nuevo León, Mexico',
    },
    skills: [
      'Backend Development', 'DevOps & Infrastructure', 'Distributed Systems',
      'Database Management', 'CI/CD Pipelines', 'Container Orchestration',
      'Object-Oriented Programming', 'REST API Design',
    ],
    languages: [
      { name: 'English', level: 'C2 Proficient' },
      { name: 'Spanish', level: 'Native' },
    ],
    workExperience: [{
      company: 'Servicios de Automatización e Instrumentación SA de CV',
      location: 'Monterrey, Nuevo León',
      duration: 'Nov 2025 - Present',
      role: 'Backend & DevOps Engineer',
      highlights: [
        { label: 'Development and Architecture', text: 'Designed the core architecture of SiaERP, covering clients, projects, quotations, invoices and payments, expenses, inventory, document workflows, and analytics through independent FastAPI services.' },
        { label: 'Infrastructure and DevOps', text: 'Led deployment orchestration using Docker and Nginx, implementing CI/CD pipelines with GitHub Actions and Bash scripts to ensure parity between development and production environments.' },
        { label: 'Data Management and Security', text: 'Modeled complex relational databases in PostgreSQL and secured the platform using JWT authentication and role-based access control (RBAC).' },
        { label: 'Automation', text: 'Optimized critical workflows through automated document generation for invoices and purchase orders, plus MinIO storage management.' },
      ],
    }],
    projects: [
      { name: 'SiaERP', description: 'Enterprise platform for client and project management, quotations, invoices and payments, expenses, inventory, document generation, and analytics. Seven domain microservices communicate through Redis events and deploy independently through Docker-based CI/CD.', stack: 'Python, FastAPI, PostgreSQL, Redis, MinIO, Docker', duration: 'Nov 2025 - Present', link: null },
      { name: 'GitHotswap', description: 'CLI for creating, editing, listing, and switching Git identities without manually modifying .gitconfig. Built to keep work and personal profiles isolated.', stack: 'Go, CLI', duration: 'Mar 2025 - Apr 2025', link: 'https://github.com/artumont/GitHotswap' },
      { name: 'ConcurrentChatSystem', description: 'Real-time chat application with concurrent rooms, a Phoenix Channels/WebSockets backend, and a Next.js client. Created to explore Elixir concurrency and its actor model.', stack: 'Elixir, Phoenix, Next.js', duration: 'Mar 2025', link: 'https://github.com/artumont/ConcurrentChatSystem' },
      { name: 'EcommerceDocker', description: 'REST API with MongoDB, Docker Compose, health checks, and Kubernetes manifests for scaling and load balancing. GitHub Actions automates image builds.', stack: 'Node.js, MongoDB, Docker, Kubernetes', duration: 'Mar 2025', link: 'https://github.com/artumont/EcommerceDocker' },
      { name: 'DotSlashStream', description: 'Torrent media streaming platform supporting multiple indexers, with a Go API, Redis queues, PostgreSQL metadata, and MinIO object storage.', stack: 'Go, Redis, PostgreSQL, MinIO', duration: 'Jul 2025 - Present', link: 'https://github.com/artumont/dotslashstream' },
      { name: 'agent-smith.nvim', description: 'Neovim AI agent with bounded edits, multi-file approval, semantic search, provider adapters, and sandboxed sessions. Built for explicit control over AI-assisted coding.', stack: 'Lua, Neovim, AI CLI providers', duration: 'Jul 2025 - Present', link: 'https://github.com/artumont/agent-smith.nvim' },
    ],
    education: [{
      institution: 'Universidad Tecmilenio San Nicolás', location: 'Monterrey, Nuevo León',
      duration: 'Aug 2024 - Present', program: 'Software Development Engineering',
    }],
    certifications: [
      'AWS Academy Graduate - Cloud Foundations',
      'AWS Academy Graduate - Cloud Operations',
      'Cisco Python Essentials 1',
      'Tecmilenio DevOps Fundamentals',
    ],
  },
  es: {
    name: 'Arturo Montes',
    title: 'Ingeniero Backend y DevOps',
    labels: {
      phone: 'Teléfono', email: 'Correo', website: 'Web', location: 'Ubicación',
      skills: 'Habilidades', languages: 'Idiomas', certifications: 'Certificaciones',
      experience: 'Experiencia Laboral', projects: 'Proyectos', education: 'Educación',
    },
    contact: {
      phone: '+52 81 2446 4219',
      email: 'artumontg@gmail.com',
      website: 'artumont.online',
      location: 'Nuevo León, México',
    },
    skills: [
      'Desarrollo Backend', 'DevOps e Infraestructura', 'Sistemas Distribuidos',
      'Gestión de Bases de Datos', 'Pipelines CI/CD', 'Orquestación de Contenedores',
      'Programación Orientada a Objetos', 'Diseño de APIs REST',
    ],
    languages: [
      { name: 'Inglés', level: 'C2 Competente' },
      { name: 'Español', level: 'Nativo' },
    ],
    workExperience: [{
      company: 'Servicios de Automatización e Instrumentación SA de CV',
      location: 'Monterrey, Nuevo León',
      duration: 'Nov 2025 - Actualidad',
      role: 'Ingeniero Backend y DevOps',
      highlights: [
        { label: 'Desarrollo y Arquitectura', text: 'Diseñé arquitectura central de SiaERP, abarcando clientes, proyectos, cotizaciones, facturas y pagos, gastos, inventario, flujos documentales y analítica mediante servicios FastAPI independientes.' },
        { label: 'Infraestructura y DevOps', text: 'Lideré orquestación de despliegues con Docker y Nginx, implementando pipelines CI/CD con GitHub Actions y scripts Bash para asegurar paridad entre desarrollo y producción.' },
        { label: 'Datos y Seguridad', text: 'Modelé bases de datos relacionales complejas en PostgreSQL y aseguré plataforma usando autenticación JWT y control de acceso basado en roles (RBAC).' },
        { label: 'Automatización', text: 'Optimicé flujos operativos críticos mediante generación automática de facturas y órdenes de compra, además de gestión de almacenamiento con MinIO.' },
      ],
    }],
    projects: [
      { name: 'SiaERP', description: 'Plataforma empresarial para gestión de clientes y proyectos, cotizaciones, facturas y pagos, gastos, inventario, generación documental y analítica. Siete microservicios de dominio se comunican mediante eventos Redis y se despliegan de forma independiente con CI/CD basado en Docker.', stack: 'Python, FastAPI, PostgreSQL, Redis, MinIO, Docker', duration: 'Nov 2025 - Actualidad', link: null },
      { name: 'GitHotswap', description: 'CLI para crear, editar, listar y cambiar identidades Git sin modificar .gitconfig manualmente. Diseñada para aislar perfiles laborales y personales.', stack: 'Go, CLI', duration: 'Mar 2025 - Abr 2025', link: 'https://github.com/artumont/GitHotswap' },
      { name: 'ConcurrentChatSystem', description: 'Aplicación de chat en tiempo real con salas concurrentes, backend Phoenix Channels/WebSockets y cliente Next.js. Creada para explorar concurrencia y modelo de actores en Elixir.', stack: 'Elixir, Phoenix, Next.js', duration: 'Mar 2025', link: 'https://github.com/artumont/ConcurrentChatSystem' },
      { name: 'EcommerceDocker', description: 'API REST con MongoDB, Docker Compose, health checks y manifiestos Kubernetes para escalado y balanceo de carga. GitHub Actions automatiza builds de imágenes.', stack: 'Node.js, MongoDB, Docker, Kubernetes', duration: 'Mar 2025', link: 'https://github.com/artumont/EcommerceDocker' },
      { name: 'DotSlashStream', description: 'Plataforma de streaming por torrents con múltiples indexadores, API en Go, colas Redis, metadatos PostgreSQL y almacenamiento de objetos en MinIO.', stack: 'Go, Redis, PostgreSQL, MinIO', duration: 'Jul 2025 - Actualidad', link: 'https://github.com/artumont/dotslashstream' },
      { name: 'agent-smith.nvim', description: 'Agente IA para Neovim con edición acotada, aprobación multiarchivo, búsqueda semántica, adaptadores de proveedores y sesiones aisladas. Creado para mantener control explícito sobre IA.', stack: 'Lua, Neovim, proveedores CLI de IA', duration: 'Jul 2025 - Actualidad', link: 'https://github.com/artumont/agent-smith.nvim' },
    ],
    education: [{
      institution: 'Universidad Tecmilenio San Nicolás', location: 'Monterrey, Nuevo León',
      duration: 'Ago 2024 - Actualidad', program: 'Ingeniería en Desarrollo de Software',
    }],
    certifications: [
      'AWS Academy Graduate - Cloud Foundations',
      'AWS Academy Graduate - Cloud Operations',
      'Cisco Python Essentials 1',
      'Fundamentos de DevOps - Tecmilenio',
    ],
  },
} as const;
