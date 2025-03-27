import { motion } from 'motion/react'
import { Server, Github, Mail, PanelsTopLeft, Cloud, Code2, Sparkles, Linkedin } from 'lucide-react'
import Image from 'next/image';

export default function About() {

    const frontendTechstack = [
        { name: 'Next.js', class: 'brightness-100 invert', logo: '/logos/nextjs.svg' },
        { name: 'Angular', class: 'brightness-100 invert', logo: '/logos/angular.svg' },
        { name: 'TailwindCSS', class: 'brightness-100 invert', logo: '/logos/tailwindcss.svg' },
    ];

    const backendTechstack = [
        { name: 'Springboot', class: 'brightness-100 invert', logo: '/logos/springboot.svg' },
        { name: 'Phoenix' , class: 'brightness-100 invert', logo: '/logos/phoenix.svg' },
        { name: 'Fastapi', class: 'brightness-100 invert', logo: '/logos/fastapi.svg' },
        { name: 'Flask', class: 'brightness-100 invert', logo: '/logos/flask.svg' },
        { name: 'ExpressJS', class: 'brightness-100 invert', logo: '/logos/express.svg' },
        { name: 'MySQL', class: 'brightness-100 invert', logo: '/logos/mysql.svg' },
        { name: 'SQLite', class: 'brightness-100 invert', logo: '/logos/sqlite.svg' },
        { name: 'PostgreSQL', class: 'brightness-100 invert', logo: '/logos/postgresql.svg' },
        { name: 'Supabase', class: 'brightness-100 invert', logo: '/logos/supabase.svg' },
        { name: 'MongoDB', class: 'brightness-100 invert', logo: '/logos/mongodb.svg' },
    ];

    const plataformStack = [
        { name: 'Github', class: 'brightness-100 invert', logo: '/logos/github.svg' },
        { name: 'Github Actions', class: 'brightness-100 invert', logo: '/logos/githubactions.svg' },
        { name: 'Vercel', class: 'brightness-100 invert', logo: '/logos/vercel.svg' },
        { name: 'Render', class: 'brightness-100 invert', logo: '/logos/render.svg' },
        { name: 'AWS', class: 'brightness-100 invert', logo: '/logos/aws.svg' },
        { name: 'Cloudflare Pages', class: 'brightness-100 invert', logo: '/logos/cloudflarepages.svg' },
        { name: 'Docker', class: 'brightness-100 invert', logo: '/logos/docker.svg' },
        { name: 'Kubernetes', class: 'brightness-100 invert', logo: '/logos/kubernetes.svg' },
    ];

    const languageStack = [
        { name: 'C', class: 'brightness-100 invert', logo: '/logos/c.svg' },
        { name: 'C#', class: 'brightness-100 invert', logo: '/logos/cs.svg' },
        { name: 'C++', class: 'brightness-100 invert', logo: '/logos/cpp.svg' },
        { name: 'Java', class: 'brightness-100 invert', logo: '/logos/java.svg' },
        { name: 'Elixir', class: 'brightness-100 invert', logo: '/logos/elixir.svg' },
        { name: 'Python', class: 'brightness-100 invert', logo: '/logos/python.svg' },
        { name: 'JavaScript', class: 'brightness-100 invert', logo: '/logos/javascript.svg' },
        { name: 'TypeScript', class: 'brightness-100 invert', logo: '/logos/typescript.svg' },
        { name: 'SQL', class: 'brightness-100 invert', logo: '/logos/sql.svg' },
    ];

    const profileButtons = [
        { name: 'Github', icon: <Github />, href: 'https://github.com/artumont' },
        { name: 'Email', icon: <Mail />, href: 'mailto:artumont@gmail.com' },
        { name: 'Linkedin', icon: <Linkedin />, href: 'https://www.linkedin.com/in/artumont' },
    ];

    const myTraits = [
        { name: 'Problem Solver'},
        { name: 'Team Player'},
        { name: 'Self Learner'},
        { name: 'Detail-Oriented'},
        { name: 'Passionate'},
    ];

    return (
        <section className="w-full bg-primary" id='about'>
            {/* Content & Background */}
            <div className='relative h-full w-full bg-primary px-5 py-12 lg:px-32'>
                <div className='container'>
                    <h1 className='text-4xl font-jetbrains mb-1'> About Me </h1>
                    <div className='h-1 w-40 bg-gradient-to-r from-accent to-accent/30'></div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8}}  
                    className='flex flex-col lg:flex-row min-h-[100%] justify-center lg:justify-between'
                >
                    {/* Profile */}
                    <div className='flex flex-col lg:max-w-[50%] bg-secondary mt-10 rounded-lg p-5 mx-5 lg:mx-0 lg:mr-5'>
                        <div className='flex flex-col lg:flex-row items-center lg:mb-3'>
                            <Image 
                                src='https://avatars.githubusercontent.com/u/197291181?v=4'
                                alt='Artu'
                                width={190}
                                height={190}
                                className='rounded-full border-4 border-accent/50 mb-2 lg:mb-0'
                            />
                            <div className='flex text-center lg:text-start flex-col lg:ml-5'>
                                <h1 className='text-2xl font-jetbrains'> Artu (@artumont) </h1>
                                <h2 className='text-lg font-jetbrains'> Fullstack Developer </h2>
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
                            <p className='text-md font-jetbrains text-accent text-center lg:text-start'>
                                I mainly specialize in backend development, but I also have experience in frontend development and cloud infrastructure. I have worked on a variety of projects, from web applications to REST APIs and even some computer vision stuff.
                            </p>
                        </div>
                        <div className='flex flex-col mt-2'>
                            {myTraits.map((trait, index) => (
                                <div key={index} className='rounded-lg bg-terciary p-2 text-center gap-1 m-1'>
                                    <span className='text-sm font-inter font-medium'>{trait.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Techstack */}
                    <div className='flex flex-col min-w-[47%] bg-secondary mt-10 rounded-lg p-5 items-center mx-5 lg:mx-0'>
                        <h1 className='text-xl font-jetbrains mb-1 text-center'>Technical Expertise</h1>
                        <div className='h-1 w-32 lg:w-40 bg-gradient-to-r from-accent/50 to-accent/30'></div>
                        <div className='flex flex-col h-full w-full mt-6'>
                            <div className='flex flex-col items-center lg:items-start'>
                                <div className='flex flex-row'>
                                    <PanelsTopLeft />
                                    <h1 className='text-lg font-jetbrains mb-1 ml-2'>Frontend</h1>
                                </div>
                                <div className='flex flex-wrap justify-center lg:justify-normal gap-2 mt-1'>
                                    {frontendTechstack.map((tech, index) => (
                                        <div key={index} className={`flex flex-row items-center justify-center gap-1 p-2 rounded-lg bg-terciary`}>
                                            <Image
                                                src={tech.logo}
                                                alt={tech.name}
                                                className={`filter ${tech.class}`}
                                                width={18}
                                                height={18}
                                            />
                                            <span className='ml-1 text-sm font-inter'>{tech.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='flex flex-col mt-6 items-center lg:items-start'>
                                <div className='flex flex-row'>
                                    <Server />
                                    <h1 className='text-lg font-jetbrains mb-1 ml-2'>Backend</h1>
                                </div>
                                <div className='flex flex-wrap justify-center lg:justify-normal gap-2 mt-1'>
                                    {backendTechstack.map((tech, index) => (
                                        <div key={index} className={`flex flex-row items-center justify-center gap-1 p-2 rounded-lg bg-terciary`}>
                                            <Image
                                                src={tech.logo}
                                                alt={tech.name}
                                                className={`filter ${tech.class}`}
                                                width={18}
                                                height={18}
                                            />
                                            <span className='ml-1 text-sm font-inter'>{tech.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='flex flex-col mt-6 items-center lg:items-start'>
                                <div className='flex flex-row'>
                                    <Cloud />
                                    <h1 className='text-lg font-jetbrains mb-1 ml-2'>Platform & DevOps</h1>
                                </div>
                                <div className='flex flex-wrap justify-center lg:justify-normal gap-2 mt-1'>
                                    {plataformStack.map((tech, index) => (
                                        <div key={index} className={`flex flex-row items-center justify-center gap-1 p-2 rounded-lg bg-terciary`}>
                                            <Image
                                                src={tech.logo}
                                                alt={tech.name}
                                                className={`filter ${tech.class}`}
                                                width={18}
                                                height={18}
                                            />
                                            <span className='ml-1 text-sm font-inter'>{tech.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='flex flex-col mt-6 items-center lg:items-start'>
                                <div className='flex flex-row'>
                                    <Code2 />
                                    <h1 className='text-lg font-jetbrains mb-1 ml-2'>Languages</h1>
                                </div>
                                <div className='flex flex-wrap justify-center lg:justify-normal gap-2 mt-1'>
                                    {languageStack.map((tech, index) => (
                                        <div key={index} className={`flex flex-row items-center justify-center gap-1 p-2 rounded-lg bg-terciary`}>
                                            <Image
                                                src={tech.logo}
                                                alt={tech.name}
                                                className={`filter ${tech.class}`}
                                                width={18}
                                                height={18}
                                            />
                                            <span className='ml-1 text-sm font-inter'>{tech.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/40 to-transparent"></div>
            </div>
        </section>
    );
}