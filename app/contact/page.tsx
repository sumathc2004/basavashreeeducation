import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { ContactForm } from "./ContactForm";
import { CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL, getWhatsAppLink } from "@/lib/contact";

export const metadata = {
  title: "Contact Us | Basavashree Education",
  description: "Get in touch with the Basavashree Education team.",
};

const details = [
  { icon: MapPinIcon, title: "Address", value: CONTACT_ADDRESS, href: undefined },
  { icon: MailIcon, title: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { icon: PhoneIcon, title: "Phone", value: CONTACT_PHONE_DISPLAY, href: `tel:${CONTACT_PHONE_TEL}` },
];

export default function ContactPage() {
  return (
    <section className="py-14 lg:py-20">
      <Container>
        <SectionHeading eyebrow="Contact Us" title="We'd love to hear from you" description="Have a question about a course or need help enrolling? Send us a message." />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {details.map((detail) => (
              <div key={detail.title} className="flex items-start gap-4 rounded-2xl card-surface p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-royal-600">
                  <detail.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-950">{detail.title}</p>
                  {detail.href ? (
                    <a href={detail.href} className="mt-1 block text-sm text-muted hover:text-royal-600">
                      {detail.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm text-muted">{detail.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="flex items-start gap-4 rounded-2xl bg-[#25D366]/10 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white">
                <WhatsAppIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-navy-950">WhatsApp</p>
                <p className="mt-1 text-sm text-muted">Chat with us instantly for quick answers.</p>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1fb857]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
