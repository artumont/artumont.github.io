import { useEffect, useState, useCallback } from "react";
import Loading from "../ui/Loading";
import { motion } from "motion/react";
import { Code2, Github, ExternalLink, Star } from "lucide-react";
import Image from "next/image";

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
  social_preview_url?: string;
}

export default function Projects() {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const excludeRepos = ['artumont', 'artumont.github.io'];

    const repoImages: Record<string, string> = {
        pcbuilder: 'https://repository-images.githubusercontent.com/925452048/49639ebd-6519-4d56-9571-86391dca02c4',
        techstackbuilder: 'https://repository-images.githubusercontent.com/930977554/d7d514dc-b3a5-4dcd-a166-b50acdc64891',
        vacationmanager: 'https://repository-images.githubusercontent.com/944007151/d8e9476e-7b21-4860-acd4-a1e1ab6b1c98',
        seleniumtests: 'https://repository-images.githubusercontent.com/935142131/a163b6ac-a82f-42cb-a79a-0148f92eece6'
    };

    function buildPreviewImage(name: string) {
        return `https://opengraph.githubassets.com/1/artumont/${name}`;
    }

    const CACHE_KEY = 'github_repos_cache';
    const CACHE_EXPIRATION = 1000 * 60 * 60;

    const fetchWithRetry = async (url: string, retries = 3, delay = 1000) => {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(url);
                
                if (response.status === 403) {
                    const rateLimitReset = response.headers.get('X-RateLimit-Reset');
                    if (rateLimitReset) {
                        const waitTime = (parseInt(rateLimitReset) * 1000) - Date.now();
                        if (waitTime > 0) {
                            await new Promise(resolve => setTimeout(resolve, waitTime));
                            continue;
                        }
                    }
                }
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                return await response.json();
            } catch (error) {
                if (i === retries - 1) throw error;
                await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
            }
        }
    };

    const getRepos = useCallback(async () => {
        setIsLoading(true);
        
        try {
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                const { data, timestamp } = JSON.parse(cached);
                if (Date.now() - timestamp < CACHE_EXPIRATION) {
                    setRepos(data);
                    setError(null);
                    setIsLoading(false);
                    return;
                }
            }

            const data = await fetchWithRetry('https://api.github.com/users/artumont/repos');
            
            const filteredRepos = data
                .filter((repo: GitHubRepo) => !repo.fork)
                .sort((a: GitHubRepo, b: GitHubRepo) => 
                    b.stargazers_count - a.stargazers_count)
                .filter((repo: GitHubRepo) => !excludeRepos.includes(repo.name));

            for (const repo of filteredRepos) {
                repo.social_preview_url = repoImages[repo.name.toLowerCase()] || buildPreviewImage(repo.name);
            }

            localStorage.setItem(CACHE_KEY, JSON.stringify({
                data: filteredRepos,
                timestamp: Date.now()
            }));
            
            setRepos(filteredRepos);
            setError(null);
        } catch (err) {
            console.error('Error fetching repos:', err);
            
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                const { data } = JSON.parse(cached);
                setRepos(data);
                setError('Using cached data. Failed to fetch latest projects.');
            } else {
                setError('Failed to load projects. Please try again later.');
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        getRepos();
    }, [getRepos]);

    let projectContents;
    
    if (isLoading) {
        projectContents = <Loading />;
    } else if (error) {
        projectContents = <div className="text-red-500 p-4">{error}</div>;
    } else if (repos.length === 0) {
        projectContents = <div className="text-center p-4">No projects found</div>;
    } else {
        projectContents = (
            <div className="flex flex-wrap justify-center min-w-full">
                {repos.map(repo => (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        key={repo.id}
                        className="flex flex-col w-full lg:w-[31%] mb-6 bg-secondary rounded-lg p-5 lg:m-2"
                    >
                        <div className="flex-grow">
                            {/* Project Image */}
                            <div className="relative h-40 lg:h-56 mb-4">
                                <Image 
                                    src={repo.social_preview_url || '/default-preview.png'}
                                    alt={`${repo.name} preview`}
                                    fill
                                    priority={true}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="rounded-lg object-cover"
                                />
                            </div>

                            {/* Project Title & Description */}
                            <h3 className="text-xl font-jetbrains mb-3">{repo.name}</h3>
                            <p className="text-accent mb-4 font-inter">
                                {repo.description || 'No description provided.'}
                            </p>
                                
                            {/* Project Topics */}
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

                        {/* Project Metadata */}
                        <div className="flex flex-row">
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
                {projectContents}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/40 to-transparent"></div>
            </div>
        </section>
    );
}
