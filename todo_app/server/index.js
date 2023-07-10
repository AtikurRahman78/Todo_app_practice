require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnection = require('./confiq/db');
const Todo = require('./models/todoModel');
const Category = require('./models/categoryModel');
const app = express();

dbConnection();
app.use(cors());
app.use(express.json());

app.post('/addtodo', function (req, res) {

    const { name, category } = req.body;

    const todo = new Todo({
        name,
        category
    });

    todo.save();

    res.send(todo);
});


app.get('/alltodo', async function (req, res) {

    let data = await Todo.find({}).populate('category');

    res.send(data);

});

// Create Category
app.post('/createcategory', function (req, res) {

    const { name } = req.body;

    const category = new Category({
        name
    });

    category.save();

    res.json(category);
});

// Get Category
app.get('/allcategory', async function (req, res) {

    let categoryData = await Category.find({});

    res.json(categoryData);

});

// Edit
app.post('/edit', async function (req, res) {

    const { id, name } = req.body;

    let updated = await Todo.findOneAndUpdate({ _id: id }, { name }, { new: true });

    res.json(updated);

});

// Delete
app.post('/delete', async function (req, res) {

    const { id } = req.body;

    await Todo.findByIdAndDelete(id);

    res.json('Deleted!');

});


app.listen(8000, () => {
    console.log('Alhamdulliah server running');
});