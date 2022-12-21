import passport from "passport";
import express from "express";
const router = express.Router();
import Post from "../models/post-model.js";

const authCheck = (req, res, next) => {
  // 經過diserializung 得到了 req.user req.isAuthenticated 的 method
  if (!req.isAuthenticated()) {
    // req.oringinalUrl  記住鄧入前想去的地方
    req.session.returnTo = req.originalUrl;
    res.redirect("/auth/login");
  } else {
    next();
  }
};

router.get("/", authCheck, async (req, res) => {
  let postFound = await Post.find({ author: req.user._id });
  res.render("profile", { user: req.user, posts: postFound });
});

router.get("/post", authCheck, (req, res) => {
  res.render("post", { user: req.user });
});

router.post("/post", authCheck, async (req, res) => {
  let { title, content } = req.body;
  let newPost = new Post({ title, content, author: req.user._id });
  try {
    await newPost.save();
    res.status(200).redirect("/profile");
  } catch (err) {
    req.flash("error_msg", "Both title and content are required.");
    res.redirect("/profile/post");
  }
});

// router.get("/", (req, res) => {
//     res.render("profile", {user: req.user });
//   });

export default router;
