const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBSession=require('connect-mongodb-session')(session)
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const user = require('./routes/api/user')
// const events = require('./routes/api/events')

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const store = new MongoDBSession({
  uri:MONGO_URI,
  collection:"sessions"
})

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store : store
}))

app.listen(PORT,()=>{
    console.log("Connected on port "+PORT);
})

mongoose
  .connect(
    MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("mongodb wrror"+err));

app.get("/", (req, res) => {
    res.json({ message: "API Working" });
  });  

  
//Routes
app.use("/api/user",user)
// app.use("/api/events",events)