import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
}

const ItemView: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    // Fetch the item details
    fetch(`/api/items/${itemId}`)
      .then(response => response.json())
      .then(data => setItem(data))
      .catch(error => console.error('Error fetching item:', error));
  }, [itemId]);

  if (!item) return <div className="text-center text-xl">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
      <p className="text-lg mb-2">{item.description}</p>
      <p className="text-xl font-semibold">Price: ${item.price}</p>
      {/* Add more item details as needed */}
    </div>
  );
};

export default ItemView;
