import express from 'express';
import bcrypt from 'bcrypt';
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

router.get("/fieldlogs/:id", async (req, res) => {
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

router.get("/fieldlogs/:userid", async (req, res) => {
});

router.post("/fieldlogs/:userid", async (req, res) => {
    const { date, time, taxon } = req.body;
    if(!date || !time || !taxon){
        return res.status(400).send({ error: 'Bad request: No required data provided' });
    }
    try{

    }catch(err){

    }
});

router.put("/fieldlogs/:id", async (req, res) => {

});

router.delete("/fieldlogs/:id", async (req, res) => {

})

export default router;
