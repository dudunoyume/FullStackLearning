let nodejs = require("./greeting");

console.log(nodejs);
//path
let path  = require("path");
console.log(path.join(__dirname, "try.js"));

console.log(path.extname(__filename));

console.log(path.basename(__filename));


// 用 const 去裝會比較好
//URL
const url = require("url");

let pandaURL = "http://localhost:81/"

const parsedURL = url.parse(pandaURL, true);

console.log(parsedURL);

//fs = file system

const fs = require("fs");

fs.writeFile("try.txt", "Today is a goood day.", e =>{
    if (e) throw e;

    console.log("File has been written.");

})

fs.readFile("./try.txt", "utf-8", (e, data) => {
    if (e) throw e;
    console.log(data);
});