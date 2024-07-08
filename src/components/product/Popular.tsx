import { useState } from "react";
import ProductCard from "./ProductCard";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Popular() {
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageChange = ({ selected }: any) => {
    setCurrentPage(selected);
  };
  const itemsPerPage = 4;
  const offset = currentPage * itemsPerPage;
  const popularProducts = [
    {
      cover: "/Telefon.jpeg",
      reviews: "15.3k Reviews",
      name: "Air force",
      price: "200",
    },
    {
      cover: "/Telefon.jpeg",
      reviews: "15.3k Reviews",
      name: "Air force",
      price: "200",
    },
    {
      cover: "/Telefon.jpeg",
      reviews: "15.3k Reviews",
      name: "Air force",
      price: "200",
    },
    {
      cover: "/Telefon.jpeg",
      reviews: "15.3k Reviews",
      name: "Air force",
      price: "200",
    },
    {
      cover: "/Telefon.jpeg",
      reviews: "15.3k Reviews",
      name: "Air force",
      price: "200",
    },
    {
      cover: "/Telefon.jpeg",
      reviews: "15.3k Reviews",
      name: "Air force",
      price: "200",
    },
    {
      cover: "/Telefon.jpeg",
      reviews: "15.3k Reviews",
      name: "Air force",
      price: "200",
    },
    {
      cover: "/nikee.png",
      reviews: "15.3k Reviews",
      name: "Air force",
      price: "200",
    },
  ];
  const paginatedItems = popularProducts.slice(offset, offset + itemsPerPage);
  console.log(paginatedItems);

  return (
    <div className="flex gap-4 flex-col mt-4">
      <div className="w-full flex justify-between">
        <p className="text-2xl text-black">Popular Products</p>
        <ReactPaginate
          previousLabel={<ChevronLeft />}
          nextLabel={<ChevronRight />}
          breakClassName={"break-me"}
          pageCount={Math.ceil(popularProducts.length / itemsPerPage)}
          marginPagesDisplayed={5}
          pageRangeDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={
            "flex justify-center gap-1 items-center font-poppins text-xs"
          }
          pageLinkClassName={
            "bg-transparent text-gray-800 none hidden border border-gray-800 rounded-lg font-medium px-3 py-2"
          }
          previousLinkClassName={
            "bg-gray-800 border bg-primary-300 flex text-white lg:px-2 px-2 text-xs lg:text-base py-2 rounded-lg font-medium"
          }
          nextLinkClassName={
            "bg-gray-800 border bg-primary-300 flex text-white lg:px-2 px-2 text-xs lg:text-base py-2 rounded-lg font-medium"
          }
          disabledClassName={"pointer-events-none opacity-50"}
        />
      </div>
      <div className="flex justify-between gap-4">
        {paginatedItems.map((product) => {
          return <ProductCard popularProducts={product} />;
        })}
      </div>
    </div>
  );
}

export default Popular;
