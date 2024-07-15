const InventoryController = require("../controllers/inventory.controllers");

module.exports = (app) => {
  app.get("/api/products", InventoryController.getAllProducts);
  app.post("/api/create/product", InventoryController.createProduct);
  app.put('/api/update/quantity', InventoryController.updateQuantity);
  app.get('/api/product/:id', InventoryController.getProductById);
  app.put('/api/update/product/:id', InventoryController.updateProduct);
};
