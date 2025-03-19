import { Heart, Github, Mail, Linkedin } from "lucide-react"
import { motion } from "motion/react"

export default function Footer() {
    const profileButtons = [
        { name: 'Github', icon: <Github />, href: 'https://github.com/artumont' },
        { name: 'Email', icon: <Mail />, href: 'mailto:artumont@gmail.com' },
        { name: 'Linkedin', icon: <Linkedin />, href: 'https://www.linkedin.com/in/artumont' },
    ];

    return (
        <footer className="w-full bg-primary relative">
            <div className='flex flex-col lg:flex-row relative h-full w-full px-5 pt-12 pb-6 lg:px-32 justify-center lg:justify-between'>
                <div className="flex flex-col items-center lg:items-start">
                    <h1 className="font-jetbrains text-xl lg:text-2xl">Made by <a href="https://github.com/artumont" className="hover:text-zinc-300 underline underline-offset-4 transition-colors">Artu</a> with ☕</h1>
                    <p className="text-sm font-inter mt-2">2025 © All rights reserved</p>
                </div>
                <div className="flex flex-col items-center mt-5 lg:mt-0">
                    <h1 className="font-jetbrains text-xl lg:text-2xl">Socials</h1>
                    <div className='flex gap-2 mt-2'>
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
        </footer>
    )
}