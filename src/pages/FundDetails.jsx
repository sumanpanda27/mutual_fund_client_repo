import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FundDetails() {
  const { schemeCode } = useParams();
  const [fund, setFund] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFund = async () => {
      try {
        const res = await axios.get(`https://api.mfapi.in/mf/${schemeCode}`);
        setFund(res.data);
      } catch (err) {
        setError("Failed to load fund details");
      }
    };
    fetchFund();
  }, [schemeCode]);

  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!fund) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{fund.meta.scheme_name}</h1>
      <p>
        <strong>Fund House:</strong> {fund.meta.fund_house}
      </p>
      <p>
        <strong>Scheme Type:</strong> {fund.meta.scheme_type}
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">NAV History</h2>
      <ul className="border-t">
        {fund.data.slice(0, 10).map((navItem, i) => (
          <li key={i} className="flex justify-between py-2 border-b">
            <span>{navItem.date}</span>
            <span>NAV: ₹{navItem.nav}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
