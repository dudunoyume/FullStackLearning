import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express from "express";
const app = express();
import ejs from "ejs";
import mongoose from "mongoose";
// 因為methodOverride 目前版本只支持ES6 那就只能這樣寫
import methodOverride from "method-override";


import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import passport from "passport";

import authRoute from "./routes/auth-route.js";
import profileRoute from "./routes/profile-route.js";
import "./config/passport.js";
// 這邊只有使用  session 
import session from "express-session";
import cookieSession from "cookie-session";
import flash from "connect-flash";

// Middleware------------------------------------------------------------------------

app.set("view engine", "ejs");
// mongoose.set('useFindAndModify', false);//不想看到修改的Warning
app.use(express.json());
app.use(express.static("public"));
// express 現在已經內含了 body-parser
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

// 在cookieparser 內加入 字串 來 sgin cookie ，避免被人更改
app.use(cookieParser(process.env.SECRET));

//session
app.use(
  session({
    // secret: "Should be an env variable but not for now",
    secret: process.env.SECRET, //使用設定在.env檔的值
    resave: false,
    // saveUninitialized false 就是說 只有收到 sesson req 後 才會產生cookies
    saveUninitialized: true,
  })
);


// app.use(cookieSession({
//   keys : [process.env.SECRET],

// }))
// 初始化passport
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req,res,next)=>{
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.err_msg = req.flash("err_msg");
  // res.locals.error 這個是passport 專用的
  res.locals.error = req.flash("error");
  next();
})


//檢查 路由你有沒有 auth 如果有的話 就會進入 auth 
app.use("/auth",authRoute);
app.use("/profile",profileRoute);

// 注意上面的middleware 的順序 ， 必須是完成 session 的設定 才使用 passport 再使用  flash 最後才載入 route



// 製作儲存鄧入狀態的midleware
// const requireLogin = (req,res,next) =>{
//     if(!req.session.isVerified == true){
//         res.redirect("login");
//     }else{
//         next();
//     }
// }
// Middleware------------------------------------------------------------------------
// 把DBConnect 用 dotenv方式 藏起來
mongoose
  .connect(process.env.DB_CONNECT , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to mongo atlas.");
  })
  .catch((e) => {
    console.log("Connection failed");
    console.log(e);
  });



app.get("/", (req,res)=>{
  // console.log(process.env.GOOGLE_CLIENT_SECRET);
  // console.log(process.env.GOOGLE_CLIENT_ID);
  // console.log(process.env.GOOGLE_CLIENT_SECRET);
    res.render("index", {user :req.user});
})

app.listen(8080,()=>{
    console.log("Server running on port 8080")
})