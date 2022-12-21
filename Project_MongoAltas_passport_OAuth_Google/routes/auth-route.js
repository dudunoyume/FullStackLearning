import passport from "passport";
import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import User from "../models/user-model.js";

router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

router.get("/logout", (req, res) => {
  req.logOut(); // passport 給的fucntion
  res.redirect("/");
});

// passport 的 google 登入
router.get(
  "/google",
  passport.authenticate("google", {
    // 從google獲得使用者的個人資訊
    // 要有 email 的才會回傳 "email"
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get("/google/redirect", passport.authenticate("google"), (req,res)=>{
    // res.redirect("/profile");
    // 指定登入後要去的地方 profile 裡的檢查值
    if(req.session.returnTo){
      let newPath = req.session.returnTo;
      req.session.returnTo = "";
      res.redirect(newPath);
    }else{
      res.redirect("/profile")
    }
  }
);

// google 的 callback
//上面的簡寫版
// router.get(
//   "/google/redirect",
//   passport.authenticate("google", {
//     successRedirect: "/profile",
//     failureRedirect: "/login",
//   }),
// );

// 不使用 google 的登入
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: "Wrong email or password",
  }),
  (req, res) =>{
    // res.redirect("/profile");
    // 指定登入後要去的地方 profile 裡的檢查值
    if(req.session.returnTo){
      let newPath = req.session.returnTo;
      req.session.returnTo = "";
      res.redirect(newPath); 
    }else{
      res.redirect("/profile")
    }
  }
);

// 不使用google的註冊頁面

router.get("/signup", (req, res) => {
  res.render("signup", { user: req.user });
});


// 不使用google的註冊 POST
router.post("/signup", async (req, res) => {
  // 確認收的到
  // console.log( req.body);
  let { name, email, password } = req.body;
  // 檢查是否已有這個eamil
  const emailExist = await User.findOne({ email });
  // if (emailExist) return res.status(400).send("Email already exist.");
  if (emailExist) {
    req.flash("error_msg", "Eamil has already been registered.");
    return res.redirect("/auth/signup");
  }

  //密碼加密
  const hash = await bcrypt.hash(password, 10);
  password = hash;
  let newUser = new User({ name, email, password });
  try {
    await newUser.save();
    // const savedUser = await newUser.save();
    // res.status(200).send({
    //   msg : "User saved.",
    //   savedObj: savedUser,
    // });
    req.flash("success_msg", "Registration succeed. You can login now.");
    res.redirect("/auth/login");
  } catch (err) {
    // 輸日格是錯誤的話，提取的他的錯誤的訊息
    // req.flash("error_msg", err);
    // res.redirect("/auth/signup");
    req.flash("error_msg", err.errors.name.properties.message);
    res.redirect("/auth/signup");    
  }
});

export default router;
