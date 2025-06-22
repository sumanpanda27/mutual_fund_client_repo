import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SavedFunds from "./pages/SavedFunds";
import FundDetails from "./pages/FundDetails";
function App() {
  return (
    <div className="min-h-screen bg-gray-100 px-2 sm:px-4 lg:px-0">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/saved" element={<SavedFunds />} />
        <Route path="/fund/:schemeCode" element={<FundDetails />} />
      </Routes>
    </div>
  );
}

export default App;
