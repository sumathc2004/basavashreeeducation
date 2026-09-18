import { Container } from "@/components/ui/Container";

export function LegalPage({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-14 lg:py-20">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-bold text-navy-950">{title}</h1>
        <p className="mt-2 text-sm text-muted">Last updated: {updatedAt}</p>
        <div className="prose-legal mt-8 space-y-6 text-sm leading-relaxed text-navy-800">{children}</div>
      </Container>
    </section>
  );
}
