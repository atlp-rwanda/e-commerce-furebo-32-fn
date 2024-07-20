import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleProduct } from '../redux/slices/productSlice';
import { RootState, AppDispatch } from '../store/store';



const ItemView: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { product:item, loading, error } = useSelector((state: RootState) => state.singleProduct);

  useEffect(() => {
    if (itemId) {
      dispatch(fetchSingleProduct(itemId));
    }
  }, [dispatch, itemId]);

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-xl">Error: {error}</div>;
  console.log(item?.product)
  return (
    <div className="container mx-auto p-4">
      {item ? (
        <>
          <h1 className="text-3xl font-bold mb-4">{item.product.productName}</h1>
          <p className="text-lg mb-2">{item.product.description}</p>
          <p className="text-xl font-semibold">Price: ${item.product.price}</p>
          {/* Add more item details as needed */}
        </>
      ) : (
        <div className="text-center text-xl">Item not found</div>
      )}
    </div>
  );
};

export default ItemView;
