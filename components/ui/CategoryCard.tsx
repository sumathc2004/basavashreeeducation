import Link from "next/link";
import type { Category } from "@/lib/data/categories";
import { categoryIconMap, ArrowRightIcon } from "@/components/icons";

export function CategoryCard({ category }: { category: Category }) {
  const Icon = categoryIconMap[category.icon];

  return (
    <Link
      href={`/courses?category=${category.slug}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900 to-royal-600 p-6 text-white transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-sky-400/20 transition-transform duration-300 group-hover:scale-110" />
      <div className="relative">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
          <Icon className="h-6 w-6" />
        </span>
        <h3 className="mt-4 text-lg font-semibold">{category.name}</h3>
        <p className="mt-2 text-sm text-sky-100/90">{category.description}</p>
      </div>
      <div className="relative mt-6 flex items-center justify-between text-sm font-medium">
        <span className="text-sky-100">{category.courseCount} Courses</span>
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
