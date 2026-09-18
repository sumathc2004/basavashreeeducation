import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CtaSection() {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl brand-gradient px-8 py-14 text-center sm:px-16">
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-gold-400/20" />
          <h2 className="relative text-3xl font-bold text-white sm:text-4xl">Ready to start learning?</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-base text-sky-100">
            Join thousands of learners building practical, career-ready skills with Basavashree Education.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/courses" variant="secondary" size="lg">
              Explore Courses
            </Button>
            <Button href="/register" variant="light" size="lg">
              Get Started
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
