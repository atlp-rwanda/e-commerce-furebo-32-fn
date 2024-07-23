import { ShoppingCart } from 'lucide-react';
import { useAddToCartMutation, useViewCartQuery } from '../../store/actions/cart';
import { Button, notification } from 'antd';

interface AddCartProps {
  productId: string;
}

function AddCart({ productId }: AddCartProps) {
  const [addProductToCart, { isLoading }] = useAddToCartMutation();
  

  const handleAddToCart = async () => {
    try {
      await addProductToCart({ params: {}, productId }).unwrap();
      notification.success({ message: 'Product added in cart successfully' });
    } catch (error) {
      console.error('Failed to add product to cart: ', error);
    }
  };

  return (
    <Button loading={isLoading}
      className="bg-primary-300 p-1 rounded-lg text-white"
      onClick={handleAddToCart}
    >
      <ShoppingCart />
    </Button>
  );
}

export default AddCart;
