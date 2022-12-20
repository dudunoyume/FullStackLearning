//constructor function
function Person(name, age, height, weight){
    this.name = name,
    this.age = age,
    this.height = height,
    this.weight = weight,
    this.sayHi = function(){
        console.log(this.name + "says hi.");
        
    }
}


let Wilson = new Person("Wilson", 25,179,75);
let DUDU = new Person("DUDU", 26,168,65);

// console.log(DUDU);
// console.log(Wilson);
DUDU.sayHi();

// 重複製造function 兩者不一樣
console.log(Wilson.sayHi() === DUDU.sayHi());

// inheritance
// prototype


function Person_p(name, age, height, weight){
    this.name = name,
    this.age = age,
    this.height = height,
    this.weight = weight
};

Person_p.prototype.sayHi = function(){
    console.log(this.name + "say hi.");
    
}


let Wilson_p = new Person_p("Wilson", 25,179,75);
let DUDU_p = new Person_p("DUDU", 26,168,65);

// prototype function 兩者不一樣
console.log(Wilson_p.sayHi() === DUDU_p.sayHi());


//bind, call, apply

let Alan = {
    name : 'Alan',
    age : 25
}

function getAge(country, height){
    console.log(this.age);
    console.log("I am from " + country)
    console.log("I am " + height + "cm")
};

//bind   把函數結合進去
let getAlanAge = getAge.bind(Alan);
getAlanAge("Tiwan","175");

// call  把函數結合進去 直接執行
getAge.call(Alan, "Tiwan", "168");

//apply

getAge.apply(Alan, ["Tiwan", "178"]);