// console.log(), alert(), prompt()

// 在console 中顯示訊息
console.log("目前在學習JS")
console.log("之後想要學習swift")

// 跳出僅告視窗
alert("目前正在")

// 跳出詢問訊息
prompt("你成年了嗎")

// = let const var

let x = 5;             //宣告 >>> 宣告只能宣告一次
x = 6 ;                //asign 
console.log(x)
// x 是可以改變的-------------------

// constant 的意思
const y =6;                 //宣告 >>> 宣告只能宣告一次
y =7;                       //asign 無法執行
console.log(y)
// 會出現錯誤 const 不可改變x 值

// var 
// var 會造成寫程式的麻煩，現在程式以大多不用

// -----------數學運算子---------------------------------------------------------
// 數學運算子 + - * /
// remainder operator 餘數, 
17%2  // 餘數為1
//power 次方
2**2 // 2的2次方 
// ++   加 1
x++ // x+1
// -- 減 1
x-- // x-1
// +=                        語法糖 syntax 方便一點點 
x += 10 // x = x + 10


// String Concatenate
// 字串串接
let name = "HIHIHI"
let great = "NONONO"

//+
console.log(greating+ " " +name)
// 結果 HIHIH NONONO

//-
console.log(greating - " " -name)
// 結果  NaN Not a Number
//java script 不知道這是甚麼數字
console.log("HI" *5)
// 結果  NaN Not a Number
//java script 不知道這是甚麼數字
// 跟python 不一樣 python 會直接讓它重複五次


name1