// sync
// js is a single-thread programming language
// 由上而下的語言


function sayHello(){
    console.log("hello");
    console.log("How are you?");
}


console.log("start");

// 這個函數是一個async code 他不會照著個這個順序執行
setTimeout(() => {
    console.log("Here is the code.");
}, 2000);
// 其他的函數還有 addEventListener 等等的
// Java 遇到這些 async 函數時 會先丟給 web API 去處理，然後繼續完成後續程式碼，web api 處理完之後再把他丟回 Javascript

console.log("end");