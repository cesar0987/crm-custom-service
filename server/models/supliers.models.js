const mongoose = require("mongoose");

const supliersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters long"],
    },
    ruc: {
        type: String,
        required: [true, "RUC is required"],
    },
    phone: {
        type: String, // Assuming phone number is stored as a string
        required: [true, "Phone is required"],
    },
    address: {
        type: String,
        required: [true, "Address is required"],
        minlength: [5, "Address must be at least 5 characters long"],
    },
    mail: {
        type: String,
        required: [true, "Mail is required"],
        match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    postalCode: {
        type: String, // Assuming postal code is stored as a string
        required: [true, "Postal code is required"],
    },
    sitioWep: {
        type: String,
    },
});

const Supliers = mongoose.model("Supliers", supliersSchema);

module.exports = Supliers;

