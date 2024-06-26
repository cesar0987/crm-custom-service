const Product = require("../models/inventory.models");

module.exports.getAllProducts = (req, res) => {
  Product.find()
    .then((allProducts) => {
      console.log("All Products:", allProducts);
      res.json(allProducts);
    })
    .catch((err) => {
      console.error("Error retrieving products:", err);
      res.status(500).json(err);
    });
};

module.exports.createProduct = (req, res) => {
  Product.create(req.body)
    .then((newProduct) => {
      console.log("New Product:", newProduct);
      res.json(newProduct);
    })
    .catch((err) => {
      console.error("Error creating product:", err);
      res.status(500).json(err);
    });
};
