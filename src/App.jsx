import React, { useEffect, useState } from "react";
import { AiFillAudio } from "react-icons/ai";
import { FaRegStar, FaSearch, FaTimes } from "react-icons/fa";
import Card from "./Card";

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

  const fetchDefaultPods = async (token) => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=podcast&type=show&limit=40`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      const shows = data?.shows?.items || [];

      const formattedResults = shows.map((show) => ({
        name: show.name,
        publisher: show.publisher,
        description: show.description,
        images: show.images,
        external_urls: show.external_urls,
      }));

      setSearchResults(formattedResults);
    } catch (error) {
      console.error("Default pod fetch error:", error);
    }
  };

  useEffect(() => {
    const authString = `${clientId}:${clientSecret}`;
    const base64Auth = btoa(authString);

    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${base64Auth}`,
      },
      body: "grant_type=client_credentials",
    })
      .then((res) => res.json())
      .then((data) => {
        setAccessToken(data.access_token);
        fetchDefaultPods(data.access_token);
      })
      .catch((err) => console.error("Token fetch error:", err));
  }, []);

  const search = async () => {
    if (!accessToken || !searchInput.trim()) return;

    try {
      const query = encodeURIComponent(searchInput.trim());
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=show&limit=20`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      const shows = data?.shows?.items || [];

      const formattedResults = shows.map((show) => ({
        name: show.name,
        publisher: show.publisher,
        description: show.description,
        images: show.images,
        external_urls: show.external_urls,
      }));

      setSearchResults(formattedResults);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <>
      {/* Navbar */}
      <div className="flex flex-col md:flex-row items-center justify-between px-4 py-4 border-b border-white/20 bg-[#0b0620] space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2">
          <h1 className="text-3xl font-bold text-blue-400">PodSy</h1>
          <AiFillAudio className="text-3xl text-blue-400" />
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Explore podcasts here ..."
            className="w-full pl-4 pr-10 py-2 rounded-full bg-neutral-900 text-white placeholder-gray-400 focus:ring-2 focus:ring-white/20 border border-white/20"
            value={searchInput}
            onKeyDown={(event) => {
              if (event.key === "Enter") search();
            }}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            className="absolute right-10 top-1/2 transform -translate-y-1/2 p-[10px] text-white hover:text-red-400"
            onClick={() => setSearchInput("")}
          >
            <FaTimes />
          </button>
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-400"
            onClick={search}
          >
            <FaSearch />
          </button>
        </div>

        {/* GitHub Link */}
        <div className="flex items-center">
          <a
            target="_blank"
            href="https://github.com/sanya-2304/PodSy"
            className="flex items-center space-x-2 px-4 py-2 rounded-md border border-white/20 hover:bg-white/10 transition"
          >
            <FaRegStar className="text-white text-lg hover:text-blue-400" />
            <span className="text-white font-medium text-sm md:text-base">
              Star this project
            </span>
          </a>
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6 bg-[#0b0620] min-h-screen">
        {searchResults.map((podcast, index) => (
          <Card key={index} podcast={podcast} />
        ))}
      </div>
    </>
  );
};

export default App;
