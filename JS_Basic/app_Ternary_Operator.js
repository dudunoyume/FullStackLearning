// ternary operator

let age = 20;

let price = (age < 18) ? 50 : 100;
//          ( condition)  ? result if the condition is true : result if it's false


// if (age < 18) {
//     price = 50;
// }else{
//     price = 100;
// }
let price_2 = (age < 18) ? 50 : (age <60 ) ? 100:75;

// if (age < 18) {
//     price = 50;
// }else if(age < 60){
//     price = 100;
// }else{
    // pice = 75
// }




console.log(price);
console.log( price_2 );
