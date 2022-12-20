//Array copy

let friends = ["mike", "Josh"];

let copy = friends;
// 這樣只是重複了 提取位置，如果遇到了push這種情況，會兩個一起push
copy.push("Nelson");

console.log(copy,friends);


let copy_array  = [...friends];
// spead oppator
copy_array.push("Dudu");

console.log(copy_array,friends);



// Higher order function

