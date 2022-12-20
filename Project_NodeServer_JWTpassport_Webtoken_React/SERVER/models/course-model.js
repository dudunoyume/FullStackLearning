import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    id :{type:String},
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required:true,
    },

    instructor:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    // 學生註冊資訊
    students :{
        type:[String],
        default:[],
    }
})



export default mongoose.model("Course",courseSchema);