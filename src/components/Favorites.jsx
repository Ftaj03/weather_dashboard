import React from 'react';

const Favorites = ({ favorites, onSelect }) => {
  if (favorites.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-600 mb-2">⭐ Favorites</h3>
      <div className="flex flex-wrap gap-2">
        {favorites.map((city, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(city)}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Favorites;