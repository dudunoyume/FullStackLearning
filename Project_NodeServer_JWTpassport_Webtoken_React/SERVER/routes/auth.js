import express from "express";
const router = express.Router();
import Validation from "../validation.js"
const registerValidation = Validation.registerValidation;
const loginValidation  = Validation.loginValidation;
import {userModel as User} from "../models/index.js";
import jwt from "jsonwebtoken";



router.use((req,res,next) =>{
    console.log("A request is coming in to auth.js");
    next();
});

router.get("/testAPI", (req,res)=>{
    const msgObj = {
        message: "Test API is working.",
    };
    return res.json(msgObj);
});


router.post("/register", async (req,res) => {
    console.log("Register!!");

   //check the validation of data 
    const { error } = registerValidation(req.body);
    // console.log(error.details);
    if (error) return res.status(400).send(error.details[0].message)

    //check if hte user exists
    const emailExist = await User.findOne({email :req.body.email});
    if (emailExist)
    return res.status(400).send("Email has already been registered")

    // register the user

    const newUser = new User({
        email: req.body.email,
        username:req.body.username,
        password: req.body.password,
        role:req.body.role,
    });
    try{
        const savedUser = await newUser.save();
        res.status(200).send({
            msg : "success",
            savedObject: savedUser,
        });
    }catch (err){
        res.status(400).send("User not saved.");
    }
})


router.post("/login",(req,res)=>{
    //check the validation of data
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    //找 user 找 email
    User.findOne({email: req.body.email}, function(err, user){
        if (err){
            res.status(400).send(err);
        }
        if (!user){
            res.status(401).send("User not found");
        }else{
            user.comparePassword(req.body.password, function(err,isMatch){
                if(err) return res.status(400).send(err);
                if(isMatch){
                    const tokenObject = {_id : user._id, email: user.email};
                    const token = jwt.sign(tokenObject, process.env.PASSPORT_SECERT);
                    res.send({success:true, token:"JWT " + token, user});
                }else{
                    res.send(401).send("Wrong passward.")
                }
            })
        }
    })

})

export default router;