import express from "express";
const app = express();
import ejs from "ejs";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import methodOverride from "method-override";
// 載入Student model
import Student from "./models/student.js";

// 用來將 put  request 用在 html form 上面(只能用 Get Post)

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
// mongoose.set('useFindAndModify', false);//不想看到修改的Warning

mongoose
  .connect("mongodb://localhost:27017/studentDB", {
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

app.get("/", (req, res) => {
  res.send("This is homepage.");
});

// app.get("/student", async (req, res) => {
//   let data = await Student.find();
//   res.render("student.ejs", { data });
// });

// 加入 error handling
app.get("/student", async (req, res) => {
  try {
    let data = await Student.find();
    res.render("student.ejs", { data });
  } catch {
    res.send("Error with finding data");
  }
});

app.get("/student/insert", (req, res) => {
  res.render("studentInsert.ejs");
});

app.get("/student/:id", async (req, res) => {
  let { id } = req.params;
  // res.send("hello");
  try {
    let data = await Student.findOne({ id });
    // findOne 有找到就有找到，找不到的話，他就只會回傳你一個Null的東西

    if (data !== null) {
      res.render("studentPage.ejs", { data });
    } else {
      // Error handling 找不到的話，傳一個錯誤訊息
      res.send("Cannot find this student. Please enter a valid id");
    }
  } catch (e) {
    res.send("Error!");
    console.log(e);
  }
});

app.post("/student/insert", (req, res) => {
  // 了解傳回來的東西
  //   console.log(req.body);
  //req.body 會回傳前面傳回來的東西

  // 測試功能正常
  // res.send("thank for posting.");

  let { id, name, age, merit, other } = req.body;
  let newStudent = new Student({
    id,
    name,
    age,
    scholarship: { merit, other },
  });
  newStudent
    .save()
    .then(() => {
      console.log("Student accept");
      // 給使用者展示另一個頁面
      res.render("accept.ejs");
    })
    .catch((e) => {
      console.log("Student not accepted.");
      console.log(e);
      // 給使用者展示另一個頁面
      res.render("reject.ejs");
    });
});

app.get("/student/edit/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let data = await Student.findOne({ id });
    if (data !== null) {
      res.render("edit.ejs", { data });
    } else {
      res.send("Cannot Find Student");
    }
  } catch (e) {
    res.send("Error!");
    console.log(e);
  }
});

app.put("/student/edit/:id", async (req, res) => {
  //findOneAndUpdate() 會回傳Query
  // put request 必須update 一整個data
  console.log(req.body);
  let { id, name, age, merit, other } = req.body;
  try {
    let d = await Student.findOneAndUpdate(
      { id },
      { id, name, age, scholarship: { merit, other } }, // id, name, age, merit, other = id, name, age, merit, other
      { new: true, runValidators: true } // runValidators 套用規則
    );
    res.redirect(`/student/${id}`);
  } catch {
    res.render("reject.ejs");
  }
});

// POSTMAN 方法
// app.delete("/student/delete/:id", (req,res)=>{
//   let {id} = req.params;
//   Student.deleteOne({id}).then((meg)=>{
//     console.log(meg);
//     res.send("Deleted successfully. ");
//   }).catch((e) => {
//     console.log(e);
//     res.send("Delete failed");
//   })
// })

app.get("/student/delete/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let data = await Student.findOne({ id });
    if (data !== null) {
      res.render("delete.ejs", { data });
    } else {
      res.send("Cannot delete Student");
    }
  } catch (e) {
    res.send("Error!");
    console.log(e);
  }
});

app.delete("/student/delete/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let d = await Student.findOneAndDelete({ id });
    res.send("thanks for sending delete  request.");
  } catch {
    res.render("reject.ejs");
  }
});


// app.delete("/student/delete/:id", async (req, res) => {
//   let { id } = req.params;
//   Student.deleteOne({ id })
//   .then((meg) =>{
//     console.log(meg);
//     res.send("Deleted successfully.");
//   })
//   .catch((e)=>{
//     console.log(e);
//     res.send("Delete failed.");
//   });

// });





app.get("/*", (req, res) => {
  res.status(404);
  res.send("Not allowed.");
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
