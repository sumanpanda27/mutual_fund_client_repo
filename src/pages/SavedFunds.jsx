import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function SavedFunds() {
  const { user } = useAuth();
  const [savedFunds, setSavedFunds] = useState([]);

  useEffect(() => {
    const fetchSaved = async () => {
      const res = await axios.get("/api/funds/saved", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSavedFunds(res.data);
    };
    fetchSaved();
  }, []);

  const removeFund = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to remove this fund?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`/api/funds/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSavedFunds((prev) => prev.filter((f) => f._id !== id));
      toast.success("Fund removed!");
    } catch {
      toast.error("Failed to remove fund.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Saved Mutual Funds</h1>
      {savedFunds.length === 0 ? (
        <p>No saved funds.</p>
      ) : (
        <ul>
          {savedFunds.map((fund) => (
            <li
              key={fund._id}
              className="border-b py-2 flex justify-between items-center bg-blue-500 hover:bg-blue-600 text-white px-4 rounded mb-2"
            >
              <span>{fund.schemeName}</span>
              <div>
                {" "}
                <Link
                  to={`/fund/${fund.schemeCode}`}
                  className="bg-green-500 text-white px-2 py-1 m-2 rounded hover:bg-green-600"
                >
                  View Details
                </Link>
                <button
                  onClick={() => removeFund(fund._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
