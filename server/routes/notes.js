import express from 'express';
import mongoose from 'mongoose';
import Notes from '../models/Notes.js';

const router = express.Router();

router.get("/fieldlogs", async (req, res) => {
    try{
        var fieldLogs = await Notes.find();
        if(!fieldLogs){
            return res.status(404).send({ error: "Field Logs Not Found" });
        }
        return res.status(200).send(fieldLogs);
    }catch(error){
        console.log("Error fetching field log", error);
        return res.status(500).send({ error: "An internal Server Error Occur"})
    }
});

router.get("/fieldlogs/logs/:id", async (req, res) => {
    try{
        const results = await Notes.findById( req.params.id );
        if(!results){
            return res.status(404).send({ error: "Field Log Not Found" });
        }
        return res.status(200).send(results);
    }catch(error){
        console.log("Error fetching field log", error);
        return res.status(500).send({ error: "An internal Server Error Occur"})
    }
});

router.get("/fieldlogs/users/:userid", async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.userid)){
        return res.status(400).send({ error: 'Bad request: No required data provided'});
    }
    const foreignKey = new mongoose.Types.ObjectId(req.params.userid);
    try{
        const results = await Notes.find({ _user_id: foreignKey });
        if(!results || results.length === 0){
            return res.status(404).send({ error: "Field Log Not Found" });
        }
        return res.status(200).send(results);
    }catch(error){
        console.log("Error fetching field log", error);
        return res.status(500).send({ error: "An internal Server Error Occur"})
    }
});

router.post("/fieldlogs/users/:userid", async (req, res) => {
    const { date, time, taxon } = req.body;
    if(!date || !time || !taxon){
        return res.status(400).send({ error: 'Bad request: No required data provided' });
    }
    if(!mongoose.Types.ObjectId.isValid(req.params.userid)){
        return res.status(400).send({ error: 'Bad request: No required data provided'});
    }
    const foreignKey = new mongoose.Types.ObjectId(req.params.userid);
    try{
        const results = await Notes.create({
            date: req.body.date,
            time: req.body.time,
            temperature_F: req.body.temperature_F,
            conditions: Array.isArray(req.body.conditions) ? req.body.conditions : req.body.conditions ? [req.body.conditions] : [],
            taxon: req.body.taxon,
            location: {
                site: req.body.location?.site,
                code: req.body.location?.code,
                county: req.body.location?.county,
                county_code: req.body.location?.county_code
            },
            ecosystem: {
                type_name: req.body.ecosystem?.type_name,
                code: req.body.ecosystem?.code
            },
            methods_of_detection: Array.isArray(req.body.methods_of_detection) ? req.body.methods_of_detection : req.body.methods_of_detection ? [req.body.methods_of_detection] : [],
            natural_history: req.body.natural_history,
            abbreviations: req.body.abbreviations,
            _user_id: foreignKey
        });
        res.status(201).send({ message: 'Field Log is created'});
    }catch(err){
        console.log("An error occurred:", err);
        res.status(500).send({ error: 'An internal Server Error Occurred' });
    }
});

router.put("/fieldlogs/:id", async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).send({ error: 'Bad request: Invalid ID' });
    }
    const key = new mongoose.Types.ObjectId(req.params.id);
    try{
        const results = await Notes.updateOne({ _id: key }, { $set: req.body });
        if(results.matchedCount === 0){
            return res.status(404).send({ error: 'Field Log not found' });
        }
        res.status(200).send({ message: 'Field Log updated' });
    }catch(err){
        console.log("An error occurred:", err);
        res.status(500).send({ error: 'An internal Server Error Occurred' });
    }
});

router.delete("/fieldlogs/:id", async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).send({ error: 'Bad request: Invalid ID' });
    }
    const key = new mongoose.Types.ObjectId(req.params.id);
    try{
        const results = await Notes.deleteOne({ _id: key });
        if(results.deletedCount === 0){
            return res.status(404).send({ error: 'Field Log not found' });
        }
        res.status(200).send({ message: 'Field Log deleted' });
    }catch(err){
        console.log("An error occurred:", err);
        res.status(500).send({ error: 'An internal Server Error Occurred' });
    }
})

export default router;
