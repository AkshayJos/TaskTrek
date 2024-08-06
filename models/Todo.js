import mongoose, { Schema } from 'mongoose';

const TodoSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
        },
    description : {
        type : String,
        required : true
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    createDate : {
        type : Date,
    }
})


const Todo = mongoose.model('todo',TodoSchema);

export default Todo;