import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TimelineItemProps {
  id: number;
  title: string;
  company: string;
  duration: string;
  description: string[];
  technologies: string[];
  image: string;
  isLeft?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

const TimelineItem = ({
  title,
  company,
  duration,
  description,
  technologies = [],
  image,
  isLeft = false,
  isFirst = false,
  isLast = false,
}: TimelineItemProps) => {
  return (
    <div className={cn(
      "flex w-full items-center justify-center",
      isFirst ? "pb-12" : isLast ? "pt-12" : "py-12"
    )}>
      <div className="grid w-full grid-cols-1 md:grid-cols-5 gap-4">
        {/* Timeline bubble and line - WITH ANIMATION */}
        <div className="md:col-span-1 flex flex-col items-center justify-start relative">
          {/* Animated bubble with pulse effect */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20, 
              delay: 0.2
            }}
            className="relative"
          >
            {/* Pulsing background effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-indigo-500/30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 0.3, 0.7]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            {/* Main bubble - increased size from w-16/h-16 to w-24/h-24 */}
            <motion.div 
              className="w-24 h-24 bg-gradient-to-br from-indigo-900 to-purple-800 rounded-full shadow-lg shadow-indigo-500/30 p-4 z-10 flex items-center justify-center border border-indigo-600/50 overflow-hidden relative"
              whileHover={{ 
                scale: 1.15,
                boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)"
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10
              }}
            >
              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/20 to-transparent rounded-full" />
              
              {/* Company image */}
              <img 
                src={image} 
                alt={`${company} logo`} 
                className="max-w-full max-h-full object-contain relative z-10"
              />
            </motion.div>
          </motion.div>
          
          {/* Connecting lines - adjusted top position to account for larger bubble */}
          {!isLast && (
            <motion.div 
              className="w-1 bg-gradient-to-b from-indigo-400 to-purple-500 h-full absolute top-24 z-0"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          )}
          {!isFirst && (
            <motion.div 
              className="w-1 bg-gradient-to-b from-purple-500 to-indigo-400 h-24 absolute -top-24 z-0"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          )}
        </div>
        
        {/* Content card with animation */}
        <motion.div 
          className="md:col-span-4 md:col-start-2 bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-800 hover:border-indigo-500/50 transition-all duration-300"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1] 
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center mb-3 justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white/90">{title}</h3>
              <h4 className="text-lg text-indigo-400 font-medium">{company}</h4>
            </div>
            <span className="text-sm text-gray-400 font-medium mt-1 md:mt-0 md:ml-4 bg-gray-800/80 px-3 py-1 rounded-full">
              {duration}
            </span>
          </div>
          
          <div className="text-gray-300 mb-4">
            {description.map((paragraph, index) => (
              <p key={index} className="mb-2">{paragraph}</p>
            ))}
          </div>
          
          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <motion.span 
                  key={index} 
                  className="text-xs bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded-full border border-indigo-700/30"
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: "rgba(99, 102, 241, 0.3)" 
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TimelineItem;
