import React from "react";
import { FaPlay } from "react-icons/fa";

const Card = ({ podcast }) => {
  const { name, publisher, description, images, external_urls } = podcast;
  const image = images?.[0]?.url || "../public/spot.jpg";

  return (
    <div className="!bg-blue-200 rounded-2xl text-white p-4 sm:p-5 shadow-xl flex flex-col justify-between min-h-[400px] hover:scale-95">
      <img
        src={image}
        alt={name}
        className="w-full h-40 sm:h-48 lg:h-56 object-cover rounded-xl mb-4"
      />

      <h2 className="text-lg sm:text-xl font-bold mb-1 text-gray-900 !bg-blue-200 truncate">
        {name}
      </h2>

      <div className="flex items-center justify-between !bg-blue-200 mb-2 flex-wrap gap-2">
        <p className="text-sm sm:text-md font-medium text-gray-700 flex items-center gap-1 !bg-blue-200 truncate">
          👤 {publisher}
        </p>
        <a
          href={external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black p-2 sm:p-3 rounded-full hover:bg-gray-300 transition !bg-blue-400"
          title="Play on Spotify"
        >
          <FaPlay className="text-white text-sm sm:text-md !bg-blue-400" />
        </a>
      </div>

      <p className="text-sm text-gray-600 !bg-blue-200 line-clamp-3">
        {description.length > 100 ? description.slice(0, 120) + "..." : description}
      </p>
    </div>
  );
};

export default Card;
