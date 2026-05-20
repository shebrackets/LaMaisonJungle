export type PlantCategory = "classique" | "extérieur" | "plante grasse";

export type PlantLevel = 1 | 2 | 3;

export interface Plant {
  name: string;
  category: PlantCategory;
  id: string;
  light: PlantLevel;
  water: PlantLevel;
  cover: string;
  price: number;
  description: string;
}

export interface CartItem extends Plant {
  amount: number;
}

export interface UseCartReturn {
  cart: CartItem[];
  addToCart: (plant: Plant) => void;
  removeFromCart: (plantName: string) => void;
  updateQuantity: (plantName: string, newAmount: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  getCartItem: (plantName: string) => CartItem | undefined;
}

export type FormFieldName = 'cardNumber' | 'expiryDate' | 'cvv' | 'cardholderName';

export interface PaymentMethod {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName?: string;
}

export interface PaymentData extends PaymentMethod {
  amount: number;
}

export interface PaymentResult {
  success: true;
  transactionId: string;
  amount: number;
  currency: string;
  status: "succeeded";
  timestamp: string;
}

export interface ValidationResult {
  valid: true;
}