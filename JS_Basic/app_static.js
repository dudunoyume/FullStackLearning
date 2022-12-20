// static properties and method

class Circle {
    static pi = 3.1415926535;
    constructor(radius){
        this.radius = radius;

    }
    getAera(){
        return this.radius * this.radius * Circle.pi;
    }
    getPerimeter(){
        return 2*Circle.pi*this.radius;
    }
    static getAreaFormula(){
        console.log("r * r * 3.14");
    }
}

let c1 = new Circle(5);
console.log( c1.getAera());

Circle.getAreaFormula();
console.log(Circle.pi);
// Circle.getAreaFormula();



