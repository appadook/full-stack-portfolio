import { motion } from "framer-motion";
import TimelineItem, { TimelineItemProps } from "./TimelineItem";

interface TimelineProps {
  experiences: Omit<TimelineItemProps, 'isLeft' | 'isFirst' | 'isLast'>[];
}

const Timeline = ({ experiences }: TimelineProps) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="relative">
        {/* Removed the center timeline line */}
        
        {experiences.map((experience, index) => (
          <TimelineItem
            key={experience.id}
            {...experience}
            isLeft={index % 2 === 0}
            isFirst={index === 0}
            isLast={index === experiences.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;