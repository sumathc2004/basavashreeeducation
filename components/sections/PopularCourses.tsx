import { courses } from "@/lib/data/courses";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CourseCard } from "@/components/ui/CourseCard";
import { Button } from "@/components/ui/Button";

export function PopularCourses() {
  const popular = courses.slice(0, 6);

  return (
    <section className="section-tint py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Popular Courses"
          title="Learn from courses trusted by thousands"
          description="Practical, instructor-led courses designed for real skill-building — not just certificates."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((course, index) => (
            <CourseCard key={course.slug} course={course} index={index} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button href="/courses" variant="outline" size="lg">
            View All Courses
          </Button>
        </div>
      </Container>
    </section>
  );
}
