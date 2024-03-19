import React, { useState, useEffect } from "react";
import Header from "./Header";
import toast from "react-hot-toast";
import axios from "axios";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    type: "",
  });

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

  const handleUpdate = (product) => {
    setEditProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      type: product.type,
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this"
    );

    try {
      if (confirmDelete) {
        axios
          .delete(`http://localhost:3000/api/admin/delete-product/${id}`)
          .then((res) => {
            console.log(res);
            toast.success("Product is deleted");
            setProducts(prev=> prev.filter((item)=> item-id !== id))
            window.location.reload()
          })
          .catch((error) => console.log("ERROR: ", error));
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/api/admin/update-product/${editProduct._id}`,
        formData
      );
      await setEditProduct(null);
      window.location.reload();
      toast.success("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product. Please try again later.");
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">All Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 shadow-md rounded-lg"
            >
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-800 font-bold">Price: ${product.price}</p>
              <p className="text-gray-700">Type: {product.type}</p>
              {/* Update and delete buttons */}
              <div className="flex mt-4">
                <button
                  onClick={() => handleUpdate(product)}
                  className="mr-2 bg-blue-500 text-white px-3 py-1 rounded-md"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {editProduct && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Update Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-600">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-600">
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-gray-600">
                  Price:
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="type" className="block text-gray-600">
                  Type:
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Type</option>
                  <option value="course">Course</option>
                  <option value="event">Event</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-gray-700 hover:bg-gray-900 text-white py-3 px-6 rounded-md transition duration-300"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AllProduct;
