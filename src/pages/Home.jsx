import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const { user } = useAuth();

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get(`https://api.mfapi.in/mf/search?q=${query}`);
      setResults(res.data);
      setSearched(true);
    } catch {
      toast.error("Failed to fetch mutual funds");
      setResults([]); // clear on error
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  const saveFund = async (fund) => {
    try {
      const API = import.meta.env.VITE_API_BASE_URL;
      await axios.post(
        `${API}/funds/save`,
        {
          schemeCode: fund.schemeCode,
          schemeName: fund.schemeName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Fund saved!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error saving fund.");
    }
  };

  useEffect(() => {
    if (!user) {
      setQuery("");
      setResults([]);
      setSearched(false);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold">
          Please login to search mutual funds.
        </h2>
      </div>
    );
  }

  return (
    <div className="p-4 ">
      <h1 className="text-2xl font-bold mb-4">Search Mutual Funds</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter fund name..."
        className="p-2 border rounded mr-2"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 cursor-pointer rounded m-2 sm:items-center"
      >
        Search
      </button>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {searched && results.length === 0 && (
            <p className="mt-4 text-gray-600 text-center">
              No mutual funds found for "<strong>{query}</strong>"
            </p>
          )}
          {results.length > 0 && (
            <ul className="mt-4">
              {results.map((fund, i) => (
                <li
                  key={i}
                  className="border-b py-2 flex justify-between items-center bg-blue-500 hover:bg-blue-600 text-white px-4 rounded mb-2"
                >
                  <span>{fund.schemeName}</span>
                  <div className="flex lg:md:sm:items-center">
                    <button
                      onClick={() => saveFund(fund)}
                      className="bg-green-500 hover:bg-green-600 text-white m-2 px-2 py-1 rounded cursor-pointer"
                    >
                      Save
                    </button>
                    <Link
                      to={`/fund/${fund.schemeCode}`}
                      className="bg-green-500 hover:bg-green-600 text-white cursor-pointer m-2 px-2 py-1 rounded"
                    >
                      View Details
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
