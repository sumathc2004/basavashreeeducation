import { categories } from "@/lib/data/categories";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryCard } from "@/components/ui/CategoryCard";

export const metadata = {
  title: "Categories | Basavashree Education",
  description: "Browse all course categories offered by Basavashree Education.",
};

export default function CategoriesPage() {
  return (
    <section className="py-14 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Categories"
          title="Browse courses by category"
          description="Six focused learning tracks covering technical, career and professional skills."
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
