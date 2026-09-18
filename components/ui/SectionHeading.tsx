import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left", className)}>
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-royal-600">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-relaxed text-muted">{description}</p> : null}
    </div>
  );
}
