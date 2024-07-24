import React from 'react';
import { useGetWishlistQuery, useDeleteFromWishlistMutation, useClearWishlistMutation } from '../store/actions/wishlist';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCart from './cart/addCart';

const Wishlist: React.FC = () => {
  const { data, error, isLoading } = useGetWishlistQuery();
  const [deleteFromWishlist] = useDeleteFromWishlistMutation();
  const [clearWishlist] = useClearWishlistMutation();
  const navigate = useNavigate();

  const wishlist = data?.data || [];

  if (isLoading) return <p>Loading...</p>;
  if (error) {
    toast.error('Failed to load the wishlist.');
    return <p>Failed to load the wishlist.</p>;
  }

  const handleDeleteFromWishlist = async (productId: string) => {
    try {
      await deleteFromWishlist({ productId }).unwrap();
      toast.success('Product removed from wishlist successfully');
    } catch (err) {
      console.error('Failed to delete from wishlist:', err);
      toast.error('Failed to delete from wishlist');
    }
  };

  const handleClearWishlist = async () => {
    try {
      await clearWishlist().unwrap();
      toast.success('Wishlist cleared successfully');
    } catch (err) {
      console.error('Failed to clear wishlist:', err);
      toast.error('Failed to clear wishlist');
    }
  };

  const handleRedirect = () => {
    navigate('/');
  };

  const wishlistItemCount = wishlist.length;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-black">Your Wishlist</h1>
        <div className="flex items-center space-x-4">
          {wishlistItemCount > 0 && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-red-500"
              onClick={handleClearWishlist}
            >
              Clear Wishlist
            </button>
          )}
        </div>
      </div>
      {wishlist.length > 0 ? (
        <ul className="space-y-4">
          {wishlist.map((item: any) => (
            <li key={item.id} className="p-4 bg-white shadow-md rounded-md flex justify-between items-center">
              <div className="p-3 flex gap-4">
                <img src={item.product.images[0]} alt={item.product.productName} className="w-20 h-20 rounded-md object-cover" />
                <span className="pt-8 font-medium font-serif">{item.product.productName}</span>
              </div>
              <div className="space-x-2 flex items-center">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                  onClick={() => handleDeleteFromWishlist(item.product.id)}
                >
                  Remove
                </button>
                <AddCart productId={item.product.id} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-lg font-medium mb-4">No items on your wishlist</p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleRedirect}
          >
            Add Items to Wishlist
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Wishlist;