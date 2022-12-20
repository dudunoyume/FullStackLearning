// let const var

//initializar
// const x = 10;
// let y ;
// var z ;
// console.log(x);
// console.log(y);
// console.log(z);

//re-declaration
// const x = 10; //不行
// let y = 10; //不行
// var z = 10;

//re-assignment
// x =20; //不行
// y =20;
// z =20;

// Hoisting
// 第一步驟把記憶體分給 funcion declaration, var
// 先存起 x 是一個 var 但他的值得修改先沒有修改
// console.log(x);

//undifined
// var x = 10;

// console.log(x);
//10

//先找到下方定義的sayHI function存進 記憶體這個時候在叫出來

// sayHI();


// function sayHI(){
//     console.log("HI");
// }


// let, const

// console.log(x);
// let x = 10;

// 不能在後面才declare x
//function expression

// sayhi();

// const sayhi = () =>{
//     console.log("Hi");
// }


// 1. global scope 在最外層 var, let, const, function 
let myName = "Wilson Ren";


function sayHI(){
// 2. function scope在 function 裡面的 var, let, const, function，其他地方就沒有意義
    let myName = "Obama";
    console.log(myName + "says good morning.");

    function sayHi2() {
        console.log(myName + "says good morning again");
    }
    sayHi2();

}
sayHI();


// 3. block scope (let const function)
// it can only be seen inside a loop or a if statement

if(true){
    let x = 10;
    console.log(x);
}
// console.log(x);