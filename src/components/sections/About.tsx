import { motion } from 'motion/react'
import Image from 'next/image';

export default function About() {

    const frontendTechstack = [
        { name: 'Next.js', class: 'brightness-100 invert', logo: '/logos/nextjs.svg' },
        { name: 'TypeScript', class: 'brightness-100 invert', logo: '/logos/typescript.svg' },
        { name: 'Javascript', class: 'brightness-100 invert', logo: '/logos/javascript.svg' },
        { name: 'TailwindCSS', class: 'brightness-100 invert', logo: '/logos/tailwindcss.svg' },
    ];

    const backendTechstack = [
        { name: 'Springboot', class: 'brightness-100 invert', logo: '/logos/springboot.svg' },
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

    return (
        <section className="w-full h-[100vh]" id='about'>
            {/* Content & Background */}
            <div className='relative min-h-screen w-full bg-primary px-22 pt-8 lg:px-32 lg:pt-12'>
                {/* Techstack */}
                <div className='flex flex-col w-full justify-center'>
                    {/* Frontend */}
                    <div className='flex flex-col mb-5'>
                        <h1 className='w-full text-center lg:text-start text-xl lg:text-2xl underline underline-offset-8 font-inter'>Frontend Techstack</h1>
                        <div className='flex flex-wrap justify-center lg:justify-normal gap-2 mt-5'>
                            {frontendTechstack.map((tech, index) => (
                                <div key={index} className={`flex flex-row items-center justify-center gap-1 p-2 rounded-md bg-secondary`}>
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

                    {/* Backend */}
                    <div className='flex flex-col mb-5'>
                        <h1 className='w-full text-center lg:text-start text-xl lg:text-2xl underline underline-offset-8 font-inter'>Backend Techstack</h1>
                        <div className='flex flex-wrap justify-center lg:justify-normal gap-2 mt-5'>
                            {backendTechstack.map((tech, index) => (
                                <div key={index} className={`flex flex-row items-center justify-center gap-1 p-2 rounded-md bg-secondary`}>
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
                    
                    {/* Plataform */}
                    <div className='flex flex-col mb-5'>
                        <h1 className='w-full text-center lg:text-start text-xl lg:text-2xl underline underline-offset-8 font-inter'>Plataform Techstack</h1>
                        <div className='flex flex-wrap justify-center lg:justify-normal gap-2 mt-5'>
                            {plataformStack.map((tech, index) => (
                                <div key={index} className={`flex flex-row items-center justify-center gap-1 p-2 rounded-md bg-secondary`}>
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
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/40 to-transparent"></div>
        </section>
    );
}