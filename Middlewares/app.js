const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.set("view engine", "ejs");

// middlewares
app.use(express.static("public"));

// 設定哪一個 頁面 可以使用這個 middleware
// 這便是設定只有在 student route 可以使用這個middleware
app.use("/student", (req, res, next) => {
  // console.log("I am the first middleware");
  // console.log(req.method); >>>會回應　你使用的頁面
  // res.send("Middleware page.");  >>> 會出現error 因為 每次只能 send 一次請求，不過可以透過這個讓客戶不用透過頁面就 send 出請求，會很實用

  next();
});

// 通常會在上面先定義middleware 再放入 route 裡
const studentMiddleware = (req, res, next) => {
  console.log("this is student middleware.");
  next();
};

function anotherMiddleware(req, res, next) {
  console.log("this is another middleware.");
  next();
}

mongoose
  .connect("mongodb://localhost:27017/test", {
    // useFindAndModify: false,
    // useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongodb.");
  })
  .catch((e) => {
    console.log(e);
  });

const monkeySchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
  },
});

const Monkey = mongoose.model("Monkey", monkeySchema);

// 一般的error 只需要下面有打 error handler 就好
// 但 async function 就必須有 next 才能接收到
app.get("/", async (req, res, next) => {
  try {
    let foundData = await Monkey.findOne({ name: "Benson K. " });
    res.send(foundData);
  } catch (e) {
    //  error handler 傳植方式一定要放入 next 裡
    next(e);
  }
});


// validator error has to be caught by .catch 
// 資料型態本身輸入的錯誤 只能由 .catch 抓到
app.get("/create", (req, res) => {
  try{
    let newMonkey = new Monkey({ name: "Benson K. " });
    newMonkey
      .save()
      .then(() => {
        res.send("Data has been saved.");
      })
      .catch((err) => {
        console.log(err);
      });

  }catch(e){
    next(e);
  }
});

// validator error has to be caught by .catch 
// 資料型態本身輸入的錯誤 只能由 .catch 抓到
app.get("/Update",async (req, res) => {
  try{
    await Monkey.findOneAndUpdate(
      {name : "DUDU"},
      { name : "CJ"},
      {new:true, runValidators: true},
      (err, doc)=>{
        if(err){
          res.send(err);
        }else{
          res.send(doc);
        }
      }
    )

  }catch(e){
    next(e);
  }
});

// 沒有sends 這個function >>> 會轉到 error handling 一般的程式碼
app.get("/student", (req, res) => {
  res.sends("Welcome to studentpage.");
});

// 可以在這裡放route 不過通常不會有人這麼做
app.get(
  "/student2",
  (req, res, next) => {
    console.log("This is student route.");
    next();
  },
  (req, res) => {
    res.send("This is student page.");
  }
);

// Middleware 通常以這種Function方式放入，且一次可以放入多個

app.get("/student3", studentMiddleware, anotherMiddleware, (req, res) => {
  res.send("This is student page.");
});

// Error handling 簡單的
app.get("/*", (req, res) => {
  res.status(404).send("404 Page not found.");
});

// Error handler

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something is broken. We will fix it soon.");
});

app.listen(3000, () => {
  console.log("Server running on port 3000.");
});
