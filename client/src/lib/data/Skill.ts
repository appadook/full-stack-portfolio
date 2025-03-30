interface Skill {
  name: string;
}

interface SkillCategories {
  [category: string]: Skill[];
}
const skills = {
  'Programming Languages': [
    { name: 'Python' },
    { name: 'JavaScript' },
    { name: 'Java' },
    { name: 'TypeScript' },
    { name: 'SQL' },
    { name: 'R' },
    { name: 'OCaml' },
    { name: 'C' },
    { name: 'C++' },
    { name: 'Assmebly' }

  ],
  'Frameworks': [
    { name: 'React.js' },
    { name: 'Next.js' },
    { name: 'Node.js' },
    { name: 'Flask' },
    { name: 'Express.js' },
    { name: 'Spring Boot' },
    { name: 'Electron.js' },
    { name: 'TailwindCSS' },
    { name: 'Expo' },
    { name: 'React Native' },
  ],
  'Databases': [
    { name: 'PostgreSQL' },
    { name: 'MySQL' },
    { name: 'Supabase' },
    { name : 'Firebase' }
  ],
  'Cloud Services': [
    { name: 'Supabase' },
    { name: 'Firebase' },
    { name: 'Google Cloud' }
  ],
  'Tools': [
    { name: 'Git' },
    { name: 'Postman' },
    { name: 'Tableau' },
    { name: 'Rstudio' },
    { name: 'LateX' },
    { name: 'GraphQL' }
  ],
  'Build Tools': [
    { name: 'Gradle' },
    { name: 'Maven' }
  ]
};

export default skills;