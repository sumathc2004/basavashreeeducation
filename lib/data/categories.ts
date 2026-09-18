export type Category = {
  slug: string;
  name: string;
  description: string;
  icon: "code" | "layout" | "chart" | "monitor" | "briefcase" | "award";
  courseCount: number;
};

export const categories: Category[] = [
  {
    slug: "programming",
    name: "Programming",
    description: "Learn core programming languages with hands-on projects.",
    icon: "code",
    courseCount: 2,
  },
  {
    slug: "web-development",
    name: "Web Development",
    description: "Build modern, responsive websites and web applications.",
    icon: "layout",
    courseCount: 2,
  },
  {
    slug: "data-technology",
    name: "Data & Technology",
    description: "Work with data, analytics and modern tech tools.",
    icon: "chart",
    courseCount: 2,
  },
  {
    slug: "computer-courses",
    name: "Computer Courses",
    description: "Practical computer skills for everyday and office work.",
    icon: "monitor",
    courseCount: 2,
  },
  {
    slug: "career-skills",
    name: "Career Skills",
    description: "Communication, interview and workplace-readiness skills.",
    icon: "briefcase",
    courseCount: 2,
  },
  {
    slug: "professional-courses",
    name: "Professional Courses",
    description: "Industry-oriented programs to advance your career.",
    icon: "award",
    courseCount: 2,
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}
