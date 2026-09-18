import { Hero } from "@/components/sections/Hero";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { PopularCourses } from "@/components/sections/PopularCourses";
import { WhyUs } from "@/components/sections/WhyUs";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { CtaSection } from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <PopularCourses />
      <WhyUs />
      <HowItWorks />
      <CtaSection />
    </>
  );
}
