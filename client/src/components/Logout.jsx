import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out successfully!");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-white text-sm px-4 py-2 bg-gray-600 rounded-lg"
    >
      Logout
    </button>
  );
};

export default Logout;
