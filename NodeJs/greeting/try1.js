function morning(name){
    console.log(`${name} Good morming`);
}

module.exports.morning = morning;
//可以直接用 export 不用寫 mdule

function sayHi(name){
    console.log( `${name} HI~~~~`);
    
}

// module.exports.sayHi = sayHi;
// >>這樣是個object

module.exports = sayHi
// >> 這樣會是一個function

console.log(module.exports);
