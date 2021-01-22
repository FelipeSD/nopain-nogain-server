const { Schema } = require("mongoose");

module.exports = mongoose => {
    const Client = mongoose.model("Client", mongoose.Schema({
        name: String,
        age: Number, // years
        weight: Number, // Kg
        height: Number, // meters
        gender: String,
    }, {timestamps: true}));
    return Client;
};