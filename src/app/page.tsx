'use client'

import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Header from "@/components/sections/Header";
import Projects from "@/components/sections/Projects";
import NavBar from "@/components/ui/NavBar";

export default function Home() {
    return (
        <main className="flex flex-col items-center w-screen min-h-screen text-white bg-primary ">
            <NavBar />
            <Header />
            <About />
            <Projects />
            <Contact />
        </main>
    );
}