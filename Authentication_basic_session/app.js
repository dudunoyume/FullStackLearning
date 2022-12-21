import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express from "express";
const app = express();
import ejs from "ejs";
import mongoose from "mongoose";
import bodyParser from "body-parser";
// 因為methodOverride 目前版本只支持ES6 那就只能這樣寫
import methodOverride from "method-override";
import session from "express-session";
import flash from "connect-flash";
import cookieParser from "cookie-parser";
import User from "./models/user.js";
import bcrypt from "bcrypt";




// Middleware------------------------------------------------------------------------
// bcrypt 加密需要的字串
const saltRounds = 10;
// 10 或 12 就好 ，總共執行hash function 幾次 ，這個數字是 2 的 n 次方 次

app.set("view engine", "ejs");
// mongoose.set('useFindAndModify', false);//不想看到修改的Warning

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// 在cookieparser 內加入 字串 來 sgin cookie ，避免被人更改
app.use(cookieParser("DUDU's cookies"));
//session
app.use(
  session({
    // secret: "Should be an env variable but not for now",
    secret: process.env.SECRET, //使用設定在.env檔的值
    resave: false,
    // saveUninitialized false 就是說 只有收到 sesson req 後 才會產生cookies
    saveUninitialized: false,
  })
);

app.use(flash());

// 製作儲存鄧入狀態的midleware
const requireLogin = (req,res,next) =>{
    if(!req.session.isVerified == true){
        res.redirect("login");
    }else{
        next();
    }
}
// Middleware------------------------------------------------------------------------
mongoose
  .connect("mongodb://localhost:27017/AuthenticationDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to mongoDB.");
  })
  .catch((e) => {
    console.log("Connection failed");
    console.log(e);
  });

//route------------------------------------------------------------------------

app.get("/", (req, res) => {
  res.send("This is homepage");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

// app.post("/signup", (req,res,next)=>{
//     let { username, password } = req.body;
//     let newUser = new User({username, password});
//     try{
//         newUser.save().then(()=>{
//             res.send("Data has been save.");
//         }).catch((e)=>{
//             res.send("Error!");
//         });
//     }catch(err){
//         next(err)
//     }
// })

// 密碼加密版
app.post("/signup", async (req, res, next) => {
  let { username, password } = req.body;

  // 比對用戶民是否存在
  try {
    let foundUser = await User.findOne({ username });
    if (foundUser) {
        //已經有了
      res.send("Username has been taken.");
    } else {
        //沒有重複
        // 密碼part =====================================================
      //密碼加鹽
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
          next(err);
        }
        console.log(salt);
        //密碼加密
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            next(err);
          }
          console.log(hash);
          //儲存加嚴加密過後的 password
          let newUser = new User({ username, password: hash });
          try {
            newUser
              .save()
              .then(() => {
                res.send("Data has been save.");
              })
              .catch((e) => {
                res.send("Error!!");
              });
          } catch (err) {
            next(err);
          }
        });
      });
    }
  } catch (err) {
    next(err);
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

// app.post("/login",async (req,res,next)=>{
//     let { username, password } = req.body;
//     try{
//         let foundUser = await User.findOne({ username});
//         if(!foundUser){
//             res.send("Username not found.")
//         }else{
//             if(password == foundUser.password){
//                 res.render("secret");
//             }else{
//                 res.send("Password not correst.");
//             }
//         }
//     }catch(e){
//         next(e);
//     }
// });

app.post("/login", async (req, res, next) => {
  let { username, password } = req.body;
  try {
    let foundUser = await User.findOne({ username });
    //檢查用戶名
    if (foundUser) {
      // 檢查password
      bcrypt.compare(password, foundUser.password, (err, result) => {
        if (err) {
          next(err);
        }

        if (result === true) {
            // 儲存已登入的狀態
            req.session.isVerified = true;
            res.redirect("secret");
        } else {
          res.send("Username or password not correct");
        }
      });
    } else {
      res.send("Username or password not correct");
    }
  } catch (e) {
    next(e);
  }
});



app.get("/secret",requireLogin, (req,res)=>{
    res.render("secret");
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
