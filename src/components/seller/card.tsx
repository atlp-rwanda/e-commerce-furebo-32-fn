import { PenLine, Trash2 } from 'lucide-react';
import { Modal, notification, Spin } from 'antd';
import { useDeleteProductMutation } from '../../store/actions/products';

const { confirm } = Modal;

const Card = (item: any) => {

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure you want to delete this product?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteProduct({ id: item.id }).unwrap();
          notification.success({ message: 'Product deleted successfully' });
        } catch (error: any) {
          notification.error({
            message: error.data.message || 'Something went wrong',
          });
          console.error('Failed to delete product:', error);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  console.log(item);

  const productImage =
    item.item.images && item.item.images.length > 0
      ? item.item.images[0]
      : 'https://via.placeholder.com/200';

  console.log(productImage);

  return (
    <Spin spinning={isDeleting}>
      <div className="flex flex-col md:flex-row justify-between w-full md:w-fit gap-3 bg-white p-2 rounded-xl">
        <div className="w-24 h-24">
          <img
            src={productImage}
            className="w-full h-full md:w-32 rounded-md object-cover"
            alt={item.productName}
          />
        </div>
        <div className="flex flex-col justify-between w-full md:w-32">
          <div className="w-full rounded-full h-1 bg-gray"></div>
          <div className="flex flex-col">
            {' '}
            <span className="text-sm text-black font-semibold">
              {item.productName}
            </span>
            <span className="text-xs text-gray font-semibold">
              {item.category}
            </span>
          </div>
          <span
            className={`bg-orange-50 border ${item.availability ? 'border-orange-600 text-orange-600' : 'border-gray text-gray'} text-xs w-fit px-2 rounded-full`}
          >
            {item.availability ? 'Available' : 'navailable'}
          </span>
          <div className="flex justify-between items-center">
            <span className="text-xs">{item.price} rwf</span>
            <div className="flex gap-1 justify-end">
              <div
                className="flex justify-center items-center cursor-pointer hover:bg-primary-50 hover:text-primary-300 hover:border hover:border-primary-300 border border-primary-300 bg-primary-300 w-fit p-1 rounded-md text-white">
                <PenLine width={15} height={15} />
              </div>
              <div
                className="flex justify-center items-center cursor-pointer hover:bg-red-100 hover:text-red-600 hover:border hover:border-red-600 border border-red-600 w-fit p-1 rounded-md bg-red-600 text-white"
                onClick={showDeleteConfirm}
              >
                <Trash2 width={15} height={15} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Card;
