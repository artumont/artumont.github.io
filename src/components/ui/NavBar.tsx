'use client'

export default function NavBar() {
    return (
        <nav className="flex w-screen justify-between items-center p-4 pr-32 pl-32 text-white fixed font-inert z-50">
            <div className="container w-auto">
                <h1 className="text-2xl font-jetbrains font-bold">Artu</h1>
            </div>
            <div className="container w-auto">
                <ul className="flex text-lg space-x-10 justify-end font-normal">
                    <li>
                        <a href="#home">Home</a>
                    </li>
                    <li>
                        <a href="#about">About</a>
                    </li>
                    <li>
                        <a href="#projects">Projects</a>
                    </li>
                    <li>
                        <a href="#contact">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}