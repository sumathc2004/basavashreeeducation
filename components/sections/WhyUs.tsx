import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AwardIcon, BookIcon, ClockIcon, ShieldIcon, TargetIcon, UserIcon } from "@/components/icons";

const reasons = [
  {
    icon: BookIcon,
    title: "Structured Learning",
    description: "Well-organised curriculums that take you step by step from basics to real-world application.",
  },
  {
    icon: TargetIcon,
    title: "Practical Knowledge",
    description: "Every course is built around hands-on exercises and projects, not just theory.",
  },
  {
    icon: UserIcon,
    title: "Expert-Led Courses",
    description: "Learn from experienced instructors and industry professionals who know what actually matters.",
  },
  {
    icon: ClockIcon,
    title: "Flexible Learning",
    description: "Learn at your own pace, on your own schedule, from any device.",
  },
  {
    icon: AwardIcon,
    title: "Career-Oriented Education",
    description: "Courses mapped to real career and job outcomes, not just certificates.",
  },
  {
    icon: ShieldIcon,
    title: "Accessible Learning",
    description: "Affordable pricing and bilingual support to make quality education accessible to all.",
  },
];

export function WhyUs() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Why Basavashree Education"
          title="A platform built around real learning outcomes"
          description="We focus on what actually helps learners grow — practical skills, expert guidance and flexible access."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <div key={reason.title} className="rounded-2xl card-surface p-6 transition-shadow hover:shadow-lg hover:shadow-navy-900/5">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-royal-600">
                <reason.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-navy-950">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{reason.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
