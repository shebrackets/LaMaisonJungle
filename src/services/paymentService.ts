import type { PaymentData, PaymentMethod, PaymentResult, ValidationResult } from "../types";

export class PaymentService {
  static async processPayment(paymentData: PaymentData): Promise<PaymentResult> {
    await new Promise<void>((resolve) => setTimeout(resolve, 2000));

    const isSuccess: boolean = Math.random() > 0.2;

    if (isSuccess) {
      return {
        success: true,
        transactionId: `txn_${Date.now()}_${Math.random()
          .toString(36)
          .substring(2, 11)}`,
        amount: paymentData.amount,
        currency: "EUR",
        status: "succeeded",
        timestamp: new Date().toISOString(),
      };
    } else {
      throw new Error(
        "Paiement refusé. Veuillez vérifier vos informations de paiement."
      );
    }
  }

  static async validatePaymentMethod(
    paymentMethod: PaymentMethod
  ): Promise<ValidationResult> {
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));

    const isValid: boolean =
      paymentMethod.cardNumber.length >= 13 &&
      paymentMethod.expiryDate.length > 0 &&
      paymentMethod.cvv.length >= 3;

    if (!isValid) {
      throw new Error("Informations de paiement invalides");
    }

    return { valid: true };
  }
}