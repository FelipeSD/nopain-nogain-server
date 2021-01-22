module.exports = app => {
    const client = require("../controllers/client.controller");

    var router = require("express").Router();

    router.post("/", client.create);
    router.get("/", client.findAll);
    router.get("/:id", client.findOne);
    router.get("/:id/trainingSheets", client.getTrainingSheets);
    router.put("/:id", client.update);
    router.delete("/:id", client.delete);

    app.use("/clients", router);
}