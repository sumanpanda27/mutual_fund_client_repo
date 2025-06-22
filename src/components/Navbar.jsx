import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center">
      <Link to="/" className="font-bold m-2">
        Mutual Fund App
      </Link>
      <div>
        {user ? (
          <>
            <Link
              to="/saved"
              className="mr-4 bg-green-500 hover:bg-green-600 text-white m-2 px-2 py-2 rounded"
            >
              View Saved Funds
            </Link>
            <button
              className="bg-red-500 hover:bg-red-600 text-white m-2 px-2 py-2 rounded cursor-pointer"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="mr-4 bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
