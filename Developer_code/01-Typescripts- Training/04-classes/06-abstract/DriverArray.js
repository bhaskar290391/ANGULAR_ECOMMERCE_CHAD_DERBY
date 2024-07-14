"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Circle_1 = require("./Circle");
const Rectangle_1 = require("./Rectangle");
let circles = new Circle_1.Circle(20, 30, 55);
let rectangles = new Rectangle_1.Rectangle(10, 20, 36, 56);
let shapeArray = [];
shapeArray.push(circles);
shapeArray.push(rectangles);
for (let shapeData of shapeArray) {
    console.log(shapeData.getInfo());
    console.log(shapeData.calculateArea());
    console.log("");
}
