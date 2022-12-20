require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

app.set("view engine", "ejs");

// middlewares
app.use(express.static("public"));

// 在cookieparser 內加入 字串 來 sgin cookie ，避免被人更改
app.use(cookieParser("DUDU's cookies"));

//session
app.use(
  session({
    // secret: "Should be an env variable but not for now",
    secret:process.env.SECRET,//使用設定在.env檔的值
    resave: false,
    // saveUninitialized false 就是說 只有收到 sesson req 後 才會產生cookies
    saveUninitialized: false,
  })
);

app.use(flash());

mongoose
  .connect("mongodb://localhost:27017/test", {
    // useFindAndModify: false,
    // useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongodb.");
  })
  .catch((e) => {
    console.log(e);
  });

app.get("/", (req, res) => {
    console.log(req.session);
    // console.log(process.env);
    console.log(process.platform);
    console.log(process.version);
    console.log(process.env.SECRET);
    req.flash("Success_message", "Successfully get to the homepage");
    res.send("Hi,welcome to homepage." + req.flash("Success_message"));
});

app.get("/verifyUser", (req,res)=>{
    req.session.isVerified = true;
    res.send("You are verified.")
})

app.get("/secret",(req,res)=>{
    if(req.session.isVerified == true){
        res.send("Here is my secret - I love panda");
    }else{
        res.status(403).send("You are not authorized to see my secret")
    }
})

// Error handling 簡單的
app.get("/*", (req, res) => {
  res.status(404).send("404 Page not found.");
});

// Error handler

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something is broken. We will fix it soon.");
});

app.listen(3000, () => {
  console.log("Server running on port 3000.");
});
