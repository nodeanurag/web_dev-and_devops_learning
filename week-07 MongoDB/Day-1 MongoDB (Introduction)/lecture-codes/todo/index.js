const mongoose = require("mongoose");
const schema = mongoose.Schema;
const objectId = schema.ObjectId;



const user = new schema({
    email: {type: string, unique: true},
    password: string,
    name: string,
    
});

const todo = new schema({
    title: string,
    description: string,
    done: boolean,
    userId: {type: objectId, ref: "user"}

});

const userModel = mongooose.model('user', user);
const todoModel = mongooose.model('todo', todo);

module.exports = {
    userModel: userModel,
    todoModel: todoModel
}