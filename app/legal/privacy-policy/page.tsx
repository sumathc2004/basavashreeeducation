import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = { title: "Privacy Policy | Basavashree Education" };

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updatedAt="18 September 2026">
      <section>
        <h2 className="text-lg font-semibold text-navy-950">1. Information We Collect</h2>
        <p className="mt-2">
          We collect information you provide directly, such as your name, email address and phone number during
          registration or checkout, along with course activity and payment records related to your account.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-navy-950">2. How We Use Your Information</h2>
        <p className="mt-2">
          Your information is used to provide course access, process payments through our payment partner, send
          enrollment confirmations, and improve our learning platform.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-navy-950">3. Payment Information</h2>
        <p className="mt-2">
          Payments are processed through Namma API. Basavashree Education does not store your card, UPI or banking
          credentials on its own servers — these are handled directly by the payment gateway.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-navy-950">4. Data Sharing</h2>
        <p className="mt-2">
          We do not sell your personal data. Information is shared only with service providers (such as our payment
          gateway) strictly to the extent required to deliver our services.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-navy-950">5. Contact Us</h2>
        <p className="mt-2">
          For any privacy-related queries, reach out to us at hello@basavashreeeducation.com.
        </p>
      </section>
    </LegalPage>
  );
}
