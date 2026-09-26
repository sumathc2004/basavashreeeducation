import { LegalPage } from "@/components/legal/LegalPage";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY } from "@/lib/contact";

export const metadata = { title: "Cancellation & Refund Policy | Basavashree Education" };

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Cancellation & Refund Policy" updatedAt="26 September 2026">
      <section>
        <p>
          This policy explains when you can cancel a course enrollment on Basavashree Education and how refunds are
          processed. It applies to all self-paced and live/batch-based courses purchased through the platform.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-navy-950">1. Cancellation Window</h2>
        <p className="mt-2">
          You may cancel a course enrollment and request a full refund within <strong>7 days</strong> of the date of
          purchase, provided:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Less than 20% of the course content or video lectures have been accessed, and</li>
          <li>No completion certificate has been issued or downloaded for the course.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-navy-950">2. Live Classes and Batch-Based Programs</h2>
        <p className="mt-2">
          For instructor-led live batches, cancellation is allowed only before the batch starts, or within 48 hours of
          the first live class — whichever is earlier. Once 2 or more live sessions have been attended, the
          enrollment is treated as consumed and is no longer eligible for cancellation.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-navy-950">3. Non-Cancellable Enrollments</h2>
        <p className="mt-2">The following are not eligible for cancellation or refund:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Courses where a completion certificate has already been issued.</li>
          <li>Courses purchased under a special festive or clearance offer marked as a final sale.</li>
          <li>
            Printed study material or course kits once dispatched — their cost will be deducted from any approved
            refund.
          </li>
          <li>Free or trial courses, since no payment has been made.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-navy-950">4. How to Cancel</h2>
        <p className="mt-2">
          Go to <strong>Dashboard → Payment History</strong>, or contact our support team at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-royal-600 hover:underline">
            {CONTACT_EMAIL}
          </a>{" "}
          or WhatsApp us at {CONTACT_PHONE_DISPLAY} with your Order ID and the reason for cancellation. Cancellation
          requests are reviewed within 2 business days.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-navy-950">5. Failed or Duplicate Payments</h2>
        <p className="mt-2">
          If a payment is deducted but enrollment is not confirmed due to a technical issue with the Namma API
          payment gateway, the amount is refunded automatically within 5–7 business days.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-navy-950">6. Refund Processing Time</h2>
        <p className="mt-2">
          Once a cancellation is approved, refunds are credited back to the original payment method within{" "}
          <strong>5–10 business days</strong>, depending on your bank or payment provider. Any applicable payment
          gateway or transaction fees may be deducted from the refunded amount.
        </p>
      </section>
    </LegalPage>
  );
}
