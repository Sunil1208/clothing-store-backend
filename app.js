require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");

const app = express();

// MIDDLEWARES
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// MY ROUTES
app.use("/api/v1", authRoutes);


// DB CONNECTION
mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED!")
}).catch(err => {
    console.log(`ERR CONNECTING DB ${err}`)
});

// PORT
const port = process.env.PORT || 5000;

// STARTING SERVER
app.listen(port, () => {
    console.log(`App is running at port ${port}`);
});