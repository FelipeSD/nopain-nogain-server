module.exports = mongoose => {
    const Client = mongoose.model("Client", mongoose.Schema({
        userId: String,
        
        name: String,
        age: Number, // years
        weight: Number, // Kg
        height: Number, // meters
        gender: String,
    }, {timestamps: true}));
    return Client;
};