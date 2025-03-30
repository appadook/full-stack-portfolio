import { motion } from 'framer-motion'
import { skillIcons } from '@/components/ui/skills-icons'
import skills from '@/lib/data/Skill'
import { IconType } from 'react-icons'

interface SkillItem {
  name: string;
  link?: string;
}

export default function Skills() {
  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-20 bg-[#121212]"
    >
      <h2 className="text-3xl font-bold mb-12 text-center text-[#E0E0E0]">Skills & Technologies</h2>
      <div className="max-w-7xl mx-auto px-4">
        {/* Programming Languages */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12 bg-[#1E1E1E] p-6 rounded-lg w-full lg:w-[80vw] mx-auto"
        >
          <h3 className="text-xl font-semibold mb-4 text-[#00E5FF]">Programming Languages</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {skills['Programming Languages'].map((item: SkillItem, index: number) => {
              const Icon = skillIcons[item.name] as IconType;
              return (
                <motion.div
                  key={index}
                  className="group flex flex-col items-center justify-center p-3 rounded-lg bg-[#2A2A2A] hover:bg-[#3A3A3A] transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {Icon && (
                    <Icon 
                      size={40}
                      className="mb-2 text-[#FF4081] group-hover:text-[#00E5FF] transition-colors duration-300"
                    />
                  )}
                  <span className="text-sm text-center text-[#FF4081] font-semibold group-hover:text-[#00E5FF] transition-colors duration-300">
                    {item.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Other Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).filter(([category]) => category !== 'Programming Languages').map(([category, items], index) => (
            <motion.div
              key={category}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#1E1E1E] p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-4 text-[#00E5FF]">{category}</h3>
              <div className="grid grid-cols-2 gap-4">
                {items.map((item: SkillItem, itemIndex: number) => {
                  const Icon = skillIcons[item.name] as IconType;
                  return (
                    <motion.a
                      key={itemIndex}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center justify-center p-2 rounded-lg bg-[#2A2A2A] hover:bg-[#3A3A3A] transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {Icon && (
                        <Icon 
                          size={32}
                          className="mb-1 text-[#00E5FF] group-hover:text-[#FF4081] transition-colors duration-300"
                        />
                      )}
                      <span className="text-xs text-center text-[#E0E0E0] group-hover:text-[#FF4081] transition-colors duration-300">
                        {item.name}
                      </span>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

