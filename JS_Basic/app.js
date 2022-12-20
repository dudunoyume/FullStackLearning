
let name = prompt("請輸入你的姓名");
alert("Hello, " + name + ", Welcome to this website. I hope you'll enjoy it.");

let name1 = "Wilson";
let age = 25;

console.log(name1 + age);
// string + number = concat


// index從零開始
console.log(name1[3] +  name1[1]);

//slice
//從零開始計算 跟 python for 裡的 ragnge 很像 一樣
console.log(name1.slice(1,3));

//indexof
// 找尋符合的字串的位置
console.log(name1.indexOf("s"));

//toLowerCase
console.log(name1.toLowerCase());
//toUpperCase
console.log(name1.toUpperCase());

let CCC = "I gonna get you down"
console.log(CCC.split(" "));


// Boolean
let o = true;
let oc = false;


//undefined
let  QQ;

console.log(QQ);
//未被定義

//null
let QC = null;
console.log(QC);