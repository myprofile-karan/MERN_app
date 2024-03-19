const Product = require("../models/product");

const adminDashboard = (req, res) => {
  console.log("hello admin");
  res.json({ page: "admin dashboard" });
};

const showProduct = async (req, res) => {
  try {
    const findProduct = await Product.find();
    console.log(findProduct);
    res.json(findProduct);
  } catch (error) {
    console.log(error);
  }
};

const addProduct = async (req, res) => {
  const { name, description, price, type } = req.body;

  if (!name || !description || !price || !type) {
    return res
      .status(400)
      .json({ message: "Please provide all product details." });
  }
  try {
    const newProduct = await Product.create({
      name,
      description,
      price,
      type,
    });
    console.log(newProduct);
    res.status(201).json({ created: "success" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    console.log(deletedProduct);
    res.status(200).json(deletedProduct);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error in deletind product" });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, description, price, type } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      productId,
      { name, description, price, type },
      { new: true }
    );
    res.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Error updating product" });
  }
};

const detailsProduct = async (req, res) => {
  const {id} = req.params
  try {
    const findProduct = await Product.findById(id)
    res.json(findProduct)
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  adminDashboard,
  addProduct,
  showProduct,
  deleteProduct,
  updateProduct,
  detailsProduct,
};
