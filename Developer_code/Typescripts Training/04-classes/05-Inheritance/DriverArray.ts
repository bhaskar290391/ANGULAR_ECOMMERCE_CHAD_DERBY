import { Circle } from "./Circle";
import { Rectangle } from "./Rectangle";
import { Shape } from "./Shape";

let shapes=new Shape(10,20);
let circles=new Circle(20,30,55);
let rectangles=new Rectangle(10,20,36,56);

let shapeArray:Shape[]=[];

shapeArray.push(shapes);
shapeArray.push(circles);
shapeArray.push(rectangles);

for (let shapeData of shapeArray) {
    console.log(shapeData.getInfo());
}