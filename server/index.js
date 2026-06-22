import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from "./routes/users.js";
import notesRoutes from "./routes/notes.js";

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;
const host = process.env.HOST || "localhost";

app.use("/api", userRoutes);
app.use("/api", notesRoutes);

const url = process.env.MONGO_URL || "mongodb://localhost:27017/";
const dbName = process.env.MONGO_DB_NAME || "field_notebook";

const uri = `${url}${dbName}`;

mongoose.connect(uri).then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
        console.log("App live at http://%s:%s", host, port);
    });
}).catch(err => {
    console.log("Failed to connect to MongoDB: ", err);
    process.exit(1);
});
