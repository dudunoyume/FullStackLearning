let a = document.querySelector("div.a");
let b = document.querySelector("div.b");


a.addEventListener("click", ()=>{
    alert("a's event listen's callback is running.")
})

b.addEventListener("click", e=>{
    e.stopPropagation();
    alert("b's event listen's callback is running.")
})