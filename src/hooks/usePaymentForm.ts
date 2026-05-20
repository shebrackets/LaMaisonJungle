import { useState } from "react";
import type { FormFieldName } from "../types";

export interface FormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

export type FormErrors = Partial<Record<FormFieldName, string | null>>;

export interface UsePaymentFormReturn {
  formData: FormData;
  errors: FormErrors;
  updateField: (name: FormFieldName, value: string) => void;
  validateField: (name: FormFieldName, value: string) => string | null;
  validateForm: () => boolean;
  formatCardNumber: (value: string) => string;
  formatExpiryDate: (value: string) => string;
  resetForm: () => void;
}

const INITIAL_FORM_DATA: FormData = {
  cardNumber: "",
  expiryDate: "",
  cvv: "",
  cardholderName: "",
};

export const usePaymentForm = (): UsePaymentFormReturn => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});

  const updateField = (name: FormFieldName, value: string): void => {
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev: FormErrors) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateField = (name: FormFieldName, value: string): string | null => {
    switch (name) {
      case "cardNumber": {
        const cleanCardNumber = value.replace(/\s/g, "");
        if (!cleanCardNumber.match(/^\d{13,19}$/)) {
          return "Numéro de carte invalide";
        }
        break;
      }
      case "expiryDate": {
        if (!value.match(/^\d{2}\/\d{2}$/)) {
          return "Format de date invalide (MM/AA)";
        }
        const [month, year] = value.split("/");
        const currentDate = new Date();
        const expiryDate = new Date(
          2000 + parseInt(year ?? "0", 10),
          parseInt(month ?? "0", 10) - 1
        );
        if (expiryDate < currentDate) {
          return "Carte expirée";
        }
        break;
      }
      case "cvv": {
        if (!value.match(/^\d{3,4}$/)) {
          return "Code de sécurité invalide";
        }
        break;
      }
      case "cardholderName": {
        if (!value.trim()) {
          return "Nom du titulaire requis";
        }
        if (value.trim().length < 2) {
          return "Nom trop court";
        }
        break;
      }
      default:
        return null;
    }
    return null;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as FormFieldName[]).forEach((fieldName) => {
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const formatCardNumber = (value: string): string => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) ?? "";
    const parts: string[] = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : v;
  };

  const formatExpiryDate = (value: string): string => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const resetForm = (): void => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
  };

  return {
    formData,
    errors,
    updateField,
    validateField,
    validateForm,
    formatCardNumber,
    formatExpiryDate,
    resetForm,
  };
};