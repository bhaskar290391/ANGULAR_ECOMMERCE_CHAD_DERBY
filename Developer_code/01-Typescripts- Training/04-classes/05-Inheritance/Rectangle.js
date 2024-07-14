"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
const Shape_1 = require("./Shape");
class Rectangle extends Shape_1.Shape {
    constructor(firstNumber, lastNumber, _length, _breath) {
        super(firstNumber, lastNumber);
        this._length = _length;
        this._breath = _breath;
    }
    get length() {
        return this._length;
    }
    set length(value) {
        this._length = value;
    }
    get breadth() {
        return this._breath;
    }
    set breath(value) {
        this._breath = value;
    }
    getInfo() {
        return super.getInfo() + `,length=${this._length},breadth=${this._breath}`;
    }
}
exports.Rectangle = Rectangle;
