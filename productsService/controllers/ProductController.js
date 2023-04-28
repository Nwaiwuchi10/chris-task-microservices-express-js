const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const axios = require("axios");
const createProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      // userId: mongoose.Types.ObjectId(req.body.userId),
      userId: req.body.userId,
      name: req.body.name,

      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
    });
    const product = await newProduct.save();
    res.status(200).json({
      _id: product._id,
      userId: product.userId,
      name: product.name,

      description: product.description,
      price: product.price,
      quantity: product.quantity,
    });
  } catch (error) {
    res.status(404).json({
      error: "Error while creating a Product",
    });
  }
};
const findAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({
      error: "Error while fetching all Products",
    });
  }
});
const findProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({
      error: "Error while fetching a Product",
    });
  }
});
const findProductWithUserSchema = asyncHandler(async (req, res) => {
  const product = Product.findById(req.params.id).then((product) => {
    if (product) {
      axios
        .get("http://localhost:5000/api/authUser/" + product.userId)
        .then((response) => {
          const productObject = { email: response.data.email };
          res.status(202).json(productObject);
        });
      res.status(200).json(product);
    } else {
      res.status(406).json("invalid request");
    }
  });

  res.status(200).json(product);
});
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.remove();
      res.status(202).json({ message: "Product has been deleted" });
    }
  } catch (error) {
    res.status(404).json({
      error: "Error while deleting a Product",
    });
  }
});
const updatedProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.quantity = req.body.quantity || product.quantity;
    product.description = req.body.description || product.description;
    const updatedProduct = await product.save();
    res.status(200).json({
      _id: updatedProduct._id,
      name: updatedProduct.name,
      price: updatedProduct.price,
      quantity: updatedProduct.quantity,
      description: updatedProduct.description,
    });
  } catch (error) {
    res.status(404).json({
      error: "Error while updating a Product",
    });
  }
});
module.exports = {
  createProduct,
  deleteProduct,
  findProductWithUserSchema,
  findAllProducts,
  findProduct,
  updatedProduct,
};
