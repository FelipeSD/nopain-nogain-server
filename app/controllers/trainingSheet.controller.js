const { trainingSheetModel, trainingSheet } = require("../models");
const db = require("../models");
const TrainingSheet = db.trainingSheet;
const Client = db.client;

exports.create = (req, res) => {
    let data = req.body;

    if(!data.exercise || !data.owner){
        res.status(400).send({message: "Exercise name and its owner, both required, weren't set"});
        return
    }

    // Check if client do exists
    Client.findById(data.owner).then(clientData=>{
        
        if(clientData){

            // deve ser um array 
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
            training.save(trainingSheetModel).then(trainingData=>{
                res.send(trainingData);
            }).catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });

        }else{
            res.status(400).send({message: "Couldn't find this client, sorry :/"});
            return
        }
    });


}

exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(req);
    TrainingSheet.findById(id).then(data => {
        if(!data){
            res.status(404).send({ message: "Training Sheet Not Found" });
        }else{
            res.send(data)
        }
    })
}

exports.findAll = (req, res) => {
    const condition = {};
    
    console.log(req);

    TrainingSheet.find(condition).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({ message: "Couldn't get training sheet list"})
    });
}

exports.update = (req, res) => {
    if(!req.body){
        res.status(400).send({ message: "Invalid data" });
        return;
    }
    
    const id = req.params.id;

    TrainingSheet.findByIdAndUpdate(id, req.body).then(data => {
        if (!data) {
            res.status(400).send({ message: "Can't update training sheet" })
        } else {
            res.send({ message: "Training Sheet successfully updated" });
        }
    }).catch(err => {
        res.status(500).send({ message: "Biiirll!!! O erro ta saindo da jaula" });
    });
}

exports.delete = (req, res) => {
    const id = req.params.id;

    TrainingSheet.findByIdAndRemove(id).then(data => {
        if (!data) {
            res.status(400).send({ message: "Can't remove training sheet" })
        } else {
            res.send({ message: "Training Sheet successfully removed" });
        }
    }).catch(err => {
        res.status(500).send({ message: "Hoops! Error ocur" });
    });
}

exports.getOwnerClient = (req, res) => {
    const id = req.params.id;

    TrainingSheet.findById(id).then(trainingSheetData => {
        if(trainingSheetData){
            Client.findById(trainingSheetData.owner).then(clientData => {
                if (!clientData) {
                    res.status(400).send({ message: "Can't find training sheet owner" })
                }else{
                    res.send(clientData);
                }
            });
        }else{
            res.status(400).send({ message: "Can't find this training sheet" })
        }
    });
}