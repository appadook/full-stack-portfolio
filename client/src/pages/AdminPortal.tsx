import React, { useState, useEffect } from 'react';
import api from '../api';
import { experiences } from '../lib/data/Experience';
import { projects } from '../lib/data/Project';
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
    const [serverExperiences, setServerExperiences] = useState<any[]>([]);
    const [serverProjects, setServerProjects] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Fetch data from API when component mounts
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch experiences and projects from the server
                const [experiencesRes, projectsRes] = await Promise.all([
                    api.get('/api/experiences/'),
                    api.get('/api/projects/')
                ]);
                
                setServerExperiences(experiencesRes.data);
                setServerProjects(projectsRes.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load data from server. Using local data instead.');
                // Use local data as fallback
                setServerExperiences(experiences);
                setServerProjects(projects);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
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
        
        const experienceItems = serverExperiences.length > 0 ? serverExperiences : experiences;
        const projectItems = serverProjects.length > 0 ? serverProjects : projects;
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
                        />
                    )}
                    {activeSection === 'projects' && (
                        <ProjectSection 
                            projects={projectItems} 
                            containerVariants={containerVariants} 
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