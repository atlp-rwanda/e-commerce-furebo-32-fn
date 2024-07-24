import React, { useState } from 'react';
import { Badge, Button, Drawer, Empty, Input, notification, Space, Spin } from 'antd';
import { FiShoppingCart } from 'react-icons/fi';
import {
  useResetCartMutation,
  useViewCartQuery,
  useRemoveFromCartMutation
} from '../../store/actions/cart';
import { ArrowDownToLine, Edit } from 'lucide-react';
import CheckoutModal from '../checkout/checkoutForm';

const Cart: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [resetCart, { isLoading: isResetting }] = useResetCartMutation();
  const [checkoutModalVisible, setCheckoutModalVisible] = useState(false);
  const [removeFromCart] = useRemoveFromCartMutation();

  const handleResetCart = async () => {
    try {
      const result = await resetCart({}).unwrap();
      notification.success({ message: 'Cart reset successfully' });
    } catch (error) {
      console.error('Failed to reset cart', error);
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const { data, isLoading, isFetching, refetch } = useViewCartQuery<any>({});

  const cartItemCount = data && data.items ? data.items.length : 0;

  const toggleEditMode = (index: number) => {
    setEditMode((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleQuantityChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newQuantity =
      e.target.value === '' ? 0 : parseInt(e.target.value, 10);
    setQuantities((prev) => ({ ...prev, [index]: newQuantity }));
  };

  const handleCheckout = () => {
    setCheckoutModalVisible(true);
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      await removeFromCart({ productId }).unwrap();
      notification.success({ message: 'Item removed successfully' });
      refetch(); 
    } catch (error) {
      console.error('Failed to remove item', error);
      notification.error({ message: 'Failed to remove item' });
    }
  };


  return (
    <>
      <Space>
        <div className="text-white" onClick={showDrawer}>
          {isFetching || isLoading ? (
            <Spin size="small" />
          ) : (
            <Badge count={cartItemCount}>
              <FiShoppingCart />
            </Badge>
          )}
        </div>
      </Space>
      <Drawer
        title={`Items in Cart`}
        placement="right"
        className="rounded-l-xl"
        size="default"
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button loading={isResetting} onClick={handleResetCart}>
              Reset
            </Button>
            <Button type="primary" onClick={handleCheckout}>
              Checkout
            </Button>
          </Space>
        }
      >
        {data && data.items && data.items.length === 0 ? (
          <Empty />
        ) : (
          <div className="flex flex-col gap-2">
            {data &&
              data.items &&
              data.items.map((item: any, index: any) => (
                <div
                  key={index}
                  className="bg-slate-200 p-2 rounded-md flex gap-4"
                >
                  <img
                    src={`${item.image}`}
                    alt=""
                    className="w-20 h-20 rounded"
                  />
                  <div className="flex w-full justify-between">
                    <div className="flex flex-col">
                      <p className="font-thin text-xs">
                        <span className="font-medium text-sm">Name:</span>{' '}
                        {item.productName}
                      </p>
                      <p className="font-thin text-xs">
                        <span className="font-medium text-sm">Price:</span> RWF
                        {' ' + item.price}
                      </p>
                      <div>
                        <span>Quantity: </span>
                        <Input
                          type="number"
                          disabled={!editMode[index]}
                          value={
                            quantities[index] !== undefined
                              ? quantities[index]
                              : item.quantity
                          }
                          onChange={(e) => handleQuantityChange(index, e)}
                          className="w-14 disabled:text-slate-500"
                        />
                      </div>
                    </div>
                    <div className="h-full flex items-end justify-end">
                      <Button
                        className="rounded bg-primary-300 text-white"
                        onClick={() => toggleEditMode(index)}
                      >
                        {editMode[index] ? (
                          <div className="flex gap-2">
                            <ArrowDownToLine width={15} /> Save
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <Edit width={15} />
                            Edit
                          </div>
                        )}
                      </Button>
                      <Button
                        className="rounded bg-red-500 text-white"
                        onClick={() => handleRemoveItem(item.productId)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </Drawer>
      <CheckoutModal
        visible={checkoutModalVisible}
        onClose={() => setCheckoutModalVisible(false)}
      />
    </>
  );
};

export default Cart;