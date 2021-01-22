const { clientModel, trainingSheet } = require("../models");
const db = require("../models");
const Client = db.client;
const TrainingSheet = db.trainingSheet;

exports.create = (req, res) => {
    let data = req.body;

    if(!data.name){
        res.status(400).send({message: "Name required not set"});
        return
    }

    const client = new Client({
        name: data.name,
        age: data.age,
        gender: data.gender
    });

    client.save(clientModel).then(data=>{
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    Client.findById(id).populate("trainingSheets").then(data => {
        if(!data){
            res.status(404).send({ message: "Client Not Found" });
        }else{
            res.send(data)
        }
    })
}

exports.findAll = (req, res) => {
    const condition = {};

    Client.find(condition).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({ message: "Couldn't get client list"})
    });
}

exports.update = (req, res) => {
    if(!req.body){
        res.status(400).send({ message: "Invalid data" });
        return;
    }
    
    const id = requ.params.id;

    Client.findByIdAndUpdate(id, req.body).then(data => {
        if (!data) {
            res.status(400).send({ message: "Can't update client" })
        } else {
            res.send({ message: "Client successfully updated" });
        }
    }).catch(err => {
        res.status(500).send({ message: "Biiirll!!! O erro ta saindo da jaula" });
    });
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Client.findByIdAndRemove(id).then(data => {
        if (!data) {
            res.status(400).send({ message: "Can't remove client" })
        } else {
            TrainingSheet.deleteMany({owner: id}).exec();
            res.send({ message: "Client successfully removed" });
        }
    }).catch(err => {
        res.status(500).send({ message: "Hoops! Error ocur" });
    });
}

exports.getTrainingSheets = (req, res) => {
    const id = req.params.id;

    TrainingSheet.find({owner: id}).then(trainingSheetData => {
        if (!trainingSheetData) {
            res.status(400).send({ message: "Can't find workout logs" })
        }else{
            res.send(trainingSheetData);
        }
    });
}