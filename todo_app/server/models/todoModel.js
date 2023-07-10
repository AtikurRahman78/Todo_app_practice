const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
    name: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    }
});


module.exports = mongoose.model('Todo', todoSchema);