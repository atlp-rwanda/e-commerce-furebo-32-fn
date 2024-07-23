import React from 'react';
import { useGetOrdersByUserQuery } from '../../store/actions/order';
import OrderCard from './orderCard';
import { Spin } from 'antd';

interface UserOrdersProps {
  userId: string;
}

const userString = localStorage.getItem('user');
let userId = '';
let userName=''
if (userString) {
  const user = JSON.parse(userString);
  if (user) {
    userId = user.id;
    userName=user.firstName;
  } else {
    console.error('User ID not found in localStorage');
  }
} else {
  console.error('User not found in localStorage');
}

const UserOrders: React.FC = () => {
  const { data, isLoading, error } = useGetOrdersByUserQuery({ userId });

  if (isLoading){
    return (
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" className="text-6xl" />
        </div>
      );
  }
  
  if (!data || !data.orders || data.orders.length === 0) {
    return(
        <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">No Orders Found</h1>
        <p className="text-gray-600 mb-4">You don't have any orders yet. Start shopping to place your first order!</p>
        <a
          href="/product"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Go to Shop
        </a>
      </div>
    );
  }

  return (
    <div className="user-orders p-10">
    <h1 className='p-6'>Welcome {userName}, Here are Your Recent Orders:</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.orders.map((order: any) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  </div>
  );
};

export default UserOrders;
