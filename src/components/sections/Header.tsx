import TerminalText from '../ui/TerminalText';
import { motion } from 'motion/react'
import { Download } from 'lucide-react'

export default function Header() {
    return (
        <section className="w-full" id='home'>
            {/* Background design */}
            <div className="container relative">
                <div className="fixed top-0 right-0 w-full h-screen pointer-events-none z-0 overflow-hidden">
                    <div className="absolute left-0 top-0 h-full w-1/4 transform -skew-x-12 bg-accent/10"></div>
                    <div className="absolute right-0 top-0 h-full w-1/4 transform skew-x-12 bg-accent/10"></div>
                </div>
            </div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4}} 
                className="flex flex-col items-center justify-center h-screen"
            >
                <div className='text-center w-auto max-w-3xl mx-auto'>    
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-1 lg:mb-3 tracking-tight relative">
                        Backend Developer
                    </h1>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gradient font-jetbrains">
                        Linux Enthusiast
                    </h2>
                    <TerminalText
                        text="I'm a backend and distributed systems engineer with a passion for linux enviroments and computer vision projects." 
                        className="text-lg lg:text-xl lg:max-w-[100%] mt-2 font-jetbrains text-center mx-auto" 
                        delay={40}
                    />
                    <motion.a
                        href="/artumont-cv.pdf"
                        download
                        className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-accent/20 hover:bg-accent/30 
                                 text-white rounded-lg transition-all duration-300 border border-accent/50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 1.00 }}
                        transition={{ duration: 0.02 }}
                    >
                        <Download size={20} />
                        <span className="font-jetbrains">Download CV</span>
                    </motion.a>
                </div>
            </motion.div>
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-accent/40 to-transparent"></div>
        </section>
    );
}
