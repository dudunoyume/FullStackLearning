// 大括號宣告 物件Property
let Wilson = {
    first_name:"Wilson",
    last_name:"Ren",
    age:30,
    is_married:false,
    spouse:null
}

// 取得物件的 poperty
// [], dot notaion
console.log(Wilson.spouse);
console.log(Wilson["age"]);


//methods setting

let DUDU = {
    first_name:"DUDU",
    last_name:"IMIN",
    age:26,
    is_married:false,
    spouse:null,

    // methon 設定__________________________
    sayHI(){
        console.log("DUDU says hi.");
    },
    walk(){
        console.log("DUDU is walking on the street.");
    },
    sayAge(){
        console.log("Wilson says I am"+ this.age + "years old." );

    }

};



DUDU.sayHI();
DUDU.walk();

// 6 種 primtive data type
// 2 array, object

let friends = ["John","Josh","Mike"];
console.log(typeof friends); //一種特別的Object


//for loop

for(let i = 0;i <10; i++){
    console.log(i);
}

//loop through Array
for(let i = 0;i < friends.length; i++){
    console.log(friends[i].toUpperCase());
}

let j = 0;
while(j <=10){
    console.log(j)
    j++
}

for(let i = 0; i <= 15;i++){
    if(i == 5){
        continue
    }
    console.log(i)
    if(i >13){
        break
    }
}




