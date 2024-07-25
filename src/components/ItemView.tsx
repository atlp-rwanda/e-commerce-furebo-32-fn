import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleProduct } from '../redux/slices/productSlice';
import { RootState, AppDispatch } from '../store/store';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ItemView: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const {
    product: item,
    loading,
    error,
  } = useSelector((state: RootState) => state.singleProduct);

  useEffect(() => {
    if (itemId) {
      dispatch(fetchSingleProduct(itemId));
    }
  }, [dispatch, itemId]);

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-xl">Error: {error}</div>;

  const handleEdit = (product: any) => {
    // Implement the edit functionality
  };

  const handleDelete = () => {
    // Implement the delete functionality
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 flex flex-row mr-20 justify-center items-center">
          <div className="md:w-full bg-gray-100 w-full m-0 h-35">
            {item?.product?.images && (
              <Slider {...settings}>
                {item.product.images.map((image: string, index: number) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`Product Image ${index + 1}`}
                      className="w-full"
                    />
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-3xl font-semibold mb-2">
            {item?.product?.productName}
          </h1>
          <p className="text-xl text-gray-700 mb-4">
            Rwf {item?.product?.price}
          </p>
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className="w-5 h-5 text-yellow-100 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.568L24 9.423l-6 6.097 1.428 8.485L12 18.908l-7.428 5.097L6 15.52 0 9.423l8.332-1.268L12 .587z" />
              </svg>
            ))}
          </div>
          <p className="text-gray-600 mb-4">{item?.product?.description}</p>
          <div className="flex items-center justify-start align-middle">
            <button
              onClick={() => handleEdit(item)}
              className="ml-10 px-6 py-2 bg-black text-white rounded transition duration-300 ease-in-out transform hover:bg-gray-800 hover:scale-105"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="ml-10 px-6 py-2 bg-black text-white rounded transition duration-300 ease-in-out transform hover:bg-red-800 hover:scale-105"
            >
              Delete
            </button>
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Dimensions:</h2>
            <p className="text-gray-600">10x10x10 cm</p>
          </div>
          <div className="mt-4">
            <h2>
              Category:{' '}
              <span className="text-lg font-semibold mb-2">
                {item?.product?.productCategory}
              </span>
            </h2>
          </div>
          <div className="mt-4">
            <h2>
              Quantity Remaining:{' '}
              <span className="text-lg font-semibold mb-2">
                {item?.product?.quantity}
              </span>
            </h2>
          </div>
          <div className="mt-4">
            <h2>
              Availability:{' '}
              <span className="text-lg font-semibold mb-2">
                {item?.product?.isAvailable ? 'Available' : 'Out of Stock'}
              </span>
            </h2>
          </div>
          <div className="mt-4">
            <h2>
              Created At:{' '}
              <span className="text-lg font-semibold mb-2">
                {item?.product?.createdAt &&
                  formatDate(item?.product?.createdAt)}
              </span>
            </h2>
          </div>
          <div className="mt-4">
            <h2>
              Last Updated:{' '}
              <span className="text-lg font-semibold mb-2">
                {item?.product?.updatedAt &&
                  formatDate(item?.product?.updatedAt)}
              </span>
            </h2>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <ul className="flex border-b">
          <li className="mr-1">
            <a
              className="bg-white inline-block py-2 px-4 text-black font-semibold"
              href="#description"
            >
              Description
            </a>
          </li>
          <li className="mr-1">
            <a
              className="bg-white inline-block py-2 px-4 text-gray-400 hover:text-black font-semibold"
              href="#reviews"
            >
              Reviews
            </a>
          </li>
        </ul>
        <div id="description" className="mt-4">
          <p className="text-gray-600">{item?.product?.description}</p>
        </div>
        <div id="reviews" className="mt-4 hidden">
          <p className="text-gray-600">No reviews yet.</p>
        </div>
      </div>
    </div>
  );
};

export default ItemView;
