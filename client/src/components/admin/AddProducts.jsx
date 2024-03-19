import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import toast from "react-hot-toast";

const AddProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = axios.post(
        "http://localhost:3000/api/admin/add-product",
        { name, description, price, type }
      );
      toast.success("added successful");
      console.log("Product added successfully:", response.data);
      setName("");
      setDescription("");
      setPrice("");
      setType("");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700">
          Add Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2 text-gray-600">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-2 text-gray-600">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>
          <div>
            <label htmlFor="price" className="block mb-2 text-gray-600">
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="type" className="block mb-2 text-gray-600">
              Type:
            </label>
            <select
              id="type"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Type</option>
              <option value="course">Course</option>
              <option value="event">Event</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-gray-700 hover:bg-gray-900 text-white py-3 px-6 rounded-md transition duration-300"
          >
            Add Product
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProductForm;
