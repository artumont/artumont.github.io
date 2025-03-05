'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        
        checkMobile()
        window.addEventListener('resize', checkMobile)
        
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return isMobile
}

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false)

    const menuVariants = {
        hidden: { opacity: 0, x: "100%", scale: 0.95 },
        visible: { 
            opacity: 1, 
            x: 0, 
            scale: 1,
            transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
            }
        },
        exit: { 
            opacity: 0, 
            x: "100%", 
            scale: 0.95,
            transition: {
                duration: 0.2,
                ease: [0.4, 0, 1, 1]
            }
        }
    }

    const DesktopMenu = () => (
        <motion.ul 
            className="flex text-lg space-x-10 justify-end font-normal"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {['home', 'about', 'projects', 'contact'].map((item) => (
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
        </motion.ul>
    )

    const MobileMenu = () => (
        <>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-2xl p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
            >
                    <motion.div
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
            
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 0.2,
                                ease: "easeInOut"
                            }}
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            className="fixed top-16 right-0 h-screen w-screen backdrop-blur-sm p-6 shadow-xl"
                            variants={menuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <motion.ul 
                                className="flex flex-col space-y-6 text-lg"
                                initial="closed"
                                animate="open"
                                variants={{
                                    open: {
                                        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                                    },
                                    closed: {
                                        transition: { staggerChildren: 0.05, staggerDirection: -1 }
                                    }
                                }}
                            >
                                {['home', 'about', 'projects', 'contact'].map((item) => (
                                    <motion.li
                                        key={item}
                            variants={{
                                open: { 
                                    x: 0, 
                                    opacity: 1,
                                    scale: 1,
                                    transition: {
                                        duration: 0.3,
                                        ease: [0.4, 0, 0.2, 1]
                                    }
                                },
                                closed: { 
                                    x: 50, 
                                    opacity: 0,
                                    scale: 0.95
                                }
                            }}
                                    >
                                        <a 
                                            href={`#${item}`}
                                            onClick={() => setIsOpen(false)}
                                            className="block py-2 hover:text-zinc-300 transition-colors capitalize"
                                        >
                                            {item}
                                        </a>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )

    return (
        <motion.nav 
            className="fixed inset-x-0 top-0 flex justify-between items-center px-6 md:px-32 py-4 text-white font-inert z-50"
            role="navigation"
            aria-label="Main navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-2xl font-jetbrains font-bold cursor-pointer hover:text-zinc-300 transition-colors">
                <a href="#home">Artu</a>
            </h1>
            {useIsMobile() ? <MobileMenu /> : <DesktopMenu />}
        </motion.nav>
    )
}
