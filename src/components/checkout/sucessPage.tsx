import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import { useLazyCompletePaymentQuery } from '../../store/actions/cart'; // Adjust the import path as needed

const SuccessPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [triggerCompletePayment, { data }] = useLazyCompletePaymentQuery();

  useEffect(() => {
    if (id) {
      triggerCompletePayment({ orderId: id });
    }
  }, [id, triggerCompletePayment]);

 
  const orderDetails = data?.updatedOrder;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <FiCheckCircle size={48} className="text-green-500" />
          <h2 className="text-2xl font-semibold text-gray-700 mt-4">Order & Payment Successful!</h2>
        </div>
        {orderDetails ? (
          <div className="w-full">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Order Details</h3>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-600"><b>Delivery Address:</b></h4>
              <p className="text-gray-500">{orderDetails.deliveryAddress?.street}</p>
              <p className="text-gray-500">{orderDetails.deliveryAddress?.city}</p>
              <p className="text-gray-500">{orderDetails.deliveryAddress?.country}</p>
              <p className="text-gray-500">{orderDetails.deliveryAddress?.zipCode}</p>
            </div>
            <div className="mb-4">
              <h4 className="font-medium text-gray-600"><b>Payment Deails:</b></h4>
              <p className="text-gray-500">{orderDetails.paymentMethod?.method}</p>
              <p className="text-gray-500">Card Number: {orderDetails.paymentMethod?.cardNumber}</p>
              <p className="text-gray-500">Total Ammount Paid: ${orderDetails.totalAmount}</p>
            </div>
            <div className="mb-4">
              <h4 className="font-medium text-gray-600"><b>Order Status:</b></h4>
              <p className="text-gray-500">{orderDetails.status}</p>
            </div>
            <div className="mb-4">
              <h4 className="font-medium text-gray-600"><b>Expected Delivery Date:</b></h4>
              <p className="text-gray-500">{orderDetails.expectedDeliveryDate || 'Not available'}</p>
            </div>
          </div>
        ) : (
          <div>No order details available</div>
        )}
      </div>
    </div>
  );
};

export default SuccessPage;
