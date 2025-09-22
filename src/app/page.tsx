'use client'

import About from "@/components/sections/About";
import Header from "@/components/sections/Header";
import Projects from "@/components/sections/Projects";
import Footer from "@/components/sections/Footer";
import NavBar from "@/components/ui/NavBar";

export default function Home() {
    return (
        <main className="flex flex-col items-center w-full min-h-screen text-white bg-primary">
            <NavBar />
            <Header />
            <About />
            <Projects />
            <Footer />
        </main>
    );
}