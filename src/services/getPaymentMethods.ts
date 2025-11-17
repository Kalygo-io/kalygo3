export interface PaymentMethod {
  id: string;
  type: string;
  card?: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
  billing_details?: {
    name?: string;
  };
  isDefault?: boolean;
}

/**
 * Get saved payment methods from Stripe
 * Uses a Next.js API route that reads the JWT cookie server-side
 * and forwards the request with Bearer token authentication
 */
export async function getPaymentMethods(): Promise<PaymentMethod[]> {
  const resp = await fetch("/api/payment-methods", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!resp.ok) {
    const errorData = await resp.json().catch(() => ({ error: "Unknown error" }));
    const errorMessage = errorData.error || `HTTP ${resp.status}`;
    console.error("Failed to get payment methods:", resp.status, errorMessage);
    throw new Error(`Failed to get payment methods: ${errorMessage}`);
  }

  const data = await resp.json();
  return data.paymentMethods || [];
}

