import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiXCircle } from 'react-icons/fi';
import { useLazyCancelledPaymentQuery } from '../../store/actions/cart'; // Adjust the import path as needed

const CancelledPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [triggerCancelledPayment, { data }] = useLazyCancelledPaymentQuery();

  useEffect(() => {
    if (id) {
      triggerCancelledPayment({ orderId: id });
    }
  }, [id, triggerCancelledPayment]);

  const orderDetails = data?.updatedOrder;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <FiXCircle size={48} className="text-red-500" />
          <h2 className="text-2xl font-semibold text-gray-700 mt-4">Payment Cancelled</h2>
        </div>
        {orderDetails ? (
          <div className="w-full">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Order Details</h3>
            
          
            <div className="mb-4">
              <h4 className="font-medium text-gray-600"><b>Order Status:</b></h4>
              <p className="text-gray-500">{orderDetails.status}</p>
            </div>
            
          </div>
        ) : (
          <div>No order details available</div>
        )}
      </div>
    </div>
  );
};

export default CancelledPage;
