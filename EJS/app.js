const express = require("express");
const app = express();
const ejs = require("ejs");

//middleware
//設定要讀取的資料夾
app.use(express.static("public"));

app.get("/" ,(req,res) => {
    //database => array of objects
    const lang = [
        {name: "Python", rating: "9.5", population: "9.7", trending: "superhot"},
        {name: "Java", rating: "8.5", population: "7.7", trending: "normal"},
        {name: "JS", rating: "9.0", population: "9.7", trending: "hot"},
        {name: "R", rating: "7.0", population: "8.7", trending: "superhot"},
        {name: "C++", rating: "8.5", population: "9.0", trending: "prettyhot"},
    ];
    
    // ejs 是用 res.render 輸出，後面可以帶上要輸出到前端的object，類似於asp.net 的 controler 輸出的 return 
    res.render("index.ejs", {lang});
    // res.send("This is homepage");
})

app.get("/response",(req,res) => {
    console.log(req.query);
    let {fullname,age} = req.query;
    res.render("response.ejs", {fullname, age})

})

app.get("/:name",(req,res) => {
    let {name}  = req.params;
    res.render("person.ejs", { name: name});
    //可以直接寫一個name ( pproperty的值，名字是一樣的話)就好
    // res.send("This is homepage");
})

app.listen(3000,() =>{
    console.log("Sever is running on port 3000.")
})