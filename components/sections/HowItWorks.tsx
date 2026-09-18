import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookIcon, CheckIcon, PlayIcon, ShieldIcon } from "@/components/icons";

const steps = [
  { icon: BookIcon, title: "Choose Course", description: "Browse categories and pick the course that fits your goals." },
  { icon: CheckIcon, title: "Enroll", description: "Sign up in minutes with your basic details." },
  { icon: ShieldIcon, title: "Make Payment", description: "Pay securely through our Namma API payment gateway." },
  { icon: PlayIcon, title: "Start Learning", description: "Get instant access and begin your course right away." },
];

export function HowItWorks() {
  return (
    <section className="section-tint py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title="Get started in four simple steps"
          description="A simple, guided journey from choosing a course to learning with full access."
        />

        <div className="relative mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute top-8 left-0 hidden h-px w-full bg-line lg:block" aria-hidden="true" />
          {steps.map((step, index) => (
            <div key={step.title} className="relative flex flex-col items-center text-center">
              <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full brand-gradient text-white shadow-md shadow-navy-900/20">
                <step.icon className="h-7 w-7" />
              </span>
              <span className="mt-4 text-xs font-semibold uppercase tracking-wide text-gold-600">Step {index + 1}</span>
              <h3 className="mt-1 text-lg font-semibold text-navy-950">{step.title}</h3>
              <p className="mt-2 max-w-[16rem] text-sm text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
