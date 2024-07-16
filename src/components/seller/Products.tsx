import Card from './card';
import { useGetSellerProductsQuery } from '../../store/actions/products';
import AddProduct from './addProduct';
import { Empty, Spin } from 'antd';

function Products() {
  const { data, isLoading, isFetching } = useGetSellerProductsQuery({});
  console.log(data, isLoading, isFetching);

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center px-2 rounded-md border border-primary-300 ">
        <span className="text-black text-xl">Product</span>
        <AddProduct />
      </div>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <div className="py-2 flex flex-wrap gap-2">
          {data?.items.length == 0 ? (
            <Empty />
          ) : (
            data?.items.map((item: any, index: any) => (
              <Card key={index} item={item} />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Products;
