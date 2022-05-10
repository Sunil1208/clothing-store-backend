require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED!")
}).catch(err => {
    console.log(`ERR CONNECTING DB ${err}`)
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`App is running at port ${port}`);
});