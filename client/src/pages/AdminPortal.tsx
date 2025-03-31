import React, { useState, useEffect, useCallback } from 'react';
import { experienceAPI, projectAPI, ExperienceData, ProjectData } from '../api';
import { experiences as localExperiences } from '../lib/data/Experience';
import { projects as localProjects } from '../lib/data/Project';
import skills from '../lib/data/Skill';
import LoadingIndicator from '../components/LoadingIndicator';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar, { SidebarItem } from '../components/Sidebar';
import ExperienceSection from '../components/ExperienceSection';
import ProjectSection from '../components/ProjectSection';
import SkillsSection from '../components/SkillsSection';
import Dashboard from '../components/Dashboard';

// Define section types for the admin portal
type Section = 'experiences' | 'projects' | 'skills' | 'dashboard';

const AdminPortal: React.FC = () => {
    const [activeSection, setActiveSection] = useState<Section>('dashboard');
    const [loading, setLoading] = useState(false);
    const [serverExperiences, setServerExperiences] = useState<ExperienceData[]>([]);
    const [serverProjects, setServerProjects] = useState<ProjectData[]>([]);
    const [error, setError] = useState<string | null>(null);
    
    // Function to fetch all data from the API
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            // Fetch experiences and projects from the server using our API functions
            const [experiencesData, projectsData] = await Promise.all([
                experienceAPI.getAll(),
                projectAPI.getAll()
            ]);
            
            setServerExperiences(experiencesData);
            setServerProjects(projectsData);
            setError(null);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to load data from server. Using local data instead.');
            // Use local data as fallback
            // setServerExperiences(localExperiences);
            // setServerProjects(localProjects);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch data when component mounts
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Handlers for data changes
    const handleExperienceChange = useCallback(() => {
        // Only fetch experiences to avoid unnecessary project refetching
        setLoading(true);
        experienceAPI.getAll()
            .then(data => {
                setServerExperiences(data);
                setError(null);
            })
            .catch(err => {
                console.error('Error refreshing experiences:', err);
                setError('Failed to refresh experiences data.');
            })
            .finally(() => setLoading(false));
    }, []);

    const handleProjectChange = useCallback(() => {
        // Only fetch projects to avoid unnecessary experience refetching
        setLoading(true);
        projectAPI.getAll()
            .then(data => {
                setServerProjects(data);
                setError(null);
            })
            .catch(err => {
                console.error('Error refreshing projects:', err);
                setError('Failed to refresh projects data.');
            })
            .finally(() => setLoading(false));
    }, []);

    // Navigation items for the sidebar
    const navItems: SidebarItem[] = [
        { name: 'Dashboard', section: 'dashboard', icon: '📊' },
        { name: 'Experiences', section: 'experiences', icon: '💼' },
        { name: 'Projects', section: 'projects', icon: '🚀' },
        { name: 'Skills', section: 'skills', icon: '🔧' }
    ];

    // Function to handle sidebar navigation
    const handleNavigation = (section: string) => {
        setActiveSection(section as Section);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.1
            }
        }
    };

    // Render content based on active section
    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center h-full">
                    <LoadingIndicator />
                </div>
            );
        }
        
        if (error) {
            return (
                <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-xl text-red-300 shadow-lg">
                    <div className="flex items-center">
                        <span className="text-2xl mr-3">⚠️</span>
                        <span>{error}</span>
                    </div>
                </div>
            );
        }
        
        const experienceItems = serverExperiences.length > 0 ? serverExperiences : localExperiences;
        const projectItems = serverProjects.length > 0 ? serverProjects : localProjects;
        const skillsCount = Object.values(skills).reduce((total, skillList) => total + skillList.length, 0);
        
        return (
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeSection === 'experiences' && (
                        <ExperienceSection 
                            experiences={experienceItems} 
                            containerVariants={containerVariants}
                            onExperienceChange={handleExperienceChange}
                        />
                    )}
                    {activeSection === 'projects' && (
                        <ProjectSection 
                            projects={projectItems} 
                            containerVariants={containerVariants}
                            onProjectChange={handleProjectChange}
                        />
                    )}
                    {activeSection === 'skills' && (
                        <SkillsSection 
                            skills={skills} 
                            containerVariants={containerVariants} 
                        />
                    )}
                    {activeSection === 'dashboard' && (
                        <Dashboard 
                            experienceCount={experienceItems.length}
                            projectCount={projectItems.length}
                            skillCount={skillsCount}
                            containerVariants={containerVariants}
                            onNavigate={handleNavigation}
                        />
                    )}
                </motion.div>
            </AnimatePresence>
        );
    };

    return (
        <div className="flex h-screen bg-dark-bg overflow-hidden">
            {/* Sidebar */}
            <Sidebar 
                items={navItems} 
                activeSection={activeSection} 
                onSectionChange={handleNavigation} 
            />

            {/* Main content */}
            <main className="flex-1 overflow-auto p-8">
                {renderContent()}
            </main>
        </div>
    );
};

export default AdminPortal;