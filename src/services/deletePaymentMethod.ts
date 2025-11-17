export interface DeletePaymentMethodResponse {
  success: boolean;
  message: string;
  payment_method_id: string;
}

/**
 * Delete a payment method for the authenticated user
 * DELETE /api/payments/payment-methods/{payment_method_id}
 */
export async function deletePaymentMethod(
  paymentMethodId: string
): Promise<DeletePaymentMethodResponse> {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/payments/payment-methods/${paymentMethodId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!resp.ok) {
    const errorData = await resp.json().catch(() => ({ error: "Unknown error" }));
    const errorMessage = errorData.detail || errorData.error || `HTTP ${resp.status}`;
    console.error("Failed to delete payment method:", resp.status, errorMessage);
    throw new Error(`Failed to delete payment method: ${errorMessage}`);
  }

  const data = await resp.json();
  return data;
}

