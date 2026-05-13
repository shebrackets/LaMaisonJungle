import { useState, useEffect } from "react";
import type { Plant } from "../datas/plantList";

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

export const useCart = (): UseCartReturn => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart) as CartItem[]);
      } catch (error) {
        console.error("Erreur lors du chargement du panier:", error);
        setCart([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (plant: Plant): void => {
    setCart((prevCart: CartItem[]) => {
      const existingItem = prevCart.find((item) => item.name === plant.name);

      if (existingItem) {
        return prevCart.map((item) =>
          item.name === plant.name
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...plant, amount: 1 }];
      }
    });
  };

  const removeFromCart = (plantName: string): void => {
    setCart((prevCart: CartItem[]) =>
      prevCart.filter((item) => item.name !== plantName)
    );
  };

  const updateQuantity = (plantName: string, newAmount: number): void => {
    if (newAmount <= 0) {
      removeFromCart(plantName);
      return;
    }

    setCart((prevCart: CartItem[]) =>
      prevCart.map((item) =>
        item.name === plantName ? { ...item, amount: newAmount } : item
      )
    );
  };

  const clearCart = (): void => {
    setCart([]);
  };

  const getTotal = (): number => {
    return cart.reduce<number>(
      (total: number, item: CartItem) => total + item.price * item.amount,
      0
    );
  };

  const getItemCount = (): number => {
    return cart.reduce<number>(
      (count: number, item: CartItem) => count + item.amount,
      0
    );
  };

  const getCartItem = (plantName: string): CartItem | undefined => {
    return cart.find((cartItem: CartItem) => cartItem.name === plantName);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
    getCartItem,
  };
};