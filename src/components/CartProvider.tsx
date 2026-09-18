"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { CartItem } from "@/lib/types";

const STORAGE_KEY = "steenberg-cart";
const CHANGE_EVENT = "steenberg-cart-change";

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  hasItem: (id: string) => boolean;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

function parseCart(raw: string): CartItem[] {
  try {
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => item && typeof item.id === "string");
  } catch {
    return [];
  }
}

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) ?? "[]";
}

function getServerSnapshot() {
  return "[]";
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
  };
}

function writeCart(items: CartItem[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const items = useMemo(() => parseCart(raw), [raw]);

  const addItem = useCallback((item: CartItem) => {
    const current = parseCart(getSnapshot());
    if (current.some((existing) => existing.id === item.id)) return;
    writeCart([...current, item]);
  }, []);

  const removeItem = useCallback((id: string) => {
    writeCart(parseCart(getSnapshot()).filter((item) => item.id !== id));
  }, []);

  const clear = useCallback(() => writeCart([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      removeItem,
      clear,
      hasItem: (id: string) => items.some((item) => item.id === id),
      count: items.length,
      subtotal: items.reduce((sum, item) => sum + item.price_zar, 0),
    }),
    [addItem, clear, items, removeItem],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
