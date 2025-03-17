import { useEffect, useState } from "react";
import Loading from "../ui/Loading";
import { motion } from "motion/react";
import { Code2, Github, ExternalLink, Star } from "lucide-react";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  stargazers_count: number;
  language: string | null;
  fork: boolean;
}

export default function Projects() {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const excludeRepos = ['artumont', 'artumont.github.io'];

    useEffect(() => {
        const getRepos = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('https://api.github.com/users/artumont/repos');

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const data = await response.json();

                const filteredRepos = data
                    .filter((repo: GitHubRepo) => !repo.fork)
                    .sort((a: GitHubRepo, b: GitHubRepo) => 
                        b.stargazers_count - a.stargazers_count)
                    .filter((repo: GitHubRepo) => !excludeRepos.includes(repo.name));
                
                setRepos(filteredRepos);
                setError(null);
            } catch (err) {
                console.error('Error fetching repos:', err);
                setError('Failed to load projects. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        
        getRepos();
    }, []);

    let projectContents;
    
    if (isLoading) {
        projectContents = <Loading />;
    } else if (error) {
        projectContents = <div className="text-red-500 p-4">{error}</div>;
    } else if (repos.length === 0) {
        projectContents = <div className="text-center p-4">No projects found</div>;
    } else {
        projectContents = (
            <div className="flex flex-wrap justify-center">
                {repos.map(repo => (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        key={repo.id}
                        className="w-full lg:w-[31%] mb-6 bg-secondary rounded-lg p-5 lg:m-4 flex flex-col"
                    >
                        <div className="flex-grow">
                            <h3 className="text-xl font-jetbrains mb-3">{repo.name}</h3>
                            <p className="text-accent mb-4 font-inter">
                                {repo.description || 'No description provided.'}
                            </p>
                            
                            <div className="flex">
                                {repo.language && (
                                    <div className="flex items-center gap-2 mb-3">
                                        <Code2 size={16} className="text-accent" />
                                        <span className="text-sm font-inter">{repo.language}</span>
                                    </div>
                                )}
                                <div className="flex mx-4 items-center gap-2 mb-3">
                                    <Star size={16} className="text-accent" />
                                    <span className="text-sm font-inter">{repo.stargazers_count}</span>
                                </div>
                            </div>
                            
                            {repo.topics && repo.topics.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {repo.topics.map(topic => (
                                        <span key={topic} 
                                            className="bg-terciary text-sm px-3 py-1 rounded-lg font-inter">
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        <div className="flex gap-3 mt-auto">
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-black/80 px-3 py-2 rounded-lg hover:bg-black/60 transition-colors"
                            >
                                <Github size={16} />
                                <span className="font-inter text-sm">GitHub</span>
                            </motion.a>
                            {repo.homepage && (
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href={repo.homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-black/80 px-3 py-2 rounded-lg hover:bg-black/60 transition-colors"
                                >
                                    <ExternalLink size={16} />
                                    <span className="font-inter text-sm">Live Site</span>
                                </motion.a>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        );
    }

    return (
        <section className="w-full" id="projects">
            {/* Content & Background */}
            <div className='relative h-full w-full bg-primary px-5 py-12 lg:px-32'>
                <div className='container mb-10'>
                    <h1 className='text-4xl font-jetbrains mb-1'> Projects </h1>
                    <div className='h-1 w-40 bg-gradient-to-r from-accent to-accent/30'></div>
                </div>
                <div className='flex flex-col lg:flex-row min-h-[100%] justify-center lg:justify-between'>
                    {projectContents}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/40 to-transparent"></div>
            </div>
        </section>
    );
}