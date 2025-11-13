import { create } from 'zustand';
import { Discount } from '../types';

interface DiscountState {
  discount: Discount | null;
  setDiscount: (discount: Discount) => void;
  clearDiscount: () => void;
}

export const useDiscountStore = create<DiscountState>((set) => ({
  discount: null,
  isDiscountAvailable: true,

  setDiscount: (discount: Discount) =>
    set({ discount }),

  clearDiscount: () =>
    set({ discount: null }),

  reduceExpiryTime: () =>
    set((state) => {
      if (!state.discount) return state;
      return {
        discount: state.discount,
      };
    }),
}));
