import Card from './card';
import { useGetSellerProductsQuery } from '../../store/actions/products';
import AddProduct from './addProduct';
import { Empty, Spin } from 'antd';
import { Link } from 'react-router-dom';

function Products() {
  const { data, isLoading } = useGetSellerProductsQuery({});

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
              <Link
                to={`/item/${item.id}`}
                key={index}
                className="w-full md:w-1/3 lg:w-1/4"
              >
                <Card item={item} />
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Products;
