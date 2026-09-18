import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = { title: "Refund Policy | Basavashree Education" };

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund Policy" updatedAt="18 September 2026">
      <section>
        <h2 className="text-lg font-semibold text-navy-950">1. Eligibility</h2>
        <p className="mt-2">
          Refund requests are accepted within 7 days of enrollment, provided less than 20% of the course content has
          been accessed.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-navy-950">2. Failed or Duplicate Payments</h2>
        <p className="mt-2">
          If a payment is deducted but enrollment is not confirmed due to a technical issue with the Namma API
          payment gateway, the amount will be refunded automatically within 5–7 business days.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-navy-950">3. How to Request a Refund</h2>
        <p className="mt-2">
          Contact our support team at hello@basavashreeeducation.com with your Order ID and reason for the refund
          request.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-navy-950">4. Processing Time</h2>
        <p className="mt-2">
          Approved refunds are credited back to the original payment method within 5–10 business days, depending on
          your bank or payment provider.
        </p>
      </section>
    </LegalPage>
  );
}
