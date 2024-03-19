import React from "react";
import { Link } from "react-router-dom";
import Logout from "../Logout";

const Header = () => {
  return (
    <header className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-white text-lg font-semibold">My Website</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="/admin/dashboard"
            className="text-white hover:text-gray-300"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/add-product"
            className="text-white hover:text-gray-300"
          >
            Add Product
          </Link>
          <Link
            to="/admin/all-products"
            className="text-white hover:text-gray-300"
          >
            All Products
          </Link>
          <Logout />
        </div>
      </div>
    </header>
  );
};

export default Header;
