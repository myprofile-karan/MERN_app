import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header"
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/add-product"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);


  return (
    <>
    <Header />
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">All Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Link to={`/user/dashboard/${product._id}`} key={product._id}>
              <div className="bg-white p-4 shadow-md rounded-lg">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-800 font-bold">
                  Price: ${product.price}
                </p>
                <p className="text-gray-700">Type: {product.type}</p>
                <div className="flex mt-4"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
