import express from "express";
const router = express.Router();
import {courseModel as Course} from "../models/index.js";
import Validation from "../validation.js"
const cousreValidation = Validation.cousreValidation;

router.use((req, res , next) => {
    console.log("A request is coming into api....");
    // console.log(req.user);
    next();
});


// 利用populate 連結下方已儲存的ID並且顯示出username還有email

router.get("/",(req,res) => {
    Course.find({})
    .populate("instructor", ["username","email"])
    .then((course) =>{
        res.send(course);
    })
    .catch(()=> {
        res.status(500).send("Error!! Cannot get course!!");
    })
})


router.get("/:_id", (req,res) =>{
    let { _id } = req.params;
    Course.findOne( { _id } )
    .populate("instructor", ["email"])
    .then((course) =>{
        res.send(course);
    }).catch((e) =>{
        res.send(e);
    })
})

router.post("/", async (req,res) =>{
    //validate the inputs before making a new course
   
    const {error} = cousreValidation(req.body);
    if(error) return res.status(400).send(error.details[0].meeasge);
     

    let {title, description, price} = req.body;
    //驗證是否為講師
    if(req.user.isStudent()){
        return res.status(400).send("Only instructor can post a new course.");
    }

    let newCourse = new Course({
        title,
        description,
        price,
        instructor: req.user._id
    });

    try{
        await newCourse.save();
        res.status(200).send("New course has been saved.");
    }catch (err){
        res.status(400).send("Cannot save course.");
    }
})



// 修改 Restful API
router.patch("/:_id", async (req,res) =>{
        //validate the inputs before making a new course
   
        const {error} = cousreValidation(req.body);
        if(error) return res.status(400).send(error.details[0].meeasge);
        
        let {_id} = req.params;
        let course = await Course.findOne({ _id });
        if(!course){
            res.status(404);
            return res.json({
                succces: false,
                message: "Course not found.",
            })
        }
//限定課程管理者，以及網站管理員
        if (course.instructor.equals(req.user._id) || req.user.isAdmin()){
            Course.findOneAndUpdate({ _id }, req.body, {
                new :true,
                runValidations : true,
            })
            .then(() => {
                res.send("Course updated.")
            })
            .catch((e) =>{
                res.send({
                    success :false,
                    message:e,
                })
            })
        }else {
            res.status(403);
            return res.json({
                success : false,
                message: "Only the instructor of this course can edit"
            })
        }


})

router.delete("/:_id", async (req,res) =>{
    let {_id} = req.params;
    let course = await Course.findOne({ _id });
    
    if(!course){
        res.status(404);
        return res.json({
            succces: false,
            message: "Course not found.",
        })
    }
//限定課程管理者，以及網站管理員
    if (course.instructor.equals(req.user._id) || req.user.isAdmin()){
        Course.deleteOne({ _id })
        .then(() => {
            res.send("Course deleted.")
        })
        .catch((e) =>{
            res.send({
                success :false,
                message:e,
            })
        })
    }else {
        res.status(403);
        return res.json({
            success : false,
            message: "Only the instructor of this course can delete"
        })
    }


})





export default router;