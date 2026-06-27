import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const NoteSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    temperature_F: {
        type: Number,
    },
    conditions: {
        type: [String],
    },
    taxon: {
        type: String,
        required: true,
    },
    location: {
        site: { type: String },
        code: { type: String },
        county: { type: String },
        county_code: { type: String },
    },
    ecosystem: {
        type_name: { type: String },
        code: { type: String },
    },
    methods_of_detection: [
        {
        method: { type: String },
        code: { type: String },
        },
    ],
    natural_history: {
        type: String,
    },
    abbreviations: {
        type: Map,
        of: String,
    },
});

const Notes = mongoose.model("FieldLog", NoteSchema, "FieldLog");

export default Notes;
