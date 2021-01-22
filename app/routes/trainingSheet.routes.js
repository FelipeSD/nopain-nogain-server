module.exports = app => {
    const trainingSheet = require("../controllers/trainingSheet.controller");

    var router = require("express").Router();

    router.post("/", trainingSheet.create);
    router.get("/", trainingSheet.findAll);
    router.get("/:id", trainingSheet.findOne);
    router.get("/:id/ownerClient", trainingSheet.getOwnerClient);
    router.put("/:id", trainingSheet.update);
    router.delete("/:id", trainingSheet.delete);

    app.use("/trainingSheet", router);
}