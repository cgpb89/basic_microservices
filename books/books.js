const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//Load mongoose
require("./models/Book");
const mLabDB = "PUT YOUR MLAB DB HERE"
mongoose.connect(mLabDB, () => {
    console.log("Books Service DB is connected");
})
const Book = mongoose.model("book");

const app = express();
app.use(bodyParser.json());

//Routes
app.get('/', (req, res) => {
    res.send("This is our main endpoint!!");
})

//Create func
app.post("/book", async (req, res) => {
    const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher
    });
    const result = await newBook.save();

    res.send("A book created");
});

app.get('/books', async (req, res) => {
    const result = await Book.find();
    res.json(result);
});

app.get('/book/:id', (req, res) => {
    Book.findById(req.params.id)
        .then((book) => {
            if (book) {
                res.json(book);
            } else {
                res.sendStatus(404);
            }
        }).catch(err => {
            if (err) {
                res.json(err.message);
            }
        });
});

app.delete('/book/:id', (req, res) => {
    Book.findByIdAndRemove(req.params.id)
        .then((result) => {
            console.log(result);
            res.send('Book removed');
        })
        .catch(err => {
            if (err) {
                res.send(err.message);
            }
        });
});
    

app.listen(4545, () => {
    console.log("Up and running, Books service");
});