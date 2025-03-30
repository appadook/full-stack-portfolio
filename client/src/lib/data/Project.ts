export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link?: string;
  github?: string;
  category?: Array<"SWE" | "Quant" | "AI/ML" | "Algorithms" | "Research" | "Web Development" | "Data Science" | "Systems Engineering" | "Other">;
}

const projectslist: Project[] = [
  {
    id: 1,
    title: "Crypto-Arbitrage Tracker",
    description: "A full stack application that makes use of websockets through multiple APIs to showcase the arbitrage opportunities in the cryptocurrency market for certain coins. The backend allows us to receive the data through a websocket integration and do the necessary calulations to evaluate the presence of arbitrage opportunities either through the fiat currencies or across exchanges",
    image: "/project_images/crypto-app.jpg?height=400&width=600",
    technologies: ["Flask", "Next.js", "Node.js", "Tailwind CSS", "Postman", "Firebase Auth"],
    category: ["SWE", "Quant", "Research"]
  },
  {
    id: 2,
    title: "Maximum Matching Research",
    description: "A project that explores algorithms for finding maximum matching in d-partite graphs, implemented in Python. It includes algorithms for both bipartite and d-partite graphs, all heavily tested with our extended test suite and evaluated in different courses for analysis. The project was a collaborative effort with a group of students and was done towards the final goal of a book containing a whole 10 weeks of research and implementation.",
    image: "/project_images/max_matching.png?height=400&width=600",
    technologies: ["Python"],
    category: ["Algorithms", "Research"]
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "My personal portfolio website built using Next.js, Tailwind CSS, and TypeScript. The website showcases my projects, skills, and experiences in a clean and responsive design.",
    image: "/project_images/portfolio-web.png?height=400&width=600",
    technologies: ["Next.js", "Node.js", "Tailwind CSS", "Vercel"],
    category: ["SWE", "Web Development"]
  },
  {
    id: 12,
    title: "Fitness Tracker Web App",
    description: "A comprehensive fitness tracker web application that enables users to plan their workout routines and monitor their progress. Users can log personal records, track their progress in various units, and review their workout history.",
    image: "/project_images/fitness_web_app.png?height=400&width=600",
    technologies: ["express.js", "PostgreSQL", "React.js", "Node.js", "Tailwind CSS", "Postman", "Supabase | Auth"],
    category: ["SWE", "Web Development"]
  },
  {
    id: 4,
    title: "Forecasting Inflation",
    description: "A collaborative project done in R to build and use economic models to predict the inflation rate of the next quarter using predictors aswell as determinants and training data to construct relibale TSLM and ARIMA models.",
    image: "/project_images/inflation.webp?height=300&width=400",
    technologies: ["R", "RStudio"],
    category: ["Quant", "AI/ML"]
  },
  {
    id: 13,
    title: "Z-manager Web App",
    description: "A user-friendly web application designed to help users manage their tasks and projects efficiently. It features a drag-and-drop interface for organizing tasks within a calendar view, allowing users to plan their workdays effectively.",
    image: "/project_images/z-logo.jpg?height=400&width=600",
    technologies: ["Springboot", "PostgreSQL", "Next.js", "Node.js", "Tailwind CSS", "Postman", "Supabase | Auth", "Shadcn"],
    category: ["SWE", "Web Development"]
  },
  {
    id: 6,
    title: "not-gradescope Web App",
    description: "A project aimed at providing an alternative to the popular grading platform, Gradescope. It focuses on offering similar functionalities with some additonal ones for a better experience for teaching putting students into groups and a very user-friendly interface. This project although incomplete was a collaboative effort with a group of students in short time frame",
    image: "/project_images/not-gradescope.png?height=400&width=600",
    technologies: ["Supabase", "PostgreSQL", "Next.js", "Node.js", "Tailwind CSS", "BootStrapCSS", "Supabase| Auth"],
    category: ["SWE", "Web Development"]
  },
  {
    id: 7,
    title: "Loops Programming Language",
    description: "A custom programming language project named 'Loops', developed using OCaml, a funtional programming language. It includes features such as an interpreter for most basic programming languuage features such as itertive stataments, block statements, variable assignmenet and return semantics.",
    image: "/project_images/loops.webp?height=300&width=400",
    technologies: ["OCaml", "Dune", "Menhir", "OUnit", "OCamllex"]
  },
  {
    id: 8,
    title: "16-bit CPU Design",
    description: "A project that involves the design and implementation of a 16-bit CPU using Logisim, a digital logic simulator. The CPU is capable of executing a set of instructions and performing basic arithmetic, branch and pseudo-branch instructions, jumping, functions and logical operations.",
    image: "/project_images/16-bit-cpu.png?height=300&width=400",
    technologies: ["Logisim", "MIPS Assembly", "Python"],
    category: ["Systems Engineering"]
  },
  {
    id: 9,
    title: "NLP for QA over Tabular Data",
    description: "This project explores different LLM prompting strategies for answering questions about tabular data, evaluating approaches like zero-shot learning, chain of thought, and code-based methods using DataBench's evaluation framework",
    image: "/project_images/llm.jpg?height=300&width=400",
    technologies: ["Python"],
    category: ["AI/ML"]
  },
  {
    id: 10,
    title: "LLM Chatbot",
    description: "Develop a chatbot using an LLM API to engage users in controversial discussions, improving responses through retrieval-augmented generation, prompt engineering, and model evaluation.",
    image: "/project_images/chatbot.jpg?height=300&width=400",
    technologies: ["Python"],
    category: ["AI/ML"]
  },
  {
    id: 11,
    title: "Text Classification using LLM",
    description: "Develop a chatbot using an LLM API to engage users in controversial discussions, improving responses through retrieval-augmented generation, prompt engineering, and model evaluation.",
    image: "/project_images/TextClassification.png?height=300&width=400",
    technologies: ["Python"],
    category: ["AI/ML"]
  }
];


/**
 * Returns a sorted copy of the projects array based on the id field
 */
export const projects = [...projectslist].sort((a, b) => a.id - b.id);