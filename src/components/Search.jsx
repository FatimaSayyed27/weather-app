import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const Search = ({ onSearch, dark, setDark }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (!city.trim()) return;
    onSearch(city);
    setCity("");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 items-center w-full">
      <input
        className="flex-1 p-2 rounded-lg outline-none
       text-black dark:text-white
       bg-white dark:bg-black/30
       placeholder-gray-500 dark:placeholder-gray-300
       w-full sm:w-auto"
        placeholder=" Search city "
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button
        type="button"
        onClick={handleSearch}
        className="bg-black/40 dark:bg-white/20 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
      >
        Search
      </button>

      <ThemeToggle dark={dark} setDark={setDark} />
    </div>
  );
};

export default Search;
