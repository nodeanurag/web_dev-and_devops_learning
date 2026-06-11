const mongoose = require("mongoose");
const schema = mongoose.Schema;
const objectId = schema.ObjectId;



const user = new schema({
    email: {type: string, unique: true},
    password: string,
    name: string,
    
});