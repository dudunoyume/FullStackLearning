const express =  require("express");
const app  = express();
const ejs = require("ejs");
const mongoose = require("mongoose");

// connect to mongoDB
//then : 前面的操作成功就執行
//catch : 前面的操作失敗就執行
mongoose.connect("mongodb://localhost:27017/exampleDB",{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(()=>{
        console.log("connect to MongoDB.");
    }).catch((err) =>{
        console.log( "connect to Failed.");
        console.log(err);   
    });

// define a schema
// const studentSchema = new mongoose.Schema({
//     name : String,
//     age: Number,
//     major: String,
//     scholarship:{
//         merit: Number,
//         other:Number,
//     }
// })


//-------------------------------------------------------------------------Vliadates
//---- 用來多設定 Schema 的屬性(method)，儲存會需要符合要求
const studentSchema = new mongoose.Schema({
    // 設定 需要填入
    name : {
        type: String,
        // 設定長度, 超出長度就 顯示name is too long
        maxlength:[15, "name is too long"],
        required:true,
    },

    // 設定 沒有填入的話 會顯示的messenager
    age: {
        type: Number,
        required:[true, "YOU Forgot to setting name"]
    },
    // 設定 條件，較為動態的設定，這裡是要求 age 大於18時 就需要
    major:  {
        type: String,
        // 只能使用這五個項目，枚舉列舉
        enum:["Chem", "Electrical Engineering","Computer Science","Law", "undecied"],
        required: [() => {
            return this.age >  18;
        },]
    },

    scholarship:{
        merit:{
        type: Number,
        default:0,
        max:50000,
        min:[0,"Are you trying to enter to nagetive value?"]
    },

        other:{
            type: Number,
            default:0,
        },
    }
})

//---------------------------------------------- create an instance method
//----------------------------------------------- 設定studentSchema 裡面一個新的 method ，totalScholarship 會等於 scholarship.merit + scholarship.other
//--------------------------- 這裡不是使用 arrow function expression，而是使用 function  declaration， 因為使用 arrow 的話 他的 this 就會是代表 windows的全域變數 會找不到merit 
studentSchema.methods.totalScholarship = function () {
    return this.scholarship.merit + this.scholarship.other;
}

studentSchema.methods.addAge = function (){
    this.age ++;
    this.save();
}


// ---------------------------------------------- create a static method
studentSchema.statics.setOtherToZero = function(){
    return this.updateMany({},{"scholarship.other": 1500});
};


// --------------------------------------------------------create a model for students
const Student = mongoose.model("Student", studentSchema);


Student.setOtherToZero().then((meg) =>{
    console.log(meg);
}).catch((e)=>{
    console.log(e);
});
// Student.find({"scholarship.merit": {$gte: 1500}}).then((data) => {
//     console.log(data);
// })

Student.find({}).then((data)=>{
    console.log(data);
}).catch((e)=>{
    console.log(e);
})


app.use(express.static("public"));

app.get("/", (req,res) => {
    res.render("index.ejs");
});

app.listen(3000,() => {
    console.log("Sever is running on port 3000.");
})