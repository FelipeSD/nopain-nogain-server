module.exports = mongoose => {
    return mongoose.model("Client", mongoose.Schema({
        userId: String,

        name: String,
        age: Number, // years
        weight: Number, // Kg
        height: Number, // meters
        gender: String,
    }, {timestamps: true}));
};
