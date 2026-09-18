import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { AwardIcon, BookIcon, PlayIcon, StarIcon, UserIcon } from "@/components/icons";
import { categories } from "@/lib/data/categories";

export function Hero() {
  return (
    <section className="section-tint relative isolate overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-sky-300) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-1/3 h-80 w-80 rounded-full bg-royal-500/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-gold-400/15 blur-3xl" />

      <Container className="relative flex min-h-[calc(100vh-4.5rem)] flex-col justify-center py-14 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-royal-600">
              Pan-India Online Learning Platform
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.1]">
              Learn Today. <span className="brand-gradient-text">Build Your Future.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              Quality learning programs designed to help students and learners build practical knowledge, skills and
              confidence — anytime, anywhere.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/courses" size="lg" variant="primary">
                Explore Courses
              </Button>
              <Button href="/register" size="lg" variant="outline">
                Get Started
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-royal-600" />
                <span><strong className="text-navy-950">25,000+</strong> Learners</span>
              </div>
              <div className="flex items-center gap-2">
                <BookIcon className="h-5 w-5 text-royal-600" />
                <span><strong className="text-navy-950">50+</strong> Courses</span>
              </div>
              <div className="flex items-center gap-2">
                <StarIcon className="h-5 w-5 text-gold-500" />
                <span><strong className="text-navy-950">4.8/5</strong> Rating</span>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative rounded-3xl brand-gradient p-8 shadow-xl shadow-navy-900/20">
              <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-sky-300/30" />
              <div className="pointer-events-none absolute -bottom-8 -left-6 h-32 w-32 rounded-full bg-gold-400/20" />

              <div className="relative rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">Continue Learning</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                    <PlayIcon className="h-4 w-4 text-white" />
                  </span>
                </div>
                <p className="mt-3 text-lg font-bold text-white">Full-Stack Web Development</p>
                <div className="mt-4 h-2 w-full rounded-full bg-white/20">
                  <div className="h-2 w-2/3 rounded-full bg-gold-400" />
                </div>
                <p className="mt-2 text-xs text-sky-100">65% complete</p>
              </div>

              <div className="relative mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                  <AwardIcon className="h-6 w-6 text-gold-400" />
                  <p className="mt-2 text-sm font-semibold text-white">Certified Programs</p>
                </div>
                <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                  <UserIcon className="h-6 w-6 text-sky-300" />
                  <p className="mt-2 text-sm font-semibold text-white">Expert Mentors</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-2xl card-surface p-4 shadow-md shadow-navy-900/5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-600">
                <StarIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-navy-950">4.8 out of 5</p>
                <p className="text-xs text-muted">from 12,000+ learner reviews</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-navy-900/10 pt-8">
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-muted">
            Explore learning tracks across
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <span
                key={category.slug}
                className="rounded-full border border-navy-900/10 bg-white px-4 py-2 text-sm font-medium text-navy-800"
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
