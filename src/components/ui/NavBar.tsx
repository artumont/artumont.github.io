'use client'

export default function NavBar() {
    return (
        <nav className="flex w-screen justify-between items-center p-4 pr-10 pl-10 text-white fixed">
            <div className="container w-auto">
                <h1 className="text-2xl">Artu</h1>
            </div>
            <div className="container w-auto">
                <ul className="flex space-x-10 justify-end">
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