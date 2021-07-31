const { trainingSheetModel, trainingSheet } = require("../models");
const db = require("../models");
const TrainingSheet = db.trainingSheet;
const Client = db.client;

exports.create = async (req, res) => {
    let data = req.body;

    if(!data.exercise || !data.owner){
        res.status(400).send({message: "Exercise name and its owner, both required, weren't set"});
        return
    }

    try{
        // Check if client do exists
        const clientData = await  Client.findOne({
            _id: data.owner,
            userId: data.userId
        });

        if(!clientData) {
            res.status(400).send({message: "Couldn't find this client, sorry :/"});
            return false;
        }

        const training = new TrainingSheet({
            exercise: data.exercise,
            weight: data.weight,
            repetition: data.repetition, // how many times until stop
            restTime: data.restTime, // allow the muscle to recover - usually in the range of 30 seconds to two minutes
            sets: data.sets, // series of repetitions to complete the exercise
            frequency: data.frequency, // Diary, 2 times/week...
            notes: data.notes,
            owner: data.owner
        });

        // find the client by id to associate
        training.save(trainingSheetModel).then(trainingData => {
            res.send(trainingData);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
    } catch (e){
        res.status(500).send({ message: "Biiirll!!! O erro ta saindo da jaula", e});
    }
}

exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await TrainingSheet.findById(id);
        if(!data){
            res.status(404).send({ message: "Training Sheet Not Found" });
        }else{
            res.send(data)
        }
    }catch (e) {
        res.status(500).send({ message: "Biiirll!!! O erro ta saindo da jaula", e});
    }
}

exports.findAll = async (req, res) => {
    try{
        const condition = {};
        const data = await TrainingSheet.find(condition);
        res.send(data);
    }catch (e) {
        res.status(500).send({ message: "Couldn't get training sheet list"})
    }
}

exports.update = async (req, res) => {
    if(!req.body){
        res.status(400).send({ message: "Invalid data" });
        return;
    }

    try{
        const id = req.params.id;
        const data = await TrainingSheet.findByIdAndUpdate(id, req.body);
        if (!data) {
            res.status(400).send({ message: "Can't update training sheet" })
        } else {
            res.send({ message: "Training Sheet successfully updated" });
        }
    }catch (e) {
        res.status(500).send({ message: "Biiirll!!! O erro ta saindo da jaula" });
    }
}

exports.delete = async (req, res) => {
    try{
        const id = req.params.id;
        const data = await TrainingSheet.findByIdAndRemove(id);
        if (!data) {
            res.status(400).send({ message: "Can't remove training sheet" })
        } else {
            res.send({ message: "Training Sheet successfully removed" });
        }
    }catch (e) {
        res.status(500).send({ message: "Hoops! Error ocur" });
    }
}

exports.getOwnerClient = async (req, res) => {
    try{
        const id = req.params.id;
        const trainingSheetData = await TrainingSheet.findById(id);
        if(trainingSheetData){
            Client.findById(trainingSheetData.owner)
                .then(clientData => {
                    if (!clientData) {
                        res.status(400).send({ message: "Can't find training sheet owner" })
                    }else{
                        res.send(clientData);
                    }
                });
        }else{
            res.status(400).send({ message: "Can't find this training sheet" })
        }
    }catch (e) {
        res.status(500).send({ message: "Hoops! Error ocur" });
    }
}
