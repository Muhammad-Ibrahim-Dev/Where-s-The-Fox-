import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, CartItem, ShirtSize } from ;

// 1. Define what actions the store can perform
interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (product: Product, size: ShirtSize, color: string) => void;
  removeItem: (productId: string, size: ShirtSize) => void;
  toggleCart: () => void;
  getTotalPrice: () => number;
}

// 2. Create the store with automatic browser LocalStorage saving ("persist")
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,

      // Logic for adding an item
      addItem: (product, size, color) => {
        set((state) => {
          // Check if the item (same product + same size) is already in the bag
          const existingIndex = state.items.findIndex(
            (item) => item.product.id === product.id && item.selectedSize === size
          );

          if (existingIndex > -1) {
            // If it exists, increase quantity by 1
            const updated = [...state.items];
            updated[existingIndex].quantity += 1;
            return { items: updated, isCartOpen: true };
          }

          // Otherwise, add a new item to the array
          return {
            items: [...state.items, { product, selectedSize: size, selectedColor: color, quantity: 1 }],
            isCartOpen: true, // Automatically slide open the bag
          };
        });
      },

      // Remove item logic
      removeItem: (productId, size) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.product.id === productId && item.selectedSize === size)
          ),
        }));
      },

      // Toggle drawer open/closed
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      // Calculate total price
      getTotalPrice: () => {
        return get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      },
    }),
    {
      name: "wtf-cart-storage", // Key used in LocalStorage
    }
  )
);