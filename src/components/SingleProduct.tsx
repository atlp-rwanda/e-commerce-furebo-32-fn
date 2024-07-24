import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_API_URL } from '../utils/constants/config';
import AddCart from './cart/addCart';

type Product = {
  id: string;
  productName: string;
  description: string;
  price: number;
  seller_id: string;
  quantity: number;
  expireDate: string;
  collection_id: string;
  category: string;
  availability: boolean;
  images: string[];
  createdAt: string;
  updatedAt: string;
  expired: boolean;
  reviews: any[];
  totalReviewRating: number;
};


const SingleProduct = () => {
  const { id: productId } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    // Fetch product data when the component mounts
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${BASE_API_URL}api/viewProduct/${productId}`,
        );
        const productData: Product = response.data.product;
        console.log(productData);
        setProduct(productData);
        setActiveImage(productData.images[0]); // Set the first image as the active image
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col items-center pb-10">
      <div className="w-[80vw]">
        <div className="flex gap-3">
          <div className="w-[70%]">
            <div
              className="h-[70vh] bg-cover bg-center rounded-2xl drop-shadow-lg"
              style={{ backgroundImage: `url('${activeImage}')` }}
            />
          </div>
          <div className="w-[30%] flex flex-wrap h-fit gap-4 justify-end">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product Image ${index + 1}`}
                className="w-32 h-32 rounded-xl cursor-pointer drop-shadow-lg"
                onClick={() => setActiveImage(image)}
              />
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h1 className="text-2xl font-bold text-primary-300">
            {product.productName}
          </h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-xl font-semibold mt-2 text-black">
            ${product.price}
          </p>
          <p className="text-green-500 mt-2">
            {product.availability ? 'Available' : 'Sold out'}
          </p>
          <AddCart productId={product.id} />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
