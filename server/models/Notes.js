import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const NoteSchema = new Schema({
});

const Notes = mongoose.model("FieldLog", NoteSchema, "FieldLog");

export default Notes;
