const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Load mongoose
require("./models/Customer");
const mlabDB = "PUT YOUR MLAB DB HERE";
mongoose.connect(mlabDB, () => {
    console.log("Customer Service DB is connected");
});
const Customer = mongoose.model("customer");

const app = express();
app.use(bodyParser.json());

//Create func
app.post("/customer", async (req, res) => {
    const newCustomer = new Customer({
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    });
    const result = await newCustomer.save();

    res.send("A Customer created");
});

app.get('/customers', async (req, res) => {
    const result = await Customer.find();
    res.json(result);
});

app.get('/customer/:id', (req, res) => {
    Customer.findById(req.params.id)
        .then((customer) => {
            if (customer) {
                res.json(customer);
            } else {
                res.sendStatus(404);
            }
        }).catch(err => {
            if (err) {
                res.json(err.message);
            }
        });
});

app.delete('/customer/:id', (req, res) => {
    Customer.findByIdAndRemove(req.params.id)
        .then((result) => {
            console.log(result);
            res.send('Customer removed');
        })
        .catch(err => {
            if (err) {
                res.send(err.message);
            }
        });
});


app.listen("5555", () => {
    console.log('Up and Running Customer Service');
});