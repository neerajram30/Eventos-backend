const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBSession=require('connect-mongodb-session')(session)
const app = express();
const user = require('./routes/api/user')
const events = require('./routes/api/events')
require('dotenv').config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Express connection
app.listen(PORT,()=>{
    console.log("Connected on port "+PORT);
})

//Database connection
mongoose
  .connect(
    MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("mongodb wrror"+err));

//End point test
app.get("/", (req, res) => {
    res.json({ message: "API Working" });
  });  

//Routes
app.use("/api/user",user)
app.use("/api/events",events)
