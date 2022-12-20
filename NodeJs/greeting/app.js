// let myName = "Wilson";
// let sayHi = () =>{
//     console.log("Hello" + myName);
// }

// sayHi()


// console.log(__filename,__dirname);

//Node.js module

let try1 = require("./try1");

let myName = "Wilson";

try1.morning(myName);

let try2 = require("./try2");

try2.night(myName);

let sayHI = require("./try1.js");
try1.sayHi(myName);