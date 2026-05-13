import { useState } from "react";
import { PaymentService } from "../services/paymentService";
import type { PaymentData, PaymentResult } from "../services/paymentService";

export interface UsePaymentReturn {
  isProcessing: boolean;
  error: string | null;
  success: boolean;
  transactionResult: PaymentResult | null;
  processPayment: (paymentData: PaymentData) => Promise<PaymentResult>;
  resetPayment: () => void;
}

export const usePayment = (): UsePaymentReturn => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [transactionResult, setTransactionResult] =
    useState<PaymentResult | null>(null);

  const processPayment = async (
    paymentData: PaymentData
  ): Promise<PaymentResult> => {
    setIsProcessing(true);
    setError(null);
    setSuccess(false);
    setTransactionResult(null);

    try {
      const result = await PaymentService.processPayment(paymentData);
      setSuccess(true);
      setTransactionResult(result);
      return result;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Une erreur est survenue";
      setError(message);
      throw err;
    } finally {
      setIsProcessing(false);
    }
  };

  const resetPayment = (): void => {
    setError(null);
    setSuccess(false);
    setTransactionResult(null);
  };

  return {
    isProcessing,
    error,
    success,
    transactionResult,
    processPayment,
    resetPayment,
  };
};