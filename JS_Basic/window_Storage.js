// setItem, getItem,
// localStorage.setItem("name", "DUDU");
// localStorage.setItem("address", "Taiwan");
// localStorage.setItem("car", "Toyota");
// let myAddress = localStorage.getItem("address");

// console.log(myAddress);

// localStorage.clear();

// sessionStorage 一樣

let friends = ["Josh","Mike","Doug"];

localStorage.setItem("friends", JSON.stringify(friends))

let myfriends = JSON.parse(localStorage.getItem("friends"));
console.log(myfriends);