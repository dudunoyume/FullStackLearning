// let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${mykey}`;
import express from "express";
const app = express();
import ejs from "ejs";
//get request by Https
import https from "https";
//get request by nodefetch
import fetch from "node-fetch";
import nodemon from "nodemon";

// api key
const mykey = "e741d10c34e0fdd3f4b0a66db8749a76";

app.use(express.static("public"));
app.set("view engine", "ejs");

// 首頁
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// 取得 主頁網址後綴， 寫的東西會變成 city 的值
// fetch 並不存在 node.js 裡面所以這邊會出錯
// app.get("/:city",(req,res)=>{
//     console.log(req.params);
//     let {city} = req.params;
//     let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${mykey}`;
//     let d = await fetch(url);
//     let dj = await d.json();
//     console.log(dj);
//     res.render("weather.ejs");
// })
function KtoC(k) {
  return k - 273.15;
}

// ----------------------------------------------------------------------------get request by Https
// app.get("/:city", (req, res) => {
//   console.log(req.params);
//   let { city } = req.params;
//   let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${mykey}`;
//   // nodejs 上一種接收API的方法
//   https
//     .get(url, (response) => {
//       console.log("statusCode:", response.statusCode);
//       console.log("headers:", response.headers);

//       response.on("data", (d) => {
//         let djs = JSON.parse(d); //把API 的基礎格式轉為JSON object
//         console.log(djs);
//         let { temp } = djs.main; // 取出 main 裡面的 temp
//         let newtemp = KtoC(temp);
//         res.render("httpGet.ejs", { djs, newtemp }); //傳送給wether
//       });
//     })
//     .on("error", (e) => {
//       console.log(e);
//     });
// });

// get request by nodefetch-------------------------------------------------------------------------------------
// app.get("/:city", (req, res) => {
//   console.log(req.params);
//   let { city } = req.params;
//   console.log(city);
//   let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${mykey}`;
//   // nodejs 上一種接收API的方法

//   fetch(url)
//     .then((d) => d.json())
//     .then((djs) => {
//       let { temp } = djs.main; // 取出 main 裡面的 temp
//       let newtemp = KtoC(temp);
//       res.render("nodeFetch.ejs", {djs, newtemp });
//     });
// });

// get request by nodefetch ----------------------------await-------------------------------------------------------------------------------------
app.get("/:city", async (req, res) => {
  console.log(req.params);
  let { city } = req.params;
  //直接取出 req.params 中  city 的值，作為變數 city的值
  console.log(city);
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${mykey}`;
  // nodejs 上一種接收API的方法

  let d = await fetch(url);
  let djs = await d.json();
  let { temp } = djs.main;
  let newtemp = KtoC(temp);
  res.render("nodeFetch.ejs", { djs, newtemp });
});



app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
