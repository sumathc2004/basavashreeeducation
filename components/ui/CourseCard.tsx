import Link from "next/link";
import type { Course } from "@/lib/data/courses";
import { ClockIcon, StarIcon, UserIcon } from "@/components/icons";

const patterns = [
  "from-navy-900 via-royal-600 to-sky-500",
  "from-royal-700 via-royal-500 to-sky-400",
  "from-navy-800 via-sky-600 to-sky-300",
];

export function CourseCard({ course, index = 0 }: { course: Course; index?: number }) {
  const gradient = patterns[index % patterns.length];

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl card-surface transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy-900/10"
    >
      <div className={`relative flex h-40 items-end bg-gradient-to-br ${gradient} p-4`}>
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {course.categoryName}
        </span>
        <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute right-8 bottom-4 h-10 w-10 rounded-lg bg-white/10" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-navy-950 group-hover:text-royal-600">{course.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{course.shortDescription}</p>

        <div className="mt-4 flex items-center gap-4 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <UserIcon className="h-3.5 w-3.5" /> {course.instructor.name}
          </span>
          <span className="inline-flex items-center gap-1">
            <ClockIcon className="h-3.5 w-3.5" /> {course.duration}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1 text-xs font-medium text-gold-600">
          <StarIcon className="h-3.5 w-3.5" />
          {course.rating.toFixed(1)}
          <span className="text-muted">({course.students.toLocaleString("en-IN")} learners)</span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <div>
            <span className="text-lg font-bold text-navy-950">₹{course.price.toLocaleString("en-IN")}</span>
            <span className="ml-2 text-xs text-muted line-through">₹{course.mrp.toLocaleString("en-IN")}</span>
          </div>
          <span className="rounded-full bg-royal-600 px-4 py-2 text-xs font-semibold text-white transition-colors group-hover:bg-navy-900">
            Enroll Now
          </span>
        </div>
      </div>
    </Link>
  );
}
