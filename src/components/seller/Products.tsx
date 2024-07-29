import { useState } from 'react';
import Card from './card';
import EditProduct from './EditProduct';
import { useGetSellerProductsQuery } from '../../store/actions/products';
import AddProduct from './addProduct';
import { Empty, Spin } from 'antd';
import { Link } from 'react-router-dom';

function Products() {
  const { data, isLoading, isFetching } = useGetSellerProductsQuery({});
  console.log(data, isLoading, isFetching);
  const [editingProduct, setEditingProduct] = useState(null);
  const handleEditProduct = (product: any) => {
    console.log('Product to edit:', product);
    setEditingProduct(product);
  };

  const handleCloseEditProduct = () => {
    setEditingProduct(null);
  };

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-50 rounded-lg shadow-lg">
      <div className="flex justify-between items-center p-4 bg-white rounded-md border border-gray-300">
        <span className="text-black text-2xl font-semibold">Products</span>
        <AddProduct />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <div className="py-4 flex flex-wrap gap-4">
          {data?.items.length === 0 ? (
            <Empty description="No Products Available" />
          ) : (
            data.items.map((item: any, index: any) => (
                <Card key={index} item={item} onEdit={handleEditProduct} />
            ))
          )}
        </div>
      )}
      {editingProduct && (
        <EditProduct
          product={editingProduct}
          onClose={handleCloseEditProduct}
        />
      )}
    </div>
  );
}

export default Products;
