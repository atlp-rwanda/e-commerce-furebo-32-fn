import React, { useState } from 'react';
import TablePagination from '@mui/material/TablePagination';
import ProductCard from './product/ProductCard';
import { useGetProductsQuery } from '../store/actions/products';

interface Product {
  id: string;
  productName: string;
  price: number;
  images: string[];
  totalReviewRating: number;
}

function Product() {
  const { data, isLoading, isFetching } = useGetProductsQuery({});
  const products: Product[] = data?.items || [];
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);

  const likedProducts = products.slice(0, 10);

  const popularProducts = products.filter(
    (product) => product.totalReviewRating >= 5,
  );
  const otherProducts = products.filter(
    (product) => product.totalReviewRating < 5,
  );

  // Combine liked products, popular products, and other products while removing duplicates
  const combinedProducts = [
    ...likedProducts,
    ...popularProducts,
    ...otherProducts,
  ];
  const recommendedProducts = Array.from(
    new Set(combinedProducts.map((p) => p.id)),
  ).map((id) => combinedProducts.find((p) => p.id === id)!);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const itemsPerPage = rowsPerPage;
  const offset = currentPage * itemsPerPage;
  const paginatedItems = products.slice(offset, offset + itemsPerPage);

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center">Products</h1>
        <div className="flex w-full justify-between items-center py-4"></div>
        <div className="flex justify-between items-center py-2"></div>
        {recommendedProducts.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl m-5 pb-2 font-bold ">
              Here are some recommended products you may like:
            </h2>
            <div className="flex gap-5 flex-wrap">
              {recommendedProducts.map((product, index) => {
                return <ProductCard key={index} popularProducts={product} />;
              })}
            </div>
          </div>
        )}
      </div>
      <div className="container flex justify-end mx-auto py-8">
        <TablePagination
          component="div"
          count={products.length}
          page={currentPage}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[4, 8, 12, 16]}
          className="bg-primary-50 border  border-secondary-300 rounded-full"
        />
      </div>
    </div>
  );
}

export default Product;
