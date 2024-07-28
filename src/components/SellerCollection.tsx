import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Item {
  id: string;
  name: string;
}

const SellerCollection: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    // Fetch the seller's items
    fetch('/api/seller/items')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  if (items.length === 0) return <div className="text-center text-xl">No items found.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Collection</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(item => (
          <li key={item.id} className="border p-4 rounded shadow">
            <Link to={`/item/${item.id}`} className="text-lg font-semibold text-blue-600 hover:underline">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SellerCollection;
