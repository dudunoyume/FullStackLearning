let friends1 = ["A","B","C"];
let friends2 =["D","E","F"];

//concat
let friends = friends1.concat(friends2);
console.log(friends);000

console.log(NaN == NaN);
console.log(NaN === NaN);
// 結果都是false
console.log(isNaN(NaN));
// 結果true



// rest parameter
console.log(Math.max(2,3,45,56,2,24,324,324,324,324,434,5,6,78));

function checkBiggest(arr){
    let biggest = -Infinity;
    for(let i = 0; i<arr.length; i ++){
        if(arr[i] > biggest){
            biggest = arr[i];
        }
    }
    return biggest;
}

console.log(checkBiggest([-2,6,3,1,17,100,65]));

// spread operator
function checkBiggest2(...numbers){
    let biggest = -Infinity;
    for(let i = 0; i<numbers.length; i ++){
        if(numbers[i] > biggest){
            biggest = numbers[i];
        }
    }
    return biggest;
}


console.log(checkBiggest2(-2,6,3,1,17,100,65));

// spread operator 也可以用來 連接 Array
let friends_2 = [...friends1,...friends2];
console.log(friends_2);


//Primitive Data Types
let num1 = 100;
let num2 = num1;

num1 = 50;
//num2 不會隨 num1 改變
console.log(num1,num2);

//reference data type
// ["Mike","Josh"] 存在 第1號記憶體位置
let A1 = ["Mike","Josh"];
// 例如 A1 指向 第1號記憶體位置
let A2 = A1;
// 例如 A2 指向也 第1號記憶體位置

//修改 第1號記憶體位置 的值
A1.push("WILY");
A2.push("Allen");

//A2 會隨 A1 改變
console.log(A1,A2);


//都是 Sring 功能一樣，可以節省記憶體
let name = "IMin Chang";
console.log(name);
// 會在那一瞬間 變成 Object 再變回來
console.log(name.toLowerCase()); 


//Object語法，但會讓記憶體要分配的變多，不推薦
let name1 = new String("IMin Chang");
console.log(name1);

// string compersion
"A" > "B"
"B" > "A"
"Apple" > "Bnana"
"5" > "10"

console.log(typeof(friends1));
//object

console.log(Array.isArray(friends1));
//true

let languages = ["Java", "C++", "Python", "JS"];

let upperlanguage = languages.map(function(i){
    return i.toUpperCase();
    // 一定要 return
})

console.log(upperlanguage);

const lang = [
    {name: "Python", rating: "9.5", population: "9.7", trending: "superhot"},
    {name: "Java", rating: "8.5", population: "7.7", trending: "normal"},
    {name: "JS", rating: "9.0", population: "9.7", trending: "hot"},
    {name: "R", rating: "7.0", population: "8.7", trending: "superhot"},
    {name: "C++", rating: "8.5", population: "9.0", trending: "prettyhot"},
];

let newLanguages = lang.map(i =>{
    return i.trending.toUpperCase();
});

console.log(newLanguages);

let newLanguages_find = lang.find(i =>{
    return i.rating >8.5;
});

console.log(newLanguages_find );

let newLanguages_filter = lang.filter(i =>{
    return i.rating >8.5;
});
 console.log(newLanguages_filter);


 let newLanguages_some = lang.some(i =>{
    return i.rating >8.5;
});
 console.log(newLanguages_some);

 let newLanguages_every = lang.every(i =>{
    return i.rating >8.5;
});
 console.log(newLanguages_every);


let fruits = ["Grapes", "Apple", "Bananas"];

fruits.sort();
console.log(fruits);
fruits.sort((a,b)=>{
    return b.length - a.length;
})
console.log(fruits);

let luckies = [15,1,2,13,11,99,4];
luckies.sort((a,b) =>{
    return a - b;
})

console.log(luckies);


//for of loop~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

let numberssss = [10,12,13];

// for loop
for (let i =0; i< numberssss.length; i++){
    console.log(numberssss[i]);
}

// foreach

numberssss.forEach(n=>{
    console.log(n);
})


//for of loop

for(let n of numberssss){
    console.log(n);
}


let DUDU = {
    name : 'DUDU CHANG',
    age : 25,
    gender :"male",
}

for(let i in DUDU){
    console.log(i);
}
//name age

for(let i in DUDU){
    console.log(DUDU[i]);
}
//'DUDU CHANG' 25 "male"

for(let i in numberssss){
    console.log(i);
}
//0,1,2
for(let i in numberssss){
    console.log(numberssss[i]);
}
//10,12,13