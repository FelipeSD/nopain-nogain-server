const { clientModel } = require("../models");
const db = require("../models");
const Client = db.client;
const TrainingSheet = db.trainingSheet;

exports.create = async (req, res) => {
    let data = req.body;

    if(!data.name){
        res.status(400).send({message: "Name required not set"});
        return
    }

    const client = new Client({
        userId: data.userId,
        name: data.name,
        age: data.age,
        height: data.height,
        weight: data.weight,
        gender: data.gender
    });

    try {
        const data = await client.save(clientModel);
        res.send(data);
    }catch (e) {
        res.status(500).send({
            message: e.message
        });
    }
}

exports.findOne = (req, res) => {

    Client.findOne(req.body).exec((err, client)=>{
        if(!err){
            if(
                client
                && Object.keys(client).length === 0 
                && client.constructor === Object
            ){
                res.status(404).send({ message: "Client Not Found" });
            }else{
                res.send(client);
            }
        }else{
            res.status(500).send({ message: "Couldn't get client", err})
        }
    });
}

exports.findAll = async (req, res) => {
    try {
        const condition = {...req.body};
        const data = await Client.find(condition)
        res.send(data);
    }catch (e) {
        res.status(500).send({ message: "Couldn't get client list"})
    }
}

exports.update = async (req, res) => {
    if(!req.body){
        res.status(400).send({ message: "Invalid data" });
        return;
    }
    
    try {
        let id = req.params.id;
        const data = await Client.findByIdAndUpdate(id, req.body);
        if (!data) {
            res.status(400).send({ message: "Can't update client" })
        } else {
            res.send({ message: "Client successfully updated" });
        }
    }catch (e) {
        res.status(500).send({ message: "Biiirll!!! O erro ta saindo da jaula" });
    }
}

exports.delete = async (req, res) => {
    try{
        const id = req.params.id;
        const data = await Client.findByIdAndRemove(id);
        if (!data) {
            res.status(400).send({ message: "Can't remove client" })
        } else {
            TrainingSheet.deleteMany({owner: id}).exec();
            res.send({ message: "Client successfully removed" });
        }
    }catch (e) {
        res.status(500).send({ message: "Hoops! Error ocur" });
    }
}

exports.getTrainingSheets = async (req, res) => {
    try {
        const id = req.params.id;
        const trainingSheetData = await TrainingSheet.find({owner: id});
        if (!trainingSheetData) {
            res.status(400).send({ message: "Can't find workout logs" })
        }else{
            res.send(trainingSheetData);
        }
    }catch (e) {
        res.status(500).send({ message: "Hoops! Error ocur" });
    }
}
