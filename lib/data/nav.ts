export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerLinks = {
  company: [
    { href: "/about", label: "About Us" },
    { href: "/courses", label: "Courses" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/legal/privacy-policy", label: "Privacy Policy" },
    { href: "/legal/terms", label: "Terms & Conditions" },
    { href: "/legal/refund-policy", label: "Refund Policy" },
  ],
};
