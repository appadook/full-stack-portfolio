-- Create projects table

CREATE TABLE projects (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    technologies TEXT NOT NULL, 
    image TEXT NOT NULL,
    link TEXT,                  
    github TEXT,                
    category TEXT               
);


CREATE INDEX idx_projects_id ON projects(id);


COMMENT ON TABLE projects IS 'Portfolio projects with technologies and categories';





-- Insert projects data
INSERT INTO projects (id, title, description, technologies, image, link, github, category)
VALUES 
(1, 'Crypto-Arbitrage Tracker', 
 'A full stack application that makes use of websockets through multiple APIs to showcase the arbitrage opportunities in the cryptocurrency market for certain coins. The backend allows us to receive the data through a websocket integration and do the necessary calulations to evaluate the presence of arbitrage opportunities either through the fiat currencies or across exchanges',
 '["Flask", "Next.js", "Node.js", "Tailwind CSS", "Postman", "Firebase Auth"]',
 '/project_images/crypto-app.jpg?height=400&width=600',
 NULL, NULL,
 '["SWE", "Quant", "Research"]');

INSERT INTO projects (id, title, description, technologies, image, link, github, category)
VALUES 
(2, 'Maximum Matching Research', 
 'A project that explores algorithms for finding maximum matching in d-partite graphs, implemented in Python. It includes algorithms for both bipartite and d-partite graphs, all heavily tested with our extended test suite and evaluated in different courses for analysis. The project was a collaborative effort with a group of students and was done towards the final goal of a book containing a whole 10 weeks of research and implementation.',
 '["Python"]',
 '/project_images/max_matching.png?height=400&width=600',
 NULL, NULL,
 '["Algorithms", "Research"]');

INSERT INTO projects (id, title, description, technologies, image, link, github, category)
VALUES 
(3, 'Portfolio Website', 
 'My personal portfolio website built using Next.js, Tailwind CSS, and TypeScript. The website showcases my projects, skills, and experiences in a clean and responsive design.',
 '["Next.js", "Node.js", "Tailwind CSS", "Vercel"]',
 '/project_images/portfolio-web.png?height=400&width=600',
 NULL, NULL,
 '["SWE", "Web Development"]');

INSERT INTO projects (id, title, description, technologies, image, link, github, category)
VALUES 
(4, 'Forecasting Inflation', 
 'A collaborative project done in R to build and use economic models to predict the inflation rate of the next quarter using predictors aswell as determinants and training data to construct relibale TSLM and ARIMA models.',
 '["R", "RStudio"]',
 '/project_images/inflation.webp?height=300&width=400',
 NULL, NULL,
 '["Quant", "AI/ML"]');

INSERT INTO projects (id, title, description, technologies, image, link, github, category)
VALUES 
(6, 'not-gradescope Web App', 
 'A project aimed at providing an alternative to the popular grading platform, Gradescope. It focuses on offering similar functionalities with some additonal ones for a better experience for teaching putting students into groups and a very user-friendly interface. This project although incomplete was a collaboative effort with a group of students in short time frame',
 '["Supabase", "PostgreSQL", "Next.js", "Node.js", "Tailwind CSS", "BootStrapCSS", "Supabase| Auth"]',
 '/project_images/not-gradescope.png?height=400&width=600',
 NULL, NULL,
 '["SWE", "Web Development"]');

INSERT INTO projects (id, title, description, technologies, image, link, github, category)
VALUES 
(7, 'Loops Programming Language', 
 'A custom programming language project named ''Loops'', developed using OCaml, a funtional programming language. It includes features such as an interpreter for most basic programming languuage features such as itertive stataments, block statements, variable assignmenet and return semantics.',
 '["OCaml", "Dune", "Menhir", "OUnit", "OCamllex"]',
 '/project_images/loops.webp?height=300&width=400',
 NULL, NULL,
 NULL);

INSERT INTO projects (id, title, description, technologies, image, link, github, category)
VALUES 
(8, '16-bit CPU Design', 
 'A project that involves the design and implementation of a 16-bit CPU using Logisim, a digital logic simulator. The CPU is capable of executing a set of instructions and performing basic arithmetic, branch and pseudo-branch instructions, jumping, functions and logical operations.',
 '["Logisim", "MIPS Assembly", "Python"]',
 '/project_images/16-bit-cpu.png?height=300&width=400',
 NULL, NULL,
 '["Systems Engineering"]');

INSERT INTO projects (id, title, description, technologies, image, link, github, category)
VALUES 
(9, 'NLP for QA over Tabular Data', 
 'This project explores different LLM prompting strategies for answering questions about tabular data, evaluating approaches like zero-shot learning, chain of thought, and code-based methods using DataBench''s evaluation framework',
 '["Python"]',
 '/project_images/llm.jpg?height=300&width=400',
 NULL, NULL,
 '["AI/ML"]');

INSERT INTO projects (id, title, description, technologies, image, link, github, category)
VALUES 
(10, 'LLM Chatbot', 
 'Develop a chatbot using an LLM API to engage users in controversial discussions, improving responses through retrieval-augmented generation, prompt engineering, and model evaluation.',
 '["Python"]',
 '/project_images/chatbot.jpg?height=300&width=400',
 NULL, NULL,
 '["AI/ML"]');

INSERT INTO projects (id, title, description, technologies, image, link, github, category)
VALUES 
(11, 'Text Classification using LLM', 
 'Develop a chatbot using an LLM API to engage users in controversial discussions, improving responses through retrieval-augmented generation, prompt engineering, and model evaluation.',
 '["Python"]',
 '/project_images/TextClassification.png?height=300&width=400',
 NULL, NULL,
 '["AI/ML"]');

INSERT INTO projects (id, title, description, technologies, image, link, github, category)
VALUES 
(12, 'Fitness Tracker Web App', 
 'A comprehensive fitness tracker web application that enables users to plan their workout routines and monitor their progress. Users can log personal records, track their progress in various units, and review their workout history.',
 '["express.js", "PostgreSQL", "React.js", "Node.js", "Tailwind CSS", "Postman", "Supabase | Auth"]',
 '/project_images/fitness_web_app.png?height=400&width=600',
 NULL, NULL,
 '["SWE", "Web Development"]');

INSERT INTO projects (id, title, description, technologies, image, link, github, category)
VALUES 
(13, 'Z-manager Web App', 
 'A user-friendly web application designed to help users manage their tasks and projects efficiently. It features a drag-and-drop interface for organizing tasks within a calendar view, allowing users to plan their workdays effectively.',
 '["Springboot", "PostgreSQL", "Next.js", "Node.js", "Tailwind CSS", "Postman", "Supabase | Auth", "Shadcn"]',
 '/project_images/z-logo.jpg?height=400&width=600',
 NULL, NULL,
 '["SWE", "Web Development"]');