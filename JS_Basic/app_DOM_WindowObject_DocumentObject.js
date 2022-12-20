function sayhi(){
    console.log("HI");
}

let myInterval = setInterval(sayhi, 1500);

//clearInterval

function stop(){
    clearInterval(myInterval);
}


let Liz = {
    name: "Liz Wang",
    talk(){
        console.log("Wilson is my husband")
    }
}


let Wilson = {
    name: "Wilson Ben",
    spouse: Liz,
    walk(){
        console.log("I am walking on the street")
    }
}

//window.console.log()
console.log(Wilson.spouse);


//getElementByid() getElementByClassName()
let myh1 = document.getElementById("first") ;
console.log(myh1);

let myP = document.getElementsByClassName("Second") ;
console.log(myP);

//只會 return 第一個滿足css selector的 html element
let myselecth1 = document.querySelector("h1.Second") ;
console.log(myselecth1);

//會 return 所有滿足css selector的 html element
let myselect2 = document.querySelectorAll(".Second") ;
console.log(myselect2);
console.log(myselect2[2]);
//NodeList is not array



//function declaration hoisting
function sayHI(){
    console.log("HI");
}

//arrow function expression syntax
let sayHi = (name) =>{
    console.log("HI"+name)
}

sayHi("wilson");

//this keyword

let WRY = {
    name:"Wilson Ren",

    greeting(){
        //greeting 是 function declaration hoisting
        console.log("HI, my name is" + this.name + ".");

    },
    walk:() =>{
        console.log(this.name + "Walking");
    }
}

WRY.greeting();
WRY.walk();

//foreach
let luckyNumbers = [7,15,23,66,91,10,13]

luckyNumbers.forEach(function checkNumber(n){
    if(n>20){
        console.log(n)
    }
});



function checkNumber2(n){
    if(n>20){
        console.log(n)
    }
};


luckyNumbers.forEach(checkNumber2);


luckyNumbers.forEach(function(n){
    if(n>20){
        console.log(n)
    }
});


luckyNumbers.forEach(n=>{
    if(n>20){
        console.log(n)
    }
});


luckyNumbers.forEach((n,index,arr)=>{
    if(n>20){
        console.log(n);
        console.log(n + " is at index number " + index);// 輸出目錄
        console.log(arr);//輸出Array
    }
});


// anonymous function is a type of function declaration
//arrow function express



//array

let lucky = [15,2,333,23];
//length, index
//push,pop,shift,unshift

//HTML Collection
let myTT = document.getElementsByClassName("Second") ;
console.log(myTT);
//他會回傳的東西
// 會很類似array，但她不是，會回傳所有claee name 是 Second

//Nodelist
let secondQuery = document.querySelectorAll(".second");
secondQuery.forEach(tag =>{
    console.log(tag);
})


/** HTML Collection,Nodelist
 * 兩者都有 length property
 * 兩者都有 index
 **/

