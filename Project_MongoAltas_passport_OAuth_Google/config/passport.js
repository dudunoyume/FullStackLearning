import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import GoogleStrategy from "passport-google-oauth20";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import User from "../models/user-model.js";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";

/// 將 User ID 存進去cookies ， 儲存鄧入狀態
passport.serializeUser((user, done) => {
  // console.log("Serializing user now");
  // console.log(user);
  done(null, user._id);
});

//
passport.deserializeUser((_id, done) => {
  // console.log("Deserializing user now");
  User.findById({ _id }).then((user) => {
    // console.log("Found user.");
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      //  從 google oauth 的 頁面碼
      // https://console.cloud.google.com/welcome?project=quick-wall-364606&supportedpurview=project
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
      // google 登入完後的重新導向
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log(profile);

      // 察看她回傳的東西
      // console.log(profile);
      User.findOne({ googleID: profile.id }).then((foundUser) => {
        if (foundUser) {
          // console.log("User already exist");
          //verify callback
          done(null, foundUser);
        } else {
          new User({
            name: profile.displayName,
            googleID: profile.id,
            thumbnail: profile.photos[0].value,
            email: profile.emails[0].value,
          })
            .save()
            .then((newUser) => {
              // console.log("new User created.");
              //verify callback
              done(null, newUser);
            });
        }
      });
      //passport callback
    }
    //   function(accessToken, refreshToken, profile, cb) {
    //     User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //       return cb(err, user);
    //     });
    //   }
  )
);

passport.use(
  new LocalStrategy((username, password, done) => {
    // console.log(username, password);

    User.findOne({ email: username }).then(async (user)=>{
      if (!user){
        return done(null, false);
      }
      // 檢查密碼
      await bcrypt.compare(password, user.password, function(err,result){
        if(err){
          return done(null, false);
        }
        if(!result){
          return done(null, false);
        }else{
          return done(null, user);
        }
      })
    }).catch(err => {
      return done(null,false);
    });
  })
);
