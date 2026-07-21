import { motion } from "motion/react";
import { Github, ExternalLink } from "lucide-react";

const projects = [
    {
        name: 'SiaERP',
        description: 'Enterprise ERP covering clients, projects, quotations, invoices and payments, expenses, inventory, document generation, and analytics through 7 domain microservices.',
        why: 'Built to replace fragmented operational workflows at Saisa. Redis events, database-per-service isolation, and a custom Proxmox-aware orchestrator support independent deployments and rollback.',
        stack: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'MinIO', 'GitHub Actions'],
        github: null,
        link: null,
        blog: null,
    },
    {
        name: 'agent-smith.nvim',
        description: 'Neovim AI agent with bounded visual edits, multi-file changes with approval, semantic search, and sandboxed Vibe sessions.',
        why: 'Created to have full control over AI-assisted coding inside Neovim without relying on external GUI tools.',
        stack: ['Lua', 'Neovim', 'AI Integration'],
        github: 'https://github.com/artumont/agent-smith.nvim',
        link: null,
        blog: null,
    },
    {
        name: 'GitHotswap',
        description: 'CLI tool to switch between Git user profiles without editing .gitconfig manually. Perfect for managing work/personal identities.',
        why: 'Tired of manually editing .gitconfig every time I switched between work and personal repos.',
        stack: ['Go', 'Git', 'CLI'],
        github: 'https://github.com/artumont/GitHotswap',
        link: null,
        blog: null,
    },
    {
        name: 'EcommerceDocker',
        description: 'E-commerce API with Docker containerization and Kubernetes load balancing. Includes CI/CD with GitHub Actions.',
        why: 'Learning project to understand container orchestration, K8s deployments, and CI/CD pipelines.',
        stack: ['Node.js', 'MongoDB', 'Docker', 'Kubernetes', 'GitHub Actions'],
        github: 'https://github.com/artumont/EcommerceDocker',
        link: null,
        blog: null,
    },
    {
        name: 'ConcurrentChatSystem',
        description: 'Real-time chat system with concurrent rooms using Phoenix WebSockets and Next.js frontend.',
        why: 'Practice Elixir\'s actor model and real-time capabilities with a familiar use case.',
        stack: ['Elixir', 'Phoenix', 'Next.js', 'WebSockets'],
        github: 'https://github.com/artumont/ConcurrentChatSystem',
        link: null,
        blog: null,
    },
    {
        name: 'DotSlashStream',
        description: 'Torrent-based media streaming platform with support for multiple indexer sites. Monorepo architecture.',
        why: 'Challenge building a complex streaming system with multiple services and storage layers.',
        stack: ['Go', 'Redis', 'PostgreSQL', 'MinIO'],
        github: 'https://github.com/artumont/dotslashstream',
        link: null,
        blog: null,
    },
    {
        name: 'remote-wol-esp32',
        description: 'Low-power remote Wake-on-LAN system using ESP32-C6. Runs on USB residual power with Tauri mobile controller.',
        why: 'Wanted to wake my PC remotely without keeping it fully powered. IoT meets practical utility.',
        stack: ['C', 'ESP-IDF', 'Rust', 'Tauri', 'React'],
        github: 'https://github.com/artumont/remote-wol-esp32',
        link: null,
        blog: null,
    },
    {
        name: 'zed-workspaces',
        description: 'Lightweight CLI tool to add VS Code-style .code-workspace support to the Zed editor.',
        why: 'Zed lacked workspace support I relied on. Built the tool I needed.',
        stack: ['TypeScript', 'CLI'],
        github: 'https://github.com/artumont/zed-workspaces',
        link: null,
        blog: null,
    },
];

export default function Projects() {
    return (
        <section className="w-full" id="projects">
            <div className='relative h-full w-full bg-primary px-5 py-12 lg:px-32'>
                <div className='container mb-10'>
                    <h1 className='text-4xl font-jetbrains mb-1'> Projects </h1>
                    <div className='h-1 w-40 bg-gradient-to-r from-accent to-accent/30'></div>
                </div>

                <div className="flex flex-wrap justify-center min-w-full">
                    {projects.map((project, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            key={project.name}
                            className="flex flex-col w-full lg:w-[31%] mb-6 bg-secondary rounded-lg p-5 lg:m-2"
                        >
                            <div className="flex-grow">
                                <h3 className="text-xl font-jetbrains mb-3">{project.name}</h3>
                                <p className="text-accent mb-3 font-inter text-sm">{project.description}</p>
                                <p className="text-accent/70 mb-4 font-inter text-xs italic">{project.why}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.stack.map(tech => (
                                        <span key={tech} className="bg-terciary text-xs px-2 py-1 rounded-lg font-inter">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 mt-auto">
                                {project.github && (
                                    <motion.a
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-black/80 px-3 py-2 rounded-lg hover:bg-black/60 transition-colors"
                                    >
                                        <Github size={16} />
                                        <span className="font-inter text-sm">GitHub</span>
                                    </motion.a>
                                )}
                                {project.link && (
                                    <motion.a
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-black/80 px-3 py-2 rounded-lg hover:bg-black/60 transition-colors"
                                    >
                                        <ExternalLink size={16} />
                                        <span className="font-inter text-sm">Live</span>
                                    </motion.a>
                                )}
                                {project.blog && (
                                    <motion.a
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        href={project.blog}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-black/80 px-3 py-2 rounded-lg hover:bg-black/60 transition-colors"
                                    >
                                        <span className="font-inter text-sm">Blog</span>
                                    </motion.a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/40 to-transparent"></div>
            </div>
        </section>
    );
}
