import { ShoppingCart } from "lucide-react";

export const CartButton = ({ rounded }: { rounded: string }) => {
  return (
    <button
      className={`flex gap-3 bg-primary-300 w-fit py-4 px-8 text-white ${rounded}`}
    >
      <p>Shop Now</p>
      <ShoppingCart />
    </button>
  );
};
