const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require("axios")

//Load mongoose
require("./models/Order");
const mlabDB = "PUT YOUR MLAB DB HERE";
mongoose.connect(mlabDB, () => {
    console.log("Order Service DB is connected");
});
const Order = mongoose.model("order");

const app = express();
app.use(bodyParser.json());

//ROUTES
app.post("/order", async (req, res) => {
    const newOrder = new Order({
        customerID: mongoose.Types.ObjectId(req.body.customerID),
        bookId: mongoose.Types.ObjectId(req.body.bookId),
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate
    });
    const result = await newOrder.save();

    res.send("A Order created");
});

app.get('/orders', async (req, res) => {
    const result = await Order.find();
    res.json(result);
});

app.get('/order/:id', (req, res) => {
    Order.findById(req.params.id)
        .then(async (order) => {
            if (order) {
                const customer = await axios.get('http://localhost:5555/customer/' + order.customerID);

                const OrderObject = { customerName: customer.data.name, bookTitle: '' };
                const bookCustomer = await axios.get('http://localhost:4545/book/' + order.bookId);
                OrderObject.bookTitle = bookCustomer.data.title
                res.json(OrderObject);
            } else {
                res.sendStatus(404);
            }
        }).catch(err => {
            if (err) {
                res.json(err.message);
            }
        });
});

app.delete('/order/:id', (req, res) => {
    Order.findByIdAndRemove(req.params.id)
        .then((result) => {
            console.log(result);
            res.send('Order removed');
        })
        .catch(err => {
            if (err) {
                res.send(err.message);
            }
        });
});

app.listen(7777, () => {
    console.log('Up and running Order Service');
})

105924 + 66252