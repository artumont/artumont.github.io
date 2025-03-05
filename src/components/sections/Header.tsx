import TerminalText from '../ui/TerminalText';

export default function Header() {
    return (
        <section className="w-full h-[100vh] home">
            {/* Background design */}
            <div className="container relative">
                <div className="fixed top-0 right-0 w-full h-screen pointer-events-none z-0 overflow-hidden">
                    <div className="absolute left-0 top-0 h-full w-1/4 transform -skew-x-12 bg-accent/10"></div>
                    <div className="absolute right-0 top-0 h-full w-1/4 transform skew-x-12 bg-accent/10"></div>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col items-center justify-center h-full">
                <div className='text-center w-auto max-w-3xl mx-auto'>    
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3 tracking-tight relative">
                        Fullstack Developer
                    </h1>
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gradient font-jetbrains">
                        Linux Enthusiast   
                    </h2>
                    <TerminalText
                        text="I'm a full stack developer with a passion for back-end development and computer vision projects." 
                        className="text-xl lg:max-w-[100%] mt-2 font-jetbrains text-center mx-auto" 
                        delay={40}
                    />
                </div>
            </div>
        </section>
    );
}
