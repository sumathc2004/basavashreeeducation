import crypto from "node:crypto";

/**
 * Namma API payment gateway integration.
 *
 * This module is the ONLY place that talks to Namma API. Credentials are read
 * from server-only environment variables and are never sent to the client.
 * Configure real values in `.env.local` (see `.env.example`); until
 * NAMMA_API_BASE_URL / NAMMA_API_KEY are set, the module runs in MOCK MODE so
 * the full checkout flow can be built and demoed before credentials exist.
 */

const NAMMA_API_BASE_URL = process.env.NAMMA_API_BASE_URL ?? "";
const NAMMA_API_KEY = process.env.NAMMA_API_KEY ?? "";
const NAMMA_WEBHOOK_SECRET = process.env.NAMMA_WEBHOOK_SECRET ?? "";

export const NAMMA_MOCK_MODE = !NAMMA_API_BASE_URL || !NAMMA_API_KEY;

export type NammaOrderStatus = "PENDING" | "SUCCESS" | "FAILED";

export type CreateOrderInput = {
  amountInPaise: number;
  reference: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
};

export type NammaOrder = {
  orderId: string;
  status: NammaOrderStatus;
  amount: number;
  reference: string;
  checkoutUrl: string;
};

export type NammaTransaction = {
  transactionId: string;
  status: NammaOrderStatus;
  amount: number;
  reference: string;
  failureReason: string | null;
};

/** Creates a payment collection order with Namma API. */
export async function createPaymentOrder(input: CreateOrderInput): Promise<NammaOrder> {
  if (NAMMA_MOCK_MODE) {
    const orderId = `mock_${crypto.randomUUID()}`;
    return {
      orderId,
      status: "PENDING",
      amount: input.amountInPaise,
      reference: input.reference,
      checkoutUrl: `/payment/gateway/${orderId}`,
    };
  }

  const response = await fetch(`${NAMMA_API_BASE_URL}/api/v1/payments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NAMMA_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: input.amountInPaise,
      reference: input.reference,
      customerEmail: input.customerEmail,
      methods: ["upi", "card", "netbanking"],
    }),
  });

  if (!response.ok) {
    throw new Error(`Namma API create order failed with status ${response.status}`);
  }

  const data = await response.json();
  return {
    orderId: data.orderId,
    status: data.status,
    amount: data.amount,
    reference: data.reference,
    checkoutUrl: data.checkoutUrl,
  };
}

/** Fetches the latest status of a transaction from Namma API. */
export async function getTransactionStatus(orderId: string): Promise<NammaTransaction> {
  if (NAMMA_MOCK_MODE) {
    throw new Error("getTransactionStatus should not be called directly in mock mode — use the mock store instead.");
  }

  const response = await fetch(`${NAMMA_API_BASE_URL}/api/v1/transactions/${orderId}`, {
    headers: { Authorization: `Bearer ${NAMMA_API_KEY}` },
  });

  if (!response.ok) {
    throw new Error(`Namma API transaction lookup failed with status ${response.status}`);
  }

  const data = await response.json();
  return {
    transactionId: data.transactionId,
    status: data.status,
    amount: data.amount,
    reference: data.reference,
    failureReason: data.failureReason ?? null,
  };
}

/** Verifies the HMAC-SHA256 signature Namma API sends on webhook events. */
export function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  if (!NAMMA_WEBHOOK_SECRET) return NAMMA_MOCK_MODE;

  const expected = crypto.createHmac("sha256", NAMMA_WEBHOOK_SECRET).update(rawBody).digest("hex");
  const expectedBuffer = Buffer.from(expected, "utf8");
  const signatureBuffer = Buffer.from(signature, "utf8");

  if (expectedBuffer.length !== signatureBuffer.length) return false;
  return crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
}
