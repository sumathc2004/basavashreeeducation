import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = { title: "Terms & Conditions | Basavashree Education" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" updatedAt="18 September 2026">
      <section>
        <h2 className="text-lg font-semibold text-navy-950">1. Acceptance of Terms</h2>
        <p className="mt-2">
          By accessing or using Basavashree Education, you agree to be bound by these Terms &amp; Conditions and our
          Privacy Policy.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-navy-950">2. Course Access</h2>
        <p className="mt-2">
          Course access is granted upon successful payment verification. Access is for personal, non-transferable use
          and may not be resold or shared.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-navy-950">3. Payments</h2>
        <p className="mt-2">
          All course payments are processed securely through Namma API. Prices are listed in Indian Rupees (INR) and
          are inclusive of applicable taxes unless stated otherwise.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-navy-950">4. User Conduct</h2>
        <p className="mt-2">
          You agree not to misuse the platform, attempt unauthorised access, or redistribute course content without
          permission.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-navy-950">5. Changes to Terms</h2>
        <p className="mt-2">
          We may update these terms from time to time. Continued use of the platform after changes constitutes
          acceptance of the updated terms.
        </p>
      </section>
    </LegalPage>
  );
}
