import { motion } from 'motion/react'
import { Server, Github, Mail, Cloud, Code2, Linkedin } from 'lucide-react'
import Image from 'next/image';

const ICON_CLASS = 'brightness-0 invert';

// -- Profile --
const profile = {
    name: 'Artu (@artumont)',
    role: 'Backend & DevOps Engineer',
    avatar: 'https://avatars.githubusercontent.com/u/197291181?v=4',
    bio: 'I mainly specialize in backend development, but I also have experience in frontend development and cloud infrastructure. I have worked on a variety of projects, from web applications to REST APIs and even some computer vision stuff.',
};

const profileButtons = [
    { name: 'Github', icon: <Github />, href: 'https://github.com/artumont' },
    { name: 'Email', icon: <Mail />, href: 'mailto:artumontg@gmail.com' },
    { name: 'Linkedin', icon: <Linkedin />, href: 'https://www.linkedin.com/in/artumont' },
    { name: 'Leetcode', icon: <Image src={'/logos/leetcode.svg'} alt='' width={25} height={25} className={ICON_CLASS} />, href: 'https://leetcode.com/u/artumont/' }
];

const traits = [
    'Problem Solver',
    'Team Player',
    'Self Learner',
    'Detail-Oriented',
    'Passionate',
];

// -- Tech Stack --
const backendTechstack = [
    { name: 'Springboot', logo: '/logos/springboot.svg' },
    { name: 'Fastapi', logo: '/logos/fastapi.svg' },
    { name: 'Phoenix Framework', logo: '/logos/phoenix.svg' },
    { name: 'MySQL', logo: '/logos/mysql.svg' },
    { name: 'SQLite', logo: '/logos/sqlite.svg' },
    { name: 'PostgreSQL', logo: '/logos/postgresql.svg' },
    { name: 'MongoDB', logo: '/logos/mongodb.svg' },
    { name: 'Redis', logo: '/logos/redis.svg' },
    { name: 'MinIO', logo: '/logos/minio.svg' },
];

const platformStack = [
    { name: 'GitHub', logo: '/logos/github.svg' },
    { name: 'GitHub Actions', logo: '/logos/githubactions.svg' },
    { name: 'Docker', logo: '/logos/docker.svg' },
    { name: 'Kubernetes', logo: '/logos/kubernetes.svg' },
    { name: 'Nginx', logo: '/logos/nginx.svg' },
    { name: 'Linux', logo: '/logos/linux.svg' },
    { name: 'AWS', logo: '/logos/aws.svg' },
    { name: 'Vercel', logo: '/logos/vercel.svg' },
];

const languageStack = [
    { name: 'Python', logo: '/logos/python.svg' },
    { name: 'Go', logo: '/logos/go.svg' },
    { name: 'Elixir', logo: '/logos/elixir.svg' },
    { name: 'C', logo: '/logos/c.svg' },
    { name: 'C++', logo: '/logos/cpp.svg' },
    { name: 'Java', logo: '/logos/java.svg' },
    { name: 'Rust', logo: '/logos/rust.svg' },
    { name: 'TypeScript', logo: '/logos/typescript.svg' },
    { name: 'JavaScript', logo: '/logos/javascript.svg' },
    { name: 'Vue.js', logo: '/logos/vuejs.svg' },
];

// -- Work Experience --
const workExperience = [
    {
        company: 'Servicios de Automatización e Instrumentación SA de CV',
        role: 'Backend & DevOps Engineer',
        duration: 'Nov 2025 - Present',
        description: 'Building SiaERP — a microservices-based ERP platform with 7 business services, event-driven architecture (Redis pub/sub), database-per-service pattern (PostgreSQL), and a custom deployment orchestrator with Proxmox snapshot rollback. Previously designed and built the core ERP system with FastAPI, Docker/Nginx orchestration, GitHub Actions CI/CD, JWT auth with RBAC, and automated PDF generation with MinIO storage.',
        logo: '/logos/saisa.png'
    },
];

// -- Certifications --
const certifications = [
    { issuer: 'AWS Academy', name: 'Cloud Foundations', date: 'Sep 2024' },
    { issuer: 'AWS Academy', name: 'Cloud Operations', date: 'Apr 2026' },
    { issuer: 'Cisco', name: 'Python Essentials 1', date: 'Sep 2024' },
    { issuer: 'Cisco', name: 'Networking Basics', date: 'Feb 2026' },
    { issuer: 'IBM', name: 'Data Visualization with R', date: 'Dec 2024' },
    { issuer: 'Tecmilenio', name: 'Fundamentos de DevOps', date: 'Jun 2026' },
    { issuer: 'Tecmilenio', name: 'Desarrollo Full Stack', date: 'Jun 2026' },
    { issuer: 'Tecmilenio', name: 'Bases de Datos', date: 'Oct 2025' },
];

// -- Component --
export default function About() {
    const TechItem = ({ name, logo }: { name: string; logo: string }) => (
        <div className='flex flex-row items-center justify-center gap-1 p-2 rounded-lg bg-terciary'>
            <Image src={logo} alt={name} className={`filter ${ICON_CLASS}`} width={18} height={18} />
            <span className='ml-1 text-sm font-inter'>{name}</span>
        </div>
    );

    const TechSection = ({ icon, title, items }: { icon: React.ReactNode; title: string; items: { name: string; logo: string }[] }) => (
        <div className='flex flex-col items-center lg:items-start'>
            <div className='flex flex-row'>
                {icon}
                <h1 className='text-lg font-jetbrains mb-1 ml-2'>{title}</h1>
            </div>
            <div className='flex flex-wrap justify-center lg:justify-normal gap-2'>
                {items.map((tech, i) => <TechItem key={i} {...tech} />)}
            </div>
        </div>
    );

    return (
        <section className="w-full bg-primary" id='about'>
            <div className='relative h-full w-full bg-primary px-5 py-12 lg:px-32'>
                <div className='container'>
                    <h1 className='text-4xl font-jetbrains mb-1'> About Me </h1>
                    <div className='h-1 w-40 bg-gradient-to-r from-accent to-accent/30'></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className='flex flex-col lg:flex-row min-h-[100%] justify-center lg:justify-between'
                >
                    <div className='flex flex-col lg:max-w-[50%] bg-secondary mt-10 rounded-lg p-5 mx-5 lg:mx-0 lg:mr-5'>
                        <div className='flex flex-col lg:flex-row items-center lg:mb-3'>
                            <Image src={profile.avatar} alt='Artu' width={190} height={190} className='rounded-full border-4 border-accent/50 mb-2 lg:mb-0' />
                            <div className='flex text-center lg:text-start flex-col lg:ml-5'>
                                <h1 className='text-2xl font-jetbrains'> {profile.name} </h1>
                                <h2 className='text-lg font-jetbrains'> {profile.role} </h2>
                                <div className='flex flex-row mt-1 justify-center lg:justify-normal'>
                                    {profileButtons.map((button, index) => (
                                        <motion.button
                                            key={index}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            transition={{ duration: 0.02 }}
                                            className='rounded-full p-2 bg-black/80 mr-1'
                                            onClick={() => window.open(button.href, '_blank')}
                                        >
                                            {button.icon}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='pt-1'>
                            <p className='text-md font-jetbrains text-accent text-center lg:text-start'>{profile.bio}</p>
                        </div>
                        <div className='flex flex-col mt-2'>
                            {traits.map((trait, index) => (
                                <div key={index} className='rounded-lg bg-terciary p-2 text-center gap-1 m-1'>
                                    <span className='text-sm font-inter font-medium'>{trait}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='flex flex-col min-w-[47%] bg-secondary mt-10 rounded-lg p-5 items-center mx-5 lg:mx-0'>
                        <h1 className='text-xl font-jetbrains mb-1 text-center'>Technical Expertise</h1>
                        <div className='h-1 w-32 lg:w-40 bg-gradient-to-r from-accent/50 to-accent/30'></div>
                        <div className='flex flex-col h-full w-full mt-6 gap-6'>
                            <TechSection icon={<Server />} title="Backend" items={backendTechstack} />
                            <TechSection icon={<Cloud />} title="Platform & DevOps" items={platformStack} />
                            <TechSection icon={<Code2 />} title="Languages" items={languageStack} />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className='flex flex-col lg:flex-row justify-center lg:justify-between'
                >
                    <div className='flex flex-col bg-secondary mt-5 rounded-lg p-5 items-center mx-5 lg:mx-0 w-full'>
                        <h1 className='text-xl font-jetbrains mb-1 text-center'>Work Experience</h1>
                        <div className='h-1 w-32 lg:w-40 bg-gradient-to-r from-accent/50 to-accent/30'></div>
                        <div className='flex flex-col h-full w-full mt-6'>
                            {workExperience.map((work, index) => (
                                <div key={index} className='flex flex-col lg:flex-row items-center lg:items-start bg-terciary p-4 gap-1 m-1 rounded-lg'>
                                    <Image src={work.logo} alt={work.company} width={60} height={60} className='rounded-full border-4 border-accent/50 mb-2 lg:mb-0' />
                                    <div className='flex flex-col lg:ml-5 text-center lg:text-left'>
                                        <h1 className='text-lg font-jetbrains'> {work.company} </h1>
                                        <h2 className='text-md font-jetbrains text-accent'> {work.role} </h2>
                                        <h3 className='text-sm font-inter text-accent italic'> {work.duration} </h3>
                                        <p className='text-md font-inter text-accent mt-2 text-justify'> {work.description} </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className='flex flex-col lg:flex-row justify-center lg:justify-between'
                >
                    <div className='flex flex-col bg-secondary mt-5 rounded-lg p-5 items-center mx-5 lg:mx-0 w-full'>
                        <h1 className='text-xl font-jetbrains mb-1 text-center'>Certifications</h1>
                        <div className='h-1 w-32 lg:w-40 bg-gradient-to-r from-accent/50 to-accent/30'></div>
                        <div className='flex flex-wrap justify-center gap-3 mt-6'>
                            {certifications.map((cert, i) => (
                                <div key={i} className='flex flex-col bg-terciary p-3 rounded-lg min-w-[200px]'>
                                    <span className='text-sm font-jetbrains text-accent'>{cert.issuer}</span>
                                    <span className='text-sm font-inter'>{cert.name}</span>
                                    <span className='text-xs font-inter text-accent/70'>{cert.date}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/40 to-transparent"></div>
            </div>
        </section>
    );
}
