import React from 'react';

interface OrderCardProps {
  order: {
    id: string;
    deliveryAddress: {
      city: string;
      street: string;
      country: string;
      zipCode: string;
    };
    buyerId: string;
    paymentMethod: {
      cvv: string;
      method: string;
      cardNumber: string;
      expiryDate: string;
    };
    status: string;
    products: any[];
    totalAmount: number;
    expectedDeliveryDate?: Date | null;
  };
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const {
    deliveryAddress,
    paymentMethod,
    status,
    totalAmount,
    expectedDeliveryDate,
  } = order;

  return (
    <div className="order-card max-w-sm rounded overflow-hidden shadow-lg p-6 bg-white">
      <div className="mb-4">
      <p className="text-gray-600"><strong>Delivery Address:</strong> {`${deliveryAddress.street}, ${deliveryAddress.city}, ${deliveryAddress.country}, ${deliveryAddress.zipCode}`}</p>
      </div>
      <div className="mb-4">
        <p className="text-gray-600"><strong>Payment Method:</strong> {`${paymentMethod.method} ending in ${paymentMethod.cardNumber.slice(-4)}`}</p>
      </div>
      <div className="mb-4">
      <strong>Status:</strong>
      <span className={status === 'Cancelled' ? 'text-white bg-red-500 px-2 py-1 rounded' : 'text-green-500'}><b>{status}</b></span>
      </div>
      <div className="mb-4">
      <p className="text-gray-600"><strong>Total Amount:</strong> <span className="text-blue-500">${totalAmount.toFixed(2)}</span></p>
      </div>
      <div className="mb-4">
      {expectedDeliveryDate && (
        <p className="text-gray-600"><strong>Expected Delivery Date:</strong> {new Date(expectedDeliveryDate).toLocaleDateString()}</p>
      )}
      </div>
    </div>
  );
};

export default OrderCard;
