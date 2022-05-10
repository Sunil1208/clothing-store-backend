const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema;

const ProductCartSchema = new Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number,
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema)

const OrderSchema = new Schema({
    products: [ProductCartSchema],
    transaction_id: {},
    amount: {
        type: Number
    },
    address: String,
    updated_at: Date,
    user: {
        type: ObjectId,
        ref: "User"
    }
}, {timestamps: true});

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, ProductCart }
