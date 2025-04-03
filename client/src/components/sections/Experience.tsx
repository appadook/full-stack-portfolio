import React, { useState, useEffect } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import { MousePointer } from 'lucide-react';
import { experienceAPI, ExperienceData } from '@/api';
import LoadingIndicator from '@/components/LoadingIndicator';
import { experiences as localExperienceData } from '@/lib/data/Experience'; // Import local data as fallback
import Timeline from '@/components/Timeline';
import { TimelineItemProps } from '@/components/TimelineItem';

const Experience = () => {
  const [experiences, setExperiences] = useState<Omit<TimelineItemProps, "isLeft" | "isFirst" | "isLast">[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingLocalData, setUsingLocalData] = useState(false);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const data = await experienceAPI.getAll();
        
        // Convert experiences to match TimelineItemProps structure
        const processedData = data.map((exp: ExperienceData, index: number) => ({
          ...exp,
          id: typeof exp.id === 'string' ? index + 1 : Number(exp.id) || index + 1
        }));
        
        setExperiences(processedData);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch experiences:', err);
        // Fall back to local data if API request fails
        console.log('Falling back to local experience data');
        
        // Convert local data to match TimelineItemProps structure
        const localData = (localExperienceData as any[]).map((exp, index) => ({
          ...exp,
          id: typeof exp.id === 'string' ? index + 1 : Number(exp.id) || index + 1
        }));
        
        setExperiences(localData);
        setUsingLocalData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <section id="experience" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader title="My Experience" subtitle="Career Path" />
          <div className="flex justify-center items-center py-20">
            <LoadingIndicator />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="experience" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader title="My Experience" subtitle="Career Path" />
          <div className="text-center text-red-500 py-10">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="My Experience"
          subtitle="Career Path"
        />
        
        <div className="text-center mb-8 animate-pulse">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg border border-primary/30 shadow-sm">
            <MousePointer size={18} className="text-primary" />
            <span className="text-primary font-medium">Hover over items for interactive effects</span>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Using the enhanced Timeline component */}
          <Timeline experiences={experiences} />
        </div>
      </div>
    </section>
  );
};

export default Experience;
