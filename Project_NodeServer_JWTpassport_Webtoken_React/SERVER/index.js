import express from "express";
const app = express();
import mongoose from "mongoose";
// import ejs from "ejs";
// import bodyParser from "body-parser";
// import methodOverride from "method-override";
import dotenv from "dotenv";
dotenv.config();
import {auth as authRoute, course as courseRoute} from "./routes/index.js";
import passport from "passport";
import passportFunction from "./config/passport.js";
passportFunction(passport);
import cors from "cors";

mongoose
  .connect(process.env.DBConnect, {
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


  //middlewares


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use("/api/user", authRoute);
app.use("/api/courses", passport.authenticate("jwt", {session: false}), courseRoute);

app.listen(8080,()=>{
  console.log("Server running on port 8080");
    
})