const Supliers = require("../models/supliers.models");

module.exports.getAllSupliers= (req, res) => {
  Supliers.find()
    .then((allSupliers) => {
      console.log("All Supliers:", allSupliers);
      res.json(allSupliers);
    })
    .catch((err) => {
      console.error("Error retrieving Supliers:", err);
      res.status(500).json(err);
    });
};

module.exports.createSupliers = (req, res) => {
  Supliers.create(req.body)
    .then((newSupliers) => {
      console.log("New Supliers:", newSupliers);
      res.json(newSupliers);
    })
    .catch((err) => {
      console.error("Error creating supliers:", err);
      res.status(400).json(err);
    });
};
