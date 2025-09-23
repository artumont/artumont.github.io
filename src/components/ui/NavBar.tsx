'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return isMobile
}

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const isMobile = useIsMobile()

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20
            if (!isMobile) {
                setScrolled(prev => prev !== isScrolled ? isScrolled : prev)
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [isMobile])

    useEffect(() => {
        if (!isMobile && isOpen) {
            setIsOpen(false)
        }
    }, [isMobile, isOpen])

    const menuVariants = {
        hidden: { opacity: 0, x: "100%", scale: 0.95 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1
        },
        exit: {
            opacity: 0,
            x: "100%",
            scale: 0.95
        }
    }

    const DesktopMenu = () => (
        <ul
            className="flex text-lg space-x-10 justify-end font-normal"
        >
            {['home', 'about', 'projects'].map((item) => (
                <li key={item}>
                    <a
                        href={`#${item}`}
                        className="relative py-2 group transition-colors hover:text-zinc-300"
                    >
                        <span className="capitalize">{item}</span>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                    </a>
                </li>
            ))}
        </ul>
    )

    const MobileMenu = () => (
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl p-2 hover:bg-white/10 rounded-lg transition-colors z-50 relative"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
        >
            <motion.div
                key="menu-icon"
                animate={{
                    rotate: isOpen ? 180 : 0,
                    scale: isOpen ? 1.1 : 1
                }}
                transition={{
                    duration: 0.2,
                    ease: "easeInOut"
                }}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
        </button>
    )

    const MobileDropdown = () => (
        <div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="w-full h-full p-3"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={menuVariants}
                        role="menu"
                        aria-label="Mobile navigation menu"
                    >
                        <ul className="flex flex-col space-y-4 text-lg font-normal">
                            {['home', 'about', 'projects'].map((item) => (
                                <li key={item}>
                                    <a
                                        href={`#${item}`}
                                        className="block py-2 px-4 rounded hover:bg-white/10 transition-colors"
                                        onClick={() => setIsOpen(false)}
                                        role="menuitem"
                                    >
                                        <span className="capitalize">{item}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )

    const shouldShowBackdrop = isMobile || (!isMobile && scrolled)

    return (
        <nav
            className={`fixed inset-x-0 top-0 justify-between items-center px-6 md:px-26 lg:px-32 py-4 text-white font-inert z-50 transition-all duration-300 ${shouldShowBackdrop ? 'bg-primary/50 backdrop-blur-md shadow-lg' : ''}`}
            role="navigation"
            aria-label="Main navigation"
        >
            <div className='w-full h-full flex justify-between'>
                <h1 className="text-2xl font-jetbrains font-bold cursor-pointer hover:text-zinc-300 transition-colors">
                    <a href="#home">Artu</a>
                </h1>
                {isMobile ? <MobileMenu /> : <DesktopMenu />}
            </div>
            {isMobile && <MobileDropdown />}
        </nav>
    )
}
