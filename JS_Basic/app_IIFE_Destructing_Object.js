//IIFE 怕產生太多 GOLABL Varible

(function sayHi(name){
    console.log("Hello! " + name);
    
})("Wilson");

//contruction an object
let Wilson = {
    firstName: 'DUDU',
    age: 25,
    gender: "male",
    address:'Taiwan',
    height: 179,
    weight:75,
    friends:{
        fullName: 'Mike Huang',
    }
}




//Destructing an Object


// let firstName = Wilson.firstname;
// let gender = Wilson.gender;
// let friendName = Wilson.friends.fullName;

let{firstName, gender} = Wilson;
let{fullName} = Wilson.friends;

console.log( firstName + "'s gender is " +gender +".");
console.log(firstName +"has a friend, his name is " + fullName);

