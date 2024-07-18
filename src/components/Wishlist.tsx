import React from 'react';
import { useGetWishlistQuery, useAddToWishlistMutation, useDeleteFromWishlistMutation } from '../store/actions/wishlist';

const Wishlist: React.FC = () => {
  const { data: wishlist, error, isLoading } = useGetWishlistQuery();
  const [addToWishlist] = useAddToWishlistMutation();
  const [deleteFromWishlist] = useDeleteFromWishlistMutation();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load the wishlist.</p>;

  const handleAddToWishlist = async (productId: string) => {
    try {
      await addToWishlist({ productId }).unwrap();
    } catch (err) {
      console.error('Failed to add to wishlist:', err);
    }
  };

  const handleDeleteFromWishlist = async (productId: string) => {
    try {
      await deleteFromWishlist({ productId }).unwrap();
    } catch (err) {
      console.error('Failed to delete from wishlist:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      <ul className="space-y-4">
        {wishlist.map((item: any) => (
          <li key={item.id} className="p-4 bg-white shadow-md rounded-md flex justify-between items-center">
            <span>{item.name}</span>
            <div className="space-x-2">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={() => handleDeleteFromWishlist(item.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Example Add to Wishlist Button */}
      <div className="mt-6">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md"
          onClick={() => handleAddToWishlist('example-product-id')}
        >
          Add Example Product to Wishlist
        </button>
      </div>
    </div>
  );
};

export default Wishlist;
