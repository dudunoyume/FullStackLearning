// function getData(name) {
//     setTimeout(()=>{
//         return {name : name, age:Math.random() * 20, major:"CS"};
//     }, 2000);
// }

// console.log("start");

// let data = getData("Wilson");

// 上面的需要兩秒才有資料會導致udfine 出現
// console.log(data);

// console.log("end");

//callback function-------------------------------------------------------------------------------

function getData(name, callback) {
    setTimeout(()=>{
        callback({name : name, age: Math.floor(Math.random() * 30), major:"CS"});
    }, 2000);
}

console.log("start");

let data = getData("Wilson", (obj) =>{
    console.log(obj);
});


function getMovies(age, callback){
    if(age < 12){
        setTimeout(() =>{
            callback("cartoon movies");
        }, 1500);
    }else if(age < 18){
        setTimeout(() =>{
            callback("teen movies");
        }, 1500);
    }else if(age > 18){
        setTimeout(() =>{
            callback("porn movies");
        }, 1500);
    }

}

// 串接兩個 如果以後串接越來越多，會越等越久，串接太多會變成 callback Hell

let data2 = getData("Wilson", (obj) =>{
    console.log(obj);
    getMovies(obj.age,(str)=>{
        console.log(str);       
    });
});



console.log("end");


