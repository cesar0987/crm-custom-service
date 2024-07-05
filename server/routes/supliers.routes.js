const SupliersController = require("../controllers/supliers.controllers");

module.exports = (app) => {
  app.get("/api/supliers", SupliersController.getAllSupliers);
  app.post("/api/agregar/supliers", SupliersController.createSupliers);
  app.put("/api/actualizar/supliers/:id", SupliersController.updateSupliers);
  app.delete("/api/eliminar/supliers/:id", SupliersController.deleteSupliers);
  app.get('/api/supliers/:id', SupliersController.getSupliers);
};
