const InventoryController = require("../controllers/inventory.controllers");

module.exports = (app) => {
  app.get("/api/products", InventoryController.getAllProducts);
  app.post("/api/products", InventoryController.createProduct);
};
