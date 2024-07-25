import { Heart, ScanEye, Star } from 'lucide-react';
import AddCart from '../cart/addCart';
import { useAddToWishlistMutation } from '../../store/actions/wishlist'; 
import 'react-toastify/dist/ReactToastify.css';
import { Button, notification } from 'antd';
import { Link } from "react-router-dom";

function ProductCard({ popularProducts }: { popularProducts: any }) {
  const [addToWishlist] = useAddToWishlistMutation();

  const productImage =
    popularProducts.images && popularProducts.images.length > 0
      ? popularProducts.images[0]
      : 'https://via.placeholder.com/200';

  const handleAddToWishlist = async () => {
    try {
      await addToWishlist({ productId: popularProducts.id }).unwrap();
      notification.success({message:'Product added to wishlist successfully'});
    } catch (err) {
      console.error('Failed to add to wishlist:', err);
      notification.error({message: 'Failed to add to wishlist'});
    }
  };

  return (
    <div className="min-w-64 sm:w-72 w-full h-[21rem] bg-white p-2 rounded-2xl shadow-md">
      <div
        style={{
          backgroundImage: `url(${productImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        className="p-2 h-[75%] flex flex-col items-end rounded-xl"
      >
        <div className="flex flex-col gap-2">
          <div className="bg-primary-300 p-1 rounded-lg text-white">
            <Link to={`product/${popularProducts.id}`}><ScanEye /></Link>
          </div>
          <div>
            <Button
              className="bg-primary-300 p-1 rounded-lg text-white"
              onClick={handleAddToWishlist}
            >
              <Heart />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-end mt-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <Star width={20} className="text-primary-300" />
            <span className="text-sm text-gray-500">
              ({`${popularProducts.totalReviewRating} Reviews`})
            </span>
          </div>
          <p className="text-black font-semibold text-sm sm:text-base">
            {popularProducts.productName}
          </p>
          <p className="text-black font-bold text-sm sm:text-base">
            ${popularProducts.price}
          </p>
        </div>
        <AddCart productId={popularProducts.id} />
      </div>
    </div>
  );
}

export default ProductCard;