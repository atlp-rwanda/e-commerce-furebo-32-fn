import TablePagination from "@mui/material/TablePagination";
import React, { useState } from "react";
import ProductCard from "./ProductCard";  
import { useGetProductsQuery } from "../../store/actions/products";

function Product() {
  const { data, isLoading, isFetching } = useGetProductsQuery({});
  console.log(data, isLoading, isFetching);
 const popularProducts = data?.items || [];
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const [currentPage, setCurrentPage] = useState(0);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const itemsPerPage = rowsPerPage;
  const offset = currentPage * itemsPerPage;

  const paginatedItems = popularProducts.slice(offset, offset + itemsPerPage);

  return (
    <div>
      <div className="flex w-full justify-between items-center py-4">
        <h1>Products</h1>
        <TablePagination
          component="div"
          count={popularProducts.length}
          page={currentPage}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[4, 8, 12, 16]}
          className="bg-primary-50 border border-secondary-300 rounded-full"
        />
      </div>
      <div className="flex justify-between items-center py-4"></div>
      <div>
        <div className="flex gap-5 flex-wrap">
          {paginatedItems.map((product:any, index:any) => {
            return <ProductCard key={index} popularProducts={product} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Product;
