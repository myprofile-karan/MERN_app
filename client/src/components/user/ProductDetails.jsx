import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/admin/show-product/${id}`
        );
        console.log(response);
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
      <div className="bg-white p-4 shadow-md rounded-lg">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-gray-800 font-bold">Price: ${product.price}</p>
        <p className="text-gray-700">Type: {product.type}</p>
        <div className="flex mt-4"></div>
      </div>
    </>
  );
};

export default ProductDetails;
