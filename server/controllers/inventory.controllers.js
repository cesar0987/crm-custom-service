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
  const { name, price, description, quantity, ref, brand, size, color, date } =
    req.body;

  //VALIDACIONES
  if (
    !name ||
    !price ||
    !description ||
    !quantity ||
    !ref ||
    !brand ||
    !size ||
    !color ||
    !date
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: "Name must be at least 3 characters long" });
  }
  if (price < 0) {
    return res.status(400).json({ message: "Price must be at least 0" });
  }
  if (description.length < 5) {
    return res
      .status(400)
      .json({ message: "Description must be at least 5 characters long" });
  }
  if (quantity < 0) {
    return res.status(400).json({ message: "Quantity must be at least 0" });
  }

  // Convirtiendo formato de fecha a "YYYY-MM-DD"
  const formattedDate = moment(date, "YYYY-MM-DD", true).toDate();

  if (!formattedDate || isNaN(formattedDate.getTime())) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  Product.create({
    name,
    price,
    description,
    quantity,
    ref,
    brand,
    size,
    color,
    date: formattedDate,
  })
    .then((newProduct) => {
      console.log("New Product:", newProduct);
      res.json(newProduct);
    })
    .catch((err) => {
      console.error("Error creating product:", err);
      res.status(500).json(err);
    });
};

module.exports.updateQuantity = async (req, res) => {
  const updatedProducts = req.body;
  try {
    const promises = updatedProducts.map((product) =>
      Product.findByIdAndUpdate(
        product._id,
        { quantity: product.quantity },
        { new: true }
      )
    );
    const results = await Promise.all(promises);
    const allProducts = await Product.find(); // Obtener todos los productos actualizados
    res.json(allProducts);
  } catch (err) {
    console.error("Error updating products:", err);
    res.status(500).json(err);
  }
};
