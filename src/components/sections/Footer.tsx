import { Github, Mail, Linkedin } from "lucide-react"
import { motion } from "motion/react"

export default function Footer() {
    const profileButtons = [
        { name: 'Github', icon: <Github />, href: 'https://github.com/artumont' },
        { name: 'Email', icon: <Mail />, href: 'mailto:artumontg@gmail.com' },
        { name: 'Linkedin', icon: <Linkedin />, href: 'https://www.linkedin.com/in/artumont' },
    ];

    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-primary relative">
            <div className='flex flex-col lg:flex-row relative h-full w-full px-5 pt-12 pb-6 lg:px-32 justify-center lg:justify-between'>
                <div className="flex flex-col items-center lg:items-start">
                    <h2 className="font-jetbrains text-xl lg:text-2xl">Made by <a href="https://github.com/artumont" className="hover:text-zinc-300 underline underline-offset-4 transition-colors">Artu</a> with ☕</h2>
                    <p className="text-sm font-inter mt-2">{currentYear} © All rights reserved</p>
                </div>
                <div className="flex flex-col items-center mt-5 lg:mt-0">
                    <h2 className="font-jetbrains text-xl lg:text-2xl">Socials</h2>
                    <div className='flex gap-2 mt-2'>
                        {profileButtons.map((button, index) => {
                            const opensNewTab = !button.href.startsWith('mailto:');
                            return (
                            <motion.a
                                key={index}
                                href={button.href}
                                {...(opensNewTab
                                    ? ({ target: '_blank', rel: 'noopener noreferrer' } as const)
                                    : {})}
                                aria-label={button.name}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.02 }}
                                className='rounded-full p-2 bg-black/80 mr-1'
                            >
                                {button.icon}
                            </motion.a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    )
}
