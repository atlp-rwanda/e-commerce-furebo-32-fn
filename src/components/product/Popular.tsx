import { useState } from "react";
import ProductCard from "./ProductCard";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetgetProductsQuery } from "../../store/actions/products";

function Popular() {
  const { data, isLoading, isFetching } = useGetgetProductsQuery({});
  console.log(data, isLoading, isFetching);

  const [currentPage, setCurrentPage] = useState(0);
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const itemsPerPage = 4;
  const popularProducts = data?.items || [];

  // Filter popularProducts to only include those with totalReviewRating of 5 and above
  const filteredProducts = popularProducts
    .filter((product:any) => product.totalReviewRating >= 0)
    .sort((a:any, b:any) => b.totalReviewRating - a.totalReviewRating); // Sort by totalReviewRating in descending order
  console.log(filteredProducts);

  const offset = currentPage * itemsPerPage;
  const paginatedItems = filteredProducts.slice(offset, offset + itemsPerPage);

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="w-full flex flex-col sm:flex-row justify-between items-center">
        <p className="text-2xl text-black mb-4 sm:mb-0">Popular Products</p>
        <ReactPaginate
          previousLabel={<ChevronLeft />}
          nextLabel={<ChevronRight />}
          breakClassName={"break-me"}
          pageCount={Math.ceil(filteredProducts.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={
            "flex justify-center sm:justify-start gap-1 items-center font-poppins text-xs"
          }
          pageLinkClassName={
            "bg-transparent text-gray-800 hidden border border-gray-800 rounded-lg font-medium px-3 py-2"
          }
          previousLinkClassName={
            "bg-gray-800 border bg-primary-300 text-white flex items-center justify-center lg:px-2 px-1 text-xs lg:text-base py-2 rounded-lg font-medium"
          }
          nextLinkClassName={
            "bg-gray-800 border bg-primary-300 text-white flex items-center justify-center lg:px-2 px-1 text-xs lg:text-base py-2 rounded-lg font-medium"
          }
          disabledClassName={"pointer-events-none opacity-50"}
          activeClassName={"bg-primary-300 text-white"}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-32 max-sm:gap-4 max-md:gap-6 bg-primary-200 p-4">
        {paginatedItems.map((product: any, index: number) => (
          <ProductCard key={index} popularProducts={product} />
        ))}
      </div>
    </div>
  );
}

export default Popular;