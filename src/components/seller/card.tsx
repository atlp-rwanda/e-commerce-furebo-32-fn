import { PenLine, Trash2 } from 'lucide-react';

const Card = ({ item }: { item: any }) => {
  const productImage =
    item.images && item.images.length > 0
      ? item.images[0]
      : 'https://via.placeholder.com/200';

  return (
    <div className="flex flex-col md:flex-row justify-between w-full md:w-fit gap-4 bg-white shadow-lg p-4 rounded-lg">
      <div className="w-full md:w-32 h-32 md:h-auto flex-shrink-0">
        <img
          src={productImage}
          className="w-full h-full rounded-md object-cover"
          alt={item.productName}
        />
      </div>
      <div className="flex flex-col justify-between w-full md:w-48 p-2">
        <div className="mb-2">
          <span className="block text-lg text-black font-semibold">
            {item.productName}
          </span>
          <span className="block text-sm text-gray-500 font-medium">
            {item.category}
          </span>
        </div>
        <span
          className={`inline-block bg-opacity-20 px-2 py-1 rounded-full text-xs font-semibold ${
            item.availability
              ? 'bg-green-100 text-green-600 border border-green-600'
              : 'bg-gray-100 text-gray-600 border border-gray-600'
          }`}
        >
          {item.availability ? 'Available' : 'Unavailable'}
        </span>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm font-medium text-gray-800">
            {item.price} RWF
          </span>
          <div className="flex gap-2">
            <div
              className="flex justify-center items-center cursor-pointer hover:bg-blue-100 hover:text-blue-600 border border-blue-600 bg-blue-600 w-8 h-8 rounded-md text-white transition-colors duration-200"
              title="Edit"
            >
              <PenLine width={15} height={15} />
            </div>
            <div
              className="flex justify-center items-center cursor-pointer hover:bg-red-100 hover:text-red-600 border border-red-600 bg-red-600 w-8 h-8 rounded-md text-white transition-colors duration-200"
              title="Delete"
            >
              <Trash2 width={15} height={15} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
