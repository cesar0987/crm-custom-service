const SupliersController = require("../controllers/supliers.controllers");

module.exports = (app) => {
  app.get("/api/supliers", SupliersController.getAllSupliers);
  app.post("/api/agregar/supliers", SupliersController.createSupliers);
};
