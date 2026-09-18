import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CoursesGridClient } from "./CoursesGridClient";

export const metadata = {
  title: "Courses | Basavashree Education",
  description: "Browse all courses offered by Basavashree Education across programming, web development, data and career skills.",
};

export default function CoursesPage() {
  return (
    <section className="py-14 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="All Courses"
          title="Explore our full course library"
          description="Filter by category to find the course that matches your learning goals."
        />
        <Suspense fallback={null}>
          <CoursesGridClient />
        </Suspense>
      </Container>
    </section>
  );
}
