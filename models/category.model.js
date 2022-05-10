const mongoose = require("mongoose");

const { Schema } = mongoose;

const CategorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Category", CategorySchema);