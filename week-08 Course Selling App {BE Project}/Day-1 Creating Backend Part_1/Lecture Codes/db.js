const mongoose = require("mongoose")
const Schema = mongoose.Schema;                            
const ObjectId = mongoose.ObjectId; 

const userSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
});