const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

//引入users.js
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");

//DB config
const db = require("./config/keys").mongoURI;



//Connect to Mongodb
mongoose.connect(db,{ useNewUrlParser: true })
        .then(() => console.log("MongoDB Connected"))
        .catch(err => console.log(err));


//初始化passport
app.use(passport.initialize());
require("./config/passport")(passport);


app.get("/",(req,res) => {
    res.send("Hello word!");
})

//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



//使用routes
app.use("/api/users",users);
app.use("/api/profiles",profiles);

const port = process.env.port || 5000;

app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})