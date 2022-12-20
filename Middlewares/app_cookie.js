const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")

app.set("view engine", "ejs");

// middlewares
app.use(express.static("public"));

// 在cookieparser 內加入 字串 來 sgin cookie ，避免被人更改
app.use(cookieParser("DUDU's cookies"));


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


app.get("/", (req,res) =>{
    // res.cookie("name", "Wilson");
    let {name} = req.cookies;
    res.send(name + "Welcome to the homepage.")
    // 無法直接拿出來，要透過cookieparser
    // console.log(req.cookies)
})

app.get("/NEWCookies", (req,res) =>{
  // res.cookie("name", "Wilson");
  let {address} =req.signedCookies;
  res.send("Welcome to the homepage." +address)
  // 無法直接拿出來，要透過cookieparser
  // console.log(req.cookies)
})



app.get("/getSignedCookies", (req,res) =>{
  res.cookie("address", "Hawaii St." ,{ signed : true});
  res.send("Cookie has been send.");});

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
