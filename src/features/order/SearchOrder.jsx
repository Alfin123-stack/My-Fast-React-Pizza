import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/order/${query}`, { replace: true });
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit} className="space-x-5">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="text-stone-500 w-40 px-4 py-2 rounded-full text-sm sm:w-64 sm:focus:w-72 transition-all focus:ring focus:outline-none focus:ring-yellow-500 focus:ring-opacity-50"
        placeholder="Search Order #"
      />
      {/* <button type="submit" className="bg-black px-3 py-1 border-1 border-white hidden sm:inline-block ">Search</button> */}
    </form>
  );
}

export default SearchOrder;
