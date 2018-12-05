const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
    customerID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    bookId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    initialDate: {
        type: Date,
        require: true
    },
    deliveryDate: {
        type: Date,
        require: true
    }
});

mongoose.model('order', orderSchema);
