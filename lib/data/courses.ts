export type Course = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  categorySlug: string;
  categoryName: string;
  instructor: {
    name: string;
    title: string;
    bio: string;
  };
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  mrp: number;
  rating: number;
  students: number;
  language: string;
  whatYouWillLearn: string[];
  curriculum: { title: string; lessons: string[] }[];
};

export const courses: Course[] = [
  {
    slug: "python-programming-masterclass",
    title: "Python Programming Masterclass",
    shortDescription: "Go from fundamentals to real-world projects in Python.",
    description:
      "A complete, project-driven introduction to Python covering syntax, data structures, file handling and automation, built for absolute beginners and career switchers.",
    categorySlug: "programming",
    categoryName: "Programming",
    instructor: { name: "Ravi Kumar", title: "Senior Software Engineer", bio: "10+ years building backend systems; has trained over 2,000 students." },
    duration: "1 Year",
    level: "Beginner",
    price: 24999,
    mrp: 42999,
    rating: 4.8,
    students: 3120,
    language: "English & Kannada",
    whatYouWillLearn: [
      "Python syntax, data types and control flow",
      "Functions, modules and error handling",
      "Working with files, APIs and libraries",
      "Building real automation mini-projects",
    ],
    curriculum: [
      { title: "Getting Started", lessons: ["Installing Python & tools", "Variables and data types", "Operators and expressions"] },
      { title: "Core Programming", lessons: ["Loops and conditionals", "Functions and scope", "Lists, tuples and dictionaries"] },
      { title: "Applied Python", lessons: ["File handling", "Working with APIs", "Capstone project"] },
    ],
  },
  {
    slug: "java-programming-fundamentals",
    title: "Java Programming Fundamentals",
    shortDescription: "Build a strong foundation in Java and object-oriented design.",
    description:
      "Learn Java from the ground up with a focus on object-oriented principles, collections and writing clean, maintainable code.",
    categorySlug: "programming",
    categoryName: "Programming",
    instructor: { name: "Ananya Rao", title: "Java Backend Developer", bio: "Builds enterprise Java systems; passionate about teaching OOP the right way." },
    duration: "1 Year",
    level: "Beginner",
    price: 22999,
    mrp: 38999,
    rating: 4.7,
    students: 2140,
    language: "English",
    whatYouWillLearn: [
      "Object-oriented programming in Java",
      "Classes, interfaces and inheritance",
      "Collections framework",
      "Exception handling and debugging",
    ],
    curriculum: [
      { title: "Java Basics", lessons: ["Setup and first program", "Variables and control flow", "Methods"] },
      { title: "OOP in Java", lessons: ["Classes and objects", "Inheritance and polymorphism", "Interfaces"] },
      { title: "Practical Java", lessons: ["Collections", "Exception handling", "Mini project"] },
    ],
  },
  {
    slug: "full-stack-web-development",
    title: "Full-Stack Web Development",
    shortDescription: "Become a full-stack developer with HTML, CSS, JS, React and Node.",
    description:
      "A comprehensive, project-based program covering both frontend and backend development, ending with a full deployable web application.",
    categorySlug: "web-development",
    categoryName: "Web Development",
    instructor: { name: "Kiran Shetty", title: "Full-Stack Engineer", bio: "Has shipped 20+ production web apps; focuses on practical, job-ready skills." },
    duration: "1 Year",
    level: "Intermediate",
    price: 79999,
    mrp: 99999,
    rating: 4.9,
    students: 4210,
    language: "English & Kannada",
    whatYouWillLearn: [
      "HTML, CSS and modern JavaScript",
      "Building UIs with React",
      "REST APIs with Node.js",
      "Deploying a full-stack application",
    ],
    curriculum: [
      { title: "Frontend Foundations", lessons: ["HTML & CSS", "JavaScript essentials", "Responsive design"] },
      { title: "Frontend Frameworks", lessons: ["React fundamentals", "State management", "Routing"] },
      { title: "Backend & Deployment", lessons: ["Node.js & Express", "Databases", "Deployment"] },
    ],
  },
  {
    slug: "frontend-development-react",
    title: "Frontend Development with React",
    shortDescription: "Master React and build fast, modern user interfaces.",
    description:
      "Focused entirely on frontend craft — component design, state management and performance — using React as the primary tool.",
    categorySlug: "web-development",
    categoryName: "Web Development",
    instructor: { name: "Priya Nair", title: "Frontend Engineer", bio: "Specialist in React and design systems; mentors early-career developers." },
    duration: "1 Year",
    level: "Intermediate",
    price: 49999,
    mrp: 79999,
    rating: 4.8,
    students: 1980,
    language: "English",
    whatYouWillLearn: [
      "Component-driven UI development",
      "Hooks and state management",
      "Working with APIs in React",
      "Performance and accessibility basics",
    ],
    curriculum: [
      { title: "React Basics", lessons: ["JSX and components", "Props and state", "Events"] },
      { title: "Intermediate React", lessons: ["Hooks", "Context API", "Forms"] },
      { title: "Real Projects", lessons: ["Data fetching", "Routing", "Capstone build"] },
    ],
  },
  {
    slug: "data-analytics-excel-sql",
    title: "Data Analytics with Excel & SQL",
    shortDescription: "Analyse and present data confidently using Excel and SQL.",
    description:
      "A practical program for anyone who wants to work with data — covering spreadsheets, SQL querying and building simple dashboards.",
    categorySlug: "data-technology",
    categoryName: "Data & Technology",
    instructor: { name: "Suresh Patil", title: "Data Analyst", bio: "Works with business analytics teams; enjoys simplifying data for beginners." },
    duration: "1 Year",
    level: "Beginner",
    price: 34999,
    mrp: 54999,
    rating: 4.6,
    students: 1650,
    language: "English & Kannada",
    whatYouWillLearn: [
      "Advanced Excel formulas and pivot tables",
      "Writing SQL queries",
      "Data cleaning techniques",
      "Building simple dashboards",
    ],
    curriculum: [
      { title: "Excel for Analytics", lessons: ["Formulas & functions", "Pivot tables", "Charts"] },
      { title: "SQL Essentials", lessons: ["Queries & joins", "Aggregations", "Practice datasets"] },
      { title: "Applied Analytics", lessons: ["Dashboards", "Reporting", "Final project"] },
    ],
  },
  {
    slug: "python-for-data-science",
    title: "Python for Data Science",
    shortDescription: "Use Python to explore, visualise and model data.",
    description:
      "Learn the data science workflow using Python — from data wrangling with pandas to visualisation and introductory machine learning.",
    categorySlug: "data-technology",
    categoryName: "Data & Technology",
    instructor: { name: "Meera Joshi", title: "Data Scientist", bio: "Builds ML models in industry; focuses on intuition before formulas." },
    duration: "1 Year",
    level: "Intermediate",
    price: 54999,
    mrp: 84999,
    rating: 4.8,
    students: 1420,
    language: "English",
    whatYouWillLearn: [
      "Data analysis with pandas and NumPy",
      "Data visualisation",
      "Statistics fundamentals",
      "Intro to machine learning models",
    ],
    curriculum: [
      { title: "Python for Data", lessons: ["NumPy & pandas", "Data cleaning", "Visualisation"] },
      { title: "Statistics", lessons: ["Descriptive statistics", "Probability basics", "Hypothesis testing"] },
      { title: "Machine Learning Intro", lessons: ["Regression", "Classification", "Capstone project"] },
    ],
  },
  {
    slug: "ms-office-computer-basics",
    title: "MS Office & Computer Basics",
    shortDescription: "Essential computer and office productivity skills.",
    description:
      "A beginner-friendly course covering computer fundamentals, MS Word, Excel, PowerPoint and everyday internet skills.",
    categorySlug: "computer-courses",
    categoryName: "Computer Courses",
    instructor: { name: "Anitha Desai", title: "Computer Trainer", bio: "Has trained thousands of first-time computer learners across Karnataka." },
    duration: "1 Year",
    level: "Beginner",
    price: 20999,
    mrp: 32999,
    rating: 4.7,
    students: 5230,
    language: "English & Kannada",
    whatYouWillLearn: [
      "Computer fundamentals and file management",
      "MS Word for documents",
      "MS Excel basics",
      "MS PowerPoint presentations",
    ],
    curriculum: [
      { title: "Computer Basics", lessons: ["Operating system basics", "File management", "Internet & email"] },
      { title: "MS Office", lessons: ["Word essentials", "Excel essentials", "PowerPoint essentials"] },
    ],
  },
  {
    slug: "tally-with-gst",
    title: "Tally with GST",
    shortDescription: "Practical accounting and GST compliance using Tally.",
    description:
      "Learn day-to-day accounting entries, inventory management and GST return preparation using Tally Prime.",
    categorySlug: "computer-courses",
    categoryName: "Computer Courses",
    instructor: { name: "Manjunath Gowda", title: "Accounts Trainer", bio: "Practising accountant and GST consultant with 12 years of experience." },
    duration: "1 Year",
    level: "Beginner",
    price: 24999,
    mrp: 39999,
    rating: 4.6,
    students: 2870,
    language: "Kannada & English",
    whatYouWillLearn: [
      "Recording day-to-day accounting entries",
      "Inventory and stock management",
      "GST invoicing and returns",
      "Generating financial reports",
    ],
    curriculum: [
      { title: "Tally Basics", lessons: ["Company setup", "Ledgers & vouchers", "Inventory basics"] },
      { title: "GST & Reporting", lessons: ["GST setup", "Return filing basics", "Financial reports"] },
    ],
  },
  {
    slug: "spoken-english-communication",
    title: "Spoken English & Communication Skills",
    shortDescription: "Speak confidently in English for work and daily life.",
    description:
      "Build fluency, confidence and clarity in spoken English through guided practice, real conversations and workplace scenarios.",
    categorySlug: "career-skills",
    categoryName: "Career Skills",
    instructor: { name: "Divya Shenoy", title: "Communication Coach", bio: "Trains professionals and students in spoken English and soft skills." },
    duration: "1 Year",
    level: "Beginner",
    price: 21999,
    mrp: 34999,
    rating: 4.7,
    students: 3980,
    language: "English & Kannada",
    whatYouWillLearn: [
      "Everyday conversational English",
      "Grammar for confident speaking",
      "Workplace communication scenarios",
      "Public speaking basics",
    ],
    curriculum: [
      { title: "Foundations", lessons: ["Vocabulary building", "Sentence formation", "Pronunciation"] },
      { title: "Applied Speaking", lessons: ["Everyday conversations", "Workplace scenarios", "Confidence building"] },
    ],
  },
  {
    slug: "resume-interview-skills",
    title: "Resume Building & Interview Skills",
    shortDescription: "Create a strong resume and crack interviews with confidence.",
    description:
      "A short, focused course to help job seekers build an impactful resume and prepare for common interview formats.",
    categorySlug: "career-skills",
    categoryName: "Career Skills",
    instructor: { name: "Arjun Hegde", title: "Career Coach", bio: "Has coached hundreds of freshers and professionals through job transitions." },
    duration: "1 Year",
    level: "Beginner",
    price: 20999,
    mrp: 30999,
    rating: 4.8,
    students: 4560,
    language: "English",
    whatYouWillLearn: [
      "Writing an ATS-friendly resume",
      "Structuring your achievements",
      "Answering common interview questions",
      "Mock interview practice",
    ],
    curriculum: [
      { title: "Resume Building", lessons: ["Resume structure", "Writing achievements", "Common mistakes"] },
      { title: "Interview Preparation", lessons: ["Common questions", "Mock interviews", "Follow-up etiquette"] },
    ],
  },
  {
    slug: "digital-marketing-professional-program",
    title: "Digital Marketing Professional Program",
    shortDescription: "Learn SEO, social media and performance marketing.",
    description:
      "An industry-oriented program covering SEO, social media marketing, content and performance advertising for real business scenarios.",
    categorySlug: "professional-courses",
    categoryName: "Professional Courses",
    instructor: { name: "Nikhil Rao", title: "Digital Marketing Lead", bio: "Runs performance campaigns for D2C brands; teaches practical, current tactics." },
    duration: "1 Year",
    level: "Intermediate",
    price: 64999,
    mrp: 89999,
    rating: 4.7,
    students: 2310,
    language: "English",
    whatYouWillLearn: [
      "Search engine optimisation (SEO)",
      "Social media marketing",
      "Content strategy",
      "Performance advertising basics",
    ],
    curriculum: [
      { title: "Marketing Foundations", lessons: ["Digital marketing landscape", "SEO basics", "Content strategy"] },
      { title: "Growth Channels", lessons: ["Social media marketing", "Paid advertising", "Analytics & reporting"] },
    ],
  },
  {
    slug: "project-management-fundamentals",
    title: "Project Management Fundamentals",
    shortDescription: "Learn to plan, execute and deliver projects successfully.",
    description:
      "Covers core project management concepts, planning tools and delivery frameworks used across industries.",
    categorySlug: "professional-courses",
    categoryName: "Professional Courses",
    instructor: { name: "Lakshmi Iyer", title: "Project Manager", bio: "Has delivered cross-functional projects across IT and manufacturing sectors." },
    duration: "1 Year",
    level: "Intermediate",
    price: 44999,
    mrp: 69999,
    rating: 4.6,
    students: 1290,
    language: "English",
    whatYouWillLearn: [
      "Project planning and scheduling",
      "Risk and resource management",
      "Agile and waterfall approaches",
      "Stakeholder communication",
    ],
    curriculum: [
      { title: "PM Foundations", lessons: ["Project lifecycle", "Scope & planning", "Scheduling"] },
      { title: "Delivery & Frameworks", lessons: ["Risk management", "Agile basics", "Stakeholder management"] },
    ],
  },
];

export function getCourseBySlug(slug: string) {
  return courses.find((course) => course.slug === slug);
}

export function getCoursesByCategory(categorySlug: string) {
  return courses.filter((course) => course.categorySlug === categorySlug);
}
