// window object
// addEventListener(eventtype, callback)
window.addEventListener("click", e => {
    d = document.querySelector("h1");
    console.log(d);
})

// target 就 找 click evnet 的 目標
// 下面的例子 target 就是 h1
let h1 = document.querySelector("h1");
h1.addEventListener("click", e =>{
    e.target.innerText = "OPPO!";
    console.log(typeof e.target);
    console.log(e.target.parentElement);
    console.log(e.target.innerText);
    
})

// preevent default
// form 裡的 sumbit 預設惠重置網頁，這邊可變免重置
let button = document.querySelector("button");
button.addEventListener("click", e =>{
    e.preventDefault();
})