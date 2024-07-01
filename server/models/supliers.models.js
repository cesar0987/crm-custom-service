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
        type: Number,
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
        type: Number,
        required: [true, "Postal code is required"],
    },
    sitioWep: {
        type: String,
    },
});

const Supliers = mongoose.model("Supliers", supliersSchema);

module.exports = Supliers;
        },
    ruc: {
        type: String,
        required: [true, "Ruc is required "],
    },
    phone:{
        type: Number,
        required: [true, "phone is required"],
    },
    address: {
        type: String,
        required: [true, "address is required"],
        minlength: [5, "address must be at least 5 characters long"],
    },
    mail:{
        type: String,
        required: [true, "mail is required"],
    },
    postalCode:{
        type: Number,
        required: [true, "Postal code is required"],
    },
    sitioWep:{
        type: String
    }
}) 

const Supliers = mongoose.model("Supliers", supliersSchema);

module.exports = Supliers;
