import { notFound } from "next/navigation";
import { courses, getCourseBySlug } from "@/lib/data/courses";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CourseCard } from "@/components/ui/CourseCard";
import { CheckIcon, ClockIcon, StarIcon, UserIcon } from "@/components/icons";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};
  return {
    title: `${course.title} | Basavashree Education`,
    description: course.shortDescription,
  };
}

export default async function CourseDetailPage({ params }: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const related = courses.filter((item) => item.categorySlug === course.categorySlug && item.slug !== course.slug).slice(0, 3);

  return (
    <div>
      <section className="brand-gradient py-14 text-white lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">{course.categoryName}</span>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{course.title}</h1>
            <p className="mt-4 max-w-2xl text-base text-sky-100">{course.shortDescription}</p>

            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-sky-100">
              <span className="inline-flex items-center gap-1.5">
                <StarIcon className="h-4 w-4 text-gold-400" /> {course.rating.toFixed(1)} ({course.students.toLocaleString("en-IN")} learners)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ClockIcon className="h-4 w-4" /> {course.duration}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <UserIcon className="h-4 w-4" /> {course.instructor.name}
              </span>
            </div>
          </div>
        </Container>
      </section>

      <Container className="grid gap-10 py-14 lg:grid-cols-[1.6fr_1fr] lg:py-20">
        <div className="space-y-10">
          <div>
            <h2 className="text-xl font-bold text-navy-950">About this course</h2>
            <p className="mt-3 leading-relaxed text-muted">{course.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-950">What you&apos;ll learn</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {course.whatYouWillLearn.map((point) => (
                <div key={point} className="flex items-start gap-2 rounded-xl bg-sky-50 p-3 text-sm text-navy-800">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-royal-600" />
                  {point}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-950">Course curriculum</h2>
            <div className="mt-4 space-y-3">
              {course.curriculum.map((module, index) => (
                <div key={module.title} className="rounded-xl card-surface p-5">
                  <p className="text-sm font-semibold text-royal-600">Module {index + 1}</p>
                  <h3 className="mt-1 text-base font-semibold text-navy-950">{module.title}</h3>
                  <ul className="mt-3 space-y-2 text-sm text-muted">
                    {module.lessons.map((lesson) => (
                      <li key={lesson} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-400" /> {lesson}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-950">Instructor</h2>
            <div className="mt-4 flex items-start gap-4 rounded-xl card-surface p-5">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sky-100 text-lg font-bold text-royal-600">
                {course.instructor.name.charAt(0)}
              </span>
              <div>
                <p className="font-semibold text-navy-950">{course.instructor.name}</p>
                <p className="text-sm text-royal-600">{course.instructor.title}</p>
                <p className="mt-2 text-sm text-muted">{course.instructor.bio}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="sticky top-24 rounded-2xl card-surface p-6">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-navy-950">₹{course.price.toLocaleString("en-IN")}</span>
              <span className="text-sm text-muted line-through">₹{course.mrp.toLocaleString("en-IN")}</span>
            </div>
            <p className="mt-1 text-xs font-medium text-gold-600">
              {Math.round((1 - course.price / course.mrp) * 100)}% off — limited time
            </p>

            <Button href={`/checkout/${course.slug}`} size="lg" className="mt-5 w-full">
              Enroll Now
            </Button>

            <ul className="mt-6 space-y-3 text-sm text-navy-800">
              <li className="flex items-center justify-between border-b border-line pb-3">
                <span className="text-muted">Duration</span>
                <span className="font-medium">{course.duration}</span>
              </li>
              <li className="flex items-center justify-between border-b border-line pb-3">
                <span className="text-muted">Level</span>
                <span className="font-medium">{course.level}</span>
              </li>
              <li className="flex items-center justify-between border-b border-line pb-3">
                <span className="text-muted">Language</span>
                <span className="font-medium">{course.language}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted">Certificate</span>
                <span className="font-medium">Yes, on completion</span>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {related.length > 0 ? (
        <section className="section-tint py-14 lg:py-20">
          <Container>
            <h2 className="text-2xl font-bold text-navy-950">More in {course.categoryName}</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <CourseCard key={item.slug} course={item} index={index} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </div>
  );
}
