import { categories } from "@/lib/data/categories";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryCard } from "@/components/ui/CategoryCard";

export function CategoryGrid() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Course Categories"
          title="Find the right learning path for you"
          description="From programming to career-ready professional skills, explore courses organised into focused categories."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
}
