let body = document.querySelector("body");
console.log(body.children);// return HTMLCollection
console.log(body.childNodes);///return Nodelist


let MyP = document.querySelector("p.Second");
console.log(MyP.parentElement);

let h1 = document.querySelector("h1.myh1");
h1.innerHTML = "<mark>My name is DuDu</mark>";
h1.innerText = "<mark>AAAAAAAAAAAA</mark>";

let body1 = document.querySelector("body");

let myh1 = document.createElement("h1");
myh1.innerText= "Hi I am Wilson";

body1.appendChild(myh1);


/* classList */
let myP = document.querySelector("p");
console.log(myP.classList);
myP.classList.add("red");
myP.classList.add("blue");
myP.classList.add("bold");
console.log(myP.classList);
myP.classList.remove("blue");
myP.classList.remove("bold");
console.log(myP.classList);
//toggle 作用是 如果該tag有這個class 他就會刪掉，沒有這個class 他就會加上去
myP.classList.toggle("red");
myP.classList.toggle("blue");
// 檢查tag 是否存在 該class  ，回傳 boolean值
myP.classList.contains("bold")


let a = document.querySelector("a");
console.log(a.getAttribute("title"));

let red1 = document.querySelectorAll("p.red");
console.log("DOM 的 querySelector");
console.log(red1);

let section = document.querySelector("section");
let red2 = section.querySelectorAll("p.red");
console.log("Element Object 的 querySelector")
console.log(red2);


let h1dele = document.querySelector("body h1");
h1dele.remove();

let button = document.querySelector("body button");
// 例如 background-color >>> backgoundColor
button.style.backgroundColor = "black";
button.style.color = "red";
// 也可以使用這種不需要改變的
button.style = "font-size: 2rem; font-style: Italic";
//會取消所有的 styling
button.style  = "";