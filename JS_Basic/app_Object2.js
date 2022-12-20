//Prototype Inherience
//constructor function
function Person(name, age, height, weight){
    this.name = name,
    this.age = age,
    this.height = height,
    this.weight = weight
    this.sayYes = function(){
        console.log(this.name + "says yes.");
        
    }
}



Person.prototype.sayHi = function(){
    console.log(this.name + " say hi.");
    
}

Person.prototype.intro = function(){
    console.log("Hi, my name is" + this.name + ".");
}


function Student(name, age, height, weight, major, grade){
    //this 指的是student
    Person.call(this,name, age, height, weight)
    this.major = major;
    this.grade = grade;
}

// 繼承Person 的 prototype
Student.prototype = Object.create(Person.prototype);

// 新的prototype
Student.prototype.study = function(){
    console.log( "I am studying");
    
}


let Wilson = new Student("Wilson Ren",25 ,179, 75, "CS", 3.85);
console.log(Wilson.name);
Wilson.sayHi();
Wilson.study();
Wilson.sayYes();
 

let Mike = new Person("Mike Hunag", 26, 190, 90);
//Mike.study();
console.log(Wilson);

class Person_info{
    constructor(name,age,height,weight){
        this.name  = name,
        this.age = age,
        this.height = height,
        this.weight = weight
    }
    // 直接就是 prototype
    sayHi(){
        console.log(this.name + " say hi.");
    }
    intro(){
        console.log("Hi, my name is" + this.name + ".");
    }
}


let Mike_info = new Person_info("Mike Hunag", 26, 190, 90);
console.log(Mike_info);


class Student_info extends Person{
    constructor(name,age,height,weight,major,grade){
        super(name,age,height,weight);
        this.major = major,
        this.grade = grade
    }
    study(){
        console.log("Hi I am studying now.");
    }
}

let Wilson_pp = new Student("wilson ren", 25, 179, 75,"CS", 385);

Wilson_pp.study();
