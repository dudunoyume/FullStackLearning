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


// ---------------------------------------------- create a static method
studentSchema.statics.setOtherToZero = function(){
    return this.updateMany({},{"scholarship.other": 0});
};

// --------------------------------------------------------create a model for students
const Student = mongoose.model("Student", studentSchema);

// const newStudent = new Student({name: "Luke Willington" , age: 27, major: "Law",scholarship:{merit: "1500", other:"2000"},  isMarried: true,});

// newStudent.save().then(() =>{
//     console.log("Data has been saved");})
//     .catch((e) =>{
//         console.log("error has happened");
//         console.log(e);
//     });

//----------------------------------------------------------------------------insert
// ----------------------------create object

// const Jon = new Student({
//     name: "Jon Benson",
//     age:25,
//     major: "Electrical Engineering",
//     scholarship: {merit: 2500, other: 1300},
//     isMarried: false,
// });

// //save Jan to DB save 1 只存一個東西
// Jon.save().then(()=>{
//     console.log("Jon save to MongoDB.");
// }).catch((err) =>{
//     console.log( "save Failed.");
//     console.log(err);   
// });


//-----------------------------------------------------------------------------find
// find object find student 
// 會把找到的東西都包在 Array 裡
// $gte是運算子 greater than 的意思 還有其他的運算子喔

// Student.find({}).then((data) =>{
//     console.log(data);
// });
// Student.find({"scholarship.merit": {$gte: 1500}}).then((data) => {
//     console.log(data);
// })



// findOne 會回傳object 
// Student.findOne({name: "Jon Benson"}).then((data) =>{
//     console.log(data);
    
// });

//---------------------------------------------------------------------------update

// Student.updateOne({ name: "Jon Benson"}, {name: "Carl Benson"}).then(
//     (mag) => {
//         console.log(mag);
//     }
// );

// Student.updateMany({major:"EE"}, {major:"Electrical Engineering"}).then(meg =>{
//     console.log( meg);
    
// })

// 利用FindOneAndUpdate 直接顯示更改後的資訊
// new : true 直接顯示更改後的資訊

// Student.findOneAndUpdate({name: 'Wilson Wu'}, {name: 'Wilson Ren'}, {new: true}).then(meg =>{
//     console.log(meg);
    
// })


// Student.findOneAndUpdate(
//     {name: "Carl Benson"},
//     {"scholarship.merit":3500},
//     { new:true,runValidators: true}
// ).then((meg)=>{
//     console.log(meg);
// })
// .catch((e)=>{
//     console.log("Update failed.");
//     console.log(e);
// });


// 直接利用find 來進行update (需要結合 instance method， 利用 instance method 時必須加入 this.save())
// studentSchema.methods.addAge = function (){
//     this.age ++;
//     this.save();
// }

// Student.findOne({name : "DUDU"}).then(data =>{
//     data.addAge();
//     console.log(data);
// }).catch((e) =>{
//     console.log(e);
// });


//--------------------------------------------------------------------------------------delete 

// Student.deleteOne({"scholarship.merit": {$gte: 4000} }).then((meg) => {
//     console.log(meg);
// });


// Student.deleteMany({"name": undefined}).then((meg) => {
// 刪除所有沒有定義name的
//     console.log(meg);
// });

//FindOneDelete直接顯示更改後的資訊

// Student.findOneAndDelete({"scholarship.merit": {$gte: 2800} }).then((meg) => {
//     console.log(meg);
// });


///===========---------------------------------------------- create an instance method 的使用， instance method 是屬於 schema的
// 用 find 的話回傳的會是array 只有 Luke Willington 的數據，因此會回傳error

// Student.find({name:"Luke Willington"}).then(data => {
//     let result = data.totalScholarship();
//     console.log(result);
// }).catch(e => {
//     console.log("error !!!!!!!!");
//     console.log(e);
// })


// 應該使用 findone 才會是Object
// Student.findOne({name:"Luke Willington"}).then(data => {
//     let result = data.totalScholarship();
//     console.log(data);
//     console.log(result);
// }).catch(e => {
//     console.log("error !!!!!!!!");
//     console.log(e);
// })

// 將資料表用一個 列表的方式把它找出來
// Student.find({}).then(data => {
//     data.forEach(oneStudent =>{
//         console.log(
//             `${oneStudent.name} has total scholarship ${oneStudent.totalScholarship()}.`
//             );
//     });
// })

// ---------------------------------------------- create an static method 的使用， instance method 是屬於 model的
// 一次直接把所有的 scholarship.other 歸零
// Student.setOtherToZero().then((meg) =>{
//     console.log(meg);
// }).catch((e)=>{
//     console.log(e);
// });



app.use(express.static("public"));

app.get("/", (req,res) => {
    res.render("index.ejs");
});

app.listen(3000,() => {
    console.log("Sever is running on port 3000.");
})