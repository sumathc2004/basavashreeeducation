"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { categories } from "@/lib/data/categories";
import { courses } from "@/lib/data/courses";
import { CourseCard } from "@/components/ui/CourseCard";
import { cn } from "@/lib/cn";

export function CoursesGridClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return courses;
    return courses.filter((course) => course.categorySlug === activeCategory);
  }, [activeCategory]);

  return (
    <div>
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory("all")}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-colors",
            activeCategory === "all" ? "bg-royal-600 text-white" : "bg-sky-50 text-navy-800 hover:bg-sky-100"
          )}
        >
          All Courses
        </button>
        {categories.map((category) => (
          <button
            key={category.slug}
            type="button"
            onClick={() => setActiveCategory(category.slug)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeCategory === category.slug ? "bg-royal-600 text-white" : "bg-sky-50 text-navy-800 hover:bg-sky-100"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((course, index) => (
          <CourseCard key={course.slug} course={course} index={index} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted">No courses found in this category yet.</p>
      ) : null}
    </div>
  );
}
