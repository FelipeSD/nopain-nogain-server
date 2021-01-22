const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {
    mongoose: mongoose,
    url: dbConfig.url,
    client: require("./client.model.js")(mongoose),
    trainingSheet: require("./trainingSheet.model.js")(mongoose),
};
module.exports = db;