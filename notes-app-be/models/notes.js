const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notesSchema = new Schema({
    title:{
        required:true,
        type:String
    },
    description:{
        required:true,
        type:String
    },
    date:{
        required:false,
        type:Date
    }
},{timestamps:true});

const Note = mongoose.model('Note',notesSchema);
module.exports = Note;
