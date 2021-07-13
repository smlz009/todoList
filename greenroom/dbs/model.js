const mongoose = require('mongoose');

const Schema = mongoose.Schema

const todoSchema = new Schema({
    todoListName:{
        type:String,
        required:true,
        unique:true,
    },
    isDone:{
        type:Boolean,
        default:'false'
    }
})

module.exports = mongoose.model('todolist',todoSchema)