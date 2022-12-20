console.log(4 != 3); //values are differnet 值
console.log(4 !== 3);//values are differnet type 類型
console.log(4 == 3);


// AND &&   OR ||
let OO = true;
let OA = false;

console.log(OO && OA);
console.log(OO || OA);

let thereIsInternet = true;

if(thereIsInternet){
    console.log("yeahyeahyeah");
}else{
    console.log("NoNoNO");
}

//0-12 兒童票 100元
//12-65 成人票 250元
//65- 敬老票


let age = prompt("請輸入你的年齡:");
age = Number(age);
console.log(typeof(age));

// 必需使用 isNaN(age) 不能用  age == NaN age === NaN 因為 NaN 不是值

if(isNaN(age)){
    alert("請輸入數字");
}else if (age > 12 && age <=65){
    alert("你的成人票一張250元");
}else if(age > 65 && age <=110){
    alert("您的敬老票是1000000元");
}else if(age <= 12){
    alert("你的兒童票一張100元");
}else{
    alert("請輸入正確年齡");
}




//Camocase

//underline

//const with uppercase

let friends = ["Jhon", "Sandy", "Alex", "Jim"];

console.log(friends.length);
// 尾巴 加 1
friends.push("G8JIN");
console.log(friends);
//尾巴 減 1
friends.pop();
console.log(friends);
//頭加 1
friends.unshift("G8JIN");
console.log(friends);

//頭減 1
friends.shift();
console.log(friends);


// function declaration
function sayhi(name,age){
    console.log("HI");
    console.log("My name is"+ name)
    console.log("I am "+ name + " and I am "+age)
}

//invoke execute a function
sayhi("YOUR MOTHER",88);

//Celsius to Fahrenhit
function convert(oc){
    let of = oc *1.8 +32;
    console.log(of);
    return of
}

convert(10000)

let input = prompt("請輸入度C");
let result = convert(input);
alert(input +"換算後的溫度是" + result + "oF");