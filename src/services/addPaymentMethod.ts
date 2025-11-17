export interface AddPaymentMethodRequest {
  payment_method_id: string;
}

export interface AddPaymentMethodResponse {
  success: boolean;
  payment_method: any;
  stripe_customer_id: string;
  message: string;
}

/**
 * Add a payment method to the user's Stripe customer
 * The payment_method_id should be created using Stripe.js first
 */
export async function addPaymentMethod(
  paymentMethodId: string
): Promise<AddPaymentMethodResponse> {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/payments/payment-methods`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        payment_method_id: paymentMethodId,
      }),
    }
  );

  if (!resp.ok) {
    const errorData = await resp.json().catch(() => ({ error: "Unknown error" }));
    const errorMessage = errorData.detail || errorData.error || `HTTP ${resp.status}`;
    console.error("Failed to add payment method:", resp.status, errorMessage);
    throw new Error(`Failed to add payment method: ${errorMessage}`);
  }

  const data = await resp.json();
  return data;
}

