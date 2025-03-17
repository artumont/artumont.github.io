'use client'

import { motion } from "motion/react"

export default function Loading() {
    return (
        <div className='w-full h-full py-96 bg-primary flex flex-col items-center justify-center'>
            <div className="relative">
                <motion.div
                    className="w-20 h-20 border-4 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        ease: "linear" 
                    }}
                />
                <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                >
                    <div className="w-10 h-10 bg-primary border-2 border-white rounded-full"></div>
                </motion.div>
            </div>
            <motion.h1
                className="text-white font-jetbrains text-xl mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                Loading
            </motion.h1>
        </div>
    )
}