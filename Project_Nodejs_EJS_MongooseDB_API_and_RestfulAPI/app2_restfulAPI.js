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

// RestfulAPI///////////////////////////////////////////////////////////////////
// 利用postman 查看

app.get("/getStudents", async (req, res) => {
  try {
    let data = await Student.find();
    res.send(data);
  } catch {
    res.send({ message: "Error with find data." });
  }
});

//

app.get("/getStudents/:id", async (req, res) => {
  let { id } = req.params;
  // res.send("hello");
  try {
    let data = await Student.findOne({ id });
    // findOne 有找到就有找到，找不到的話，他就只會回傳你一個Null的東西

    if (data !== null) {
      res.send({ data });
    } else {
      // Error handling 找不到的話，傳一個錯誤訊息
      res.status(404);
      res.send({
        message: "Cannot find this student. Please enter a valid id",
      });
    }
  } catch (e) {
    res.send("Error!");
    console.log(e);
  }
});

app.post("/getStudents", (req, res) => {
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
      res.send({ message: "Student accept a new. " });
      // 給使用者展示另一個頁面
    })
    .catch((e) => {
      // 給使用者展示另一個頁面
      res.send(e);
    });
});

app.put("/getStudents/edit/:id", async (req, res) => {
  //findOneAndUpdate() 會回傳Query
  let { id, name, age, merit, other } = req.body;
  try {
    let d = await Student.findOneAndUpdate(
      { id },
      { id, name, age, scholarship: { merit, other } }, // id, name, age, merit, other = id, name, age, merit, other
      { new: true, runValidators: true } // runValidators 套用規則
    );
    res.send("thanks for sending put request.");
  } catch (e) {
    res.status(404);
    // res.send("Error with updating.");
    res.send(e);
  }
});


// 利用這個創建一個新的只有部分的data For patch requst

class newData{
  constructor(){}
  setProperty(key,value){
    if(key !== 'merit' && key !== "other"){
      this[key] = value;
    }else{
      this[`scholarship.${key}`] = value
    }
  }
}

app.patch("/getStudents/edit/:id", async (req, res)=>{
  let { id } = req.params;
  let newObject = new newData();
  // 依據得到的reqbody 修改成想要的樣子
  for (let property in req.body){
    newObject.setProperty(property, req.body[property]);
  }
  console.log(newObject);
  try {
    let d = await Student.findOneAndUpdate(
      { id },
      newObject, // 要修改的的地方
      { new: true, runValidators: true } // runValidators 套用規則
    );
    console.log(d);
    res.send("thanks for sending put request.");
  } catch (e) {
    res.status(404);
    // res.send("Error with updating.");
    res.send(e);
  }
});



app.delete("/student/delete/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let d = await Student.findOneAndDelete({ id });
    res.send("thanks for sending delete request.");
  } catch {
    res.render("Delete fail");
  }
});

/// 正常的API 都繪禁止這個行為
app.delete("/getStudents/delete/", async (req, res) => {
  let { id } = req.params;
  try {
    let d = await Student.deleteMany({});
    res.send("Delete  ALL  successfully.");
  } catch {
    res.render("Delete fail");
  }
});




app.get("/*", (req, res) => {
  res.status(404);
  res.send("Not allowed.");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
