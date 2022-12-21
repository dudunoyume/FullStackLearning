import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        minLength:2,
        maxLength:255,
    },
    googleID:{
        type: String,

    },
    date:{
        type:Date,
        default:Date.now,
    },
    // 這個是從google 取得的頭像 不過他是網址
    thumbnail:{
        type: String,
    },

    // Local login
    email:{
        type: String,
    },
    password:{
        type: String,
        maxLength:1024,
    },
});

export default mongoose.model("User", userSchema);


