import Link from "next/link";
import { cn } from "@/lib/cn";

type CommonProps = {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "light";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  onClick?: never;
  type?: never;
  disabled?: never;
};

type ButtonAsButton = CommonProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary: "bg-royal-600 text-white hover:bg-navy-900 shadow-sm shadow-royal-600/20",
  secondary: "bg-sky-500 text-white hover:bg-sky-600 shadow-sm shadow-sky-500/20",
  outline: "border border-navy-900/20 text-navy-900 hover:bg-navy-900 hover:text-white",
  ghost: "text-navy-900 hover:bg-sky-100",
  light: "bg-white text-navy-900 hover:bg-sky-100 shadow-sm",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function Button({ variant = "primary", size = "md", className, children, href, ...rest }: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { onClick, type = "button", disabled } = rest as ButtonAsButton;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
