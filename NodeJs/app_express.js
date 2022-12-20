const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

//serveing a static file，要在這邊設定文件夾目錄 才有辦法被伺服器的讀到
//例如：　ＣＳＳ
//middleware
//指定靜態的文件夾
app.use(express.static("public"));

//middleware (收到任何requset 都會跑一遍 FOR POST)
app.use(bodyParser.urlencoded({extended: true}));

//request handling request responds (都是非常巨大的OBJECT) 
//首頁
//res.send 只能送一次
app.get("/", (req, res) =>{
// res.send("You are on the homepage.");
    res.sendFile(__dirname +"/index.html");
    //有 上面 require path 的話
    // res.sendFile(path.join(__dirname,"index.html"));
    // 一次把整的檔案送出去
});

// 其他頁面
app.get("/wilson", (req,res) =>{
    // let Wilson = {
    //     name: "Wilson Ren",
    //     age: 25,
    // };
    // res.send(Wilson);
    res.status(302);
    res.sendFile(path.join(__dirname, "move.html"))

})

//
app.get("/dudu", (req,res) =>{
    res.send("This is dudu's page.")
})

//routing for pattern
app.get("/fruit/:someFirut", (req,res) =>{
    // console.log(req.params);
    // res.send(" You are Looking for fruit." + req.params.someFirut);

    let {someFirut} = req.params; // destructing am object
    console.log(someFirut);  
    res.send(" You are Looking for fruit." + req.params.someFirut);
})

//routing for query
// 用 post 取得 from 傳回的東西
app.post("/formHandling",(req,res)=>{
    console.log(req.body);
    // 放進資料庫
    let {fullname, age} = req.body; // destructing am object

    res.send(`Thanks for posting. Your name is ${fullname}, and your age is ${age}`);

})

// 用 GET 取得 from 傳回的東西 不需要body那些東西
app.get("/formHandlingtwo",(req,res)=>{
    console.log(req.query);

    let {fullname, age} = req.query; // destructing am object

    res.send(`Thanks for posting. Your name is ${fullname}, and your age is ${age}`);

})


// routing for all
//輸入錯其他的東西時必，指向一個頁面
//這這邊設定404 Not found
app.get("*",  (req,res)=>{
    // res.status(404);
    // console.log(res.statusCode);
    // res.send("This is Wrong Page.");
    res.sendFile(path.join(__dirname, "error.html"))

})

app.listen(3000, () => {
    console.log("Server is running on port 3000.")
})
