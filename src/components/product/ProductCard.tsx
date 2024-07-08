import { Heart, ScanEye, ShoppingCart, Star } from "lucide-react";

function ProductCard({ popularProducts }: { popularProducts: any }) {
  return (
    <div className="w-72 min-md:w-60 h-[21rem] bg-white p-2 rounded-2xl shadow-md">
      <div
        style={{
          backgroundImage: `url(${popularProducts.cover})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="p-2 h-[75%] flex flex-col items-end rounded-xl"
      >
        <div className="flex flex-col gap-2">
          <div className="bg-primary-300 p-1 rounded-lg text-white">
            <ScanEye />
          </div>
          <div className="bg-white p-1 rounded-lg text-primary-300">
            <Heart />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-end mt-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <Star width={20} className="text-primary-300" />
            <span className="text-sm text-gray-500">
              ({popularProducts.reviews})
            </span>
          </div>
          <p className="text-black font-semibold">{popularProducts.name}</p>
          <p className="text-black font-bold">${popularProducts.price}</p>
        </div>
        <div className="bg-primary-300 p-1 rounded-lg text-white">
          <ShoppingCart />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;