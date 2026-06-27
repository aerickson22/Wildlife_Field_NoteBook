import express from 'express';
import Users from '../models/Users.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post("/auth/login", async (req, res) => {
    const { username, password } = req.body;
    if(!username || !password){
        return res.status(400).send({ error: 'Bad request: No data provided' });
    }
    try{
        const user = await Users.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }
        if (!user.isActive) {
            return res.status(403).send({ error: 'Deactivated Account' });
        }
        res.status(200).send(user);
    } catch(err){
        console.error("An error occurred: ", err);
        res.status(500).send({ error: 'An interal server error occurred' });
    }
});

router.post("/auth/register", async (req, res) => {
    const { username, email, password, firstName, lastName } = req.body;
    if(!username || !password || !email || !firstName || !lastName){
        return res.status(400).send({ error: 'Bad request: No data provided' });
    }
    try{
        const exitisingEmail= await Users.findOne({ email: req.body.email});
        if(exitisingEmail) {
            return res.status(409).send({ error: 'Conflict: A user with this email already exists'  });
        }
        const exitisingUsername = await Users.findOne({ username: req.body.username });
        if(exitisingUsername) {
            return res.status(409).send({ error: 'Conflict: A user with this username already exists'  });
        }
        const hashPassword = bcrypt.hashSync(password, 12);
        await Users.create({ username, email, password: hashPassword, firstName, lastName });
        res.status(201).send({ message: 'User created successfully', username});
    } catch(err){
        console.error("An error occurred: ", err);
        res.status(500).send({ error: 'An interal server error occurred' });
    }
});
export default router;
