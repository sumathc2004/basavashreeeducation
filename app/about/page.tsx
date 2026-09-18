import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { AwardIcon, BookIcon, ShieldIcon, TargetIcon, UserIcon } from "@/components/icons";

export const metadata = {
  title: "About Us | Basavashree Education",
  description: "Learn about Basavashree Education's mission to make quality, practical learning accessible across India.",
};

const values = [
  { icon: TargetIcon, title: "Practical First", description: "Every course is designed around real skills learners can apply immediately." },
  { icon: UserIcon, title: "Learner-Centric", description: "We build for students, working professionals and career switchers alike." },
  { icon: ShieldIcon, title: "Trust & Transparency", description: "Clear pricing, honest content and secure payments, every time." },
  { icon: AwardIcon, title: "Career Outcomes", description: "Courses mapped to real job and career readiness, not just certificates." },
];

const stats = [
  { label: "Learners Enrolled", value: "25,000+" },
  { label: "Courses Offered", value: "50+" },
  { label: "Expert Instructors", value: "40+" },
  { label: "Average Rating", value: "4.8/5" },
];

export default function AboutPage() {
  return (
    <div>
      <section className="section-tint py-16 lg:py-24">
        <Container className="text-center">
          <SectionHeading
            eyebrow="About Basavashree Education"
            title="Making quality learning accessible, practical and career-ready"
            description="Basavashree Education is a modern, Pan-India online learning platform. We bring together experienced instructors, structured curriculums and flexible learning to help students and working professionals build real, usable skills."
          />
          <div className="mt-8 flex justify-center">
            <Button href="/courses" size="lg">
              Explore Our Courses
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl card-surface p-6 text-center">
                <p className="text-2xl font-bold text-navy-950 sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-tint py-16 lg:py-24">
        <Container>
          <SectionHeading eyebrow="Our Values" title="What guides how we build Basavashree Education" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl card-surface p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-royal-600">
                  <value.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-navy-950">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-royal-600">
              Our Mission
            </span>
            <h2 className="mt-4 text-2xl font-bold text-navy-950 sm:text-3xl">
              Bridging the gap between learning and real career outcomes
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              We believe education should be practical, affordable and accessible — regardless of where you live or
              what stage of your career you&apos;re at. Basavashree Education combines structured curriculums, expert
              instructors and a flexible learning experience to help every learner move forward with confidence.
            </p>
          </div>
          <div className="rounded-3xl brand-gradient p-8 text-white">
            <BookIcon className="h-10 w-10 text-sky-200" />
            <p className="mt-4 text-lg font-semibold">
              &ldquo;Our goal is simple — help learners build skills they can actually use.&rdquo;
            </p>
            <p className="mt-3 text-sm text-sky-100">Basavashree Education Team</p>
          </div>
        </Container>
      </section>
    </div>
  );
}
