import Image from "next/image";
import Link from "next/link";
import { footerLinks, socialLinks } from "@/lib/data/nav";
import { CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL, getWhatsAppLink } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/icons";

const socialGlyph: Record<string, string> = {
  facebook: "f",
  instagram: "◎",
  linkedin: "in",
  youtube: "▶",
};

export function Footer() {
  return (
    <footer className="border-t border-line bg-navy-950 text-sky-100">
      <div className="container-edu grid gap-10 py-14 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.jpeg"
              alt="Basavashree Education"
              width={44}
              height={44}
              className="h-11 w-11 rounded-lg bg-white object-contain p-0.5"
            />
            <span className="text-lg font-bold text-white">
              Basavashree <span className="text-sky-400">Education</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-sky-200/80">
            A modern Pan-India learning platform making quality, practical education accessible to every student and career learner.
          </p>
          <div className="mt-5 flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white transition-colors hover:bg-sky-500"
              >
                {socialGlyph[social.icon]}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-sky-400">Company</h4>
          <ul className="mt-4 space-y-3 text-sm">
            {footerLinks.company.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sky-200/80 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-sky-400">Legal</h4>
          <ul className="mt-4 space-y-3 text-sm">
            {footerLinks.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sky-200/80 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-sky-400">Get in Touch</h4>
          <ul className="mt-4 space-y-3 text-sm text-sky-200/80">
            <li>{CONTACT_ADDRESS}</li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white">
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a href={`tel:${CONTACT_PHONE_TEL}`} className="hover:text-white">
                {CONTACT_PHONE_DISPLAY}
              </a>
            </li>
          </ul>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1fb857]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container-edu flex flex-col items-center justify-between gap-2 text-xs text-sky-200/70 sm:flex-row">
          <p>© {new Date().getFullYear()} Basavashree Education. All rights reserved.</p>
          <p>
            Developed under{" "}
            <a
              href="https://nammaapi.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sky-200/70 hover:text-sky-400"
            >
              nammaapi.in
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
