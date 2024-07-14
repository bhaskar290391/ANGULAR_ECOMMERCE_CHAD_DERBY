"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shape = void 0;
class Shape {
    constructor(_firstNumber, _lastNumber) {
        this._firstNumber = _firstNumber;
        this._lastNumber = _lastNumber;
    }
    get lastNumber() {
        return this._lastNumber;
    }
    set lastNumber(value) {
        this._lastNumber = value;
    }
    get firstNumber() {
        return this._firstNumber;
    }
    set firstNumber(value) {
        this._firstNumber = value;
    }
    getInfo() {
        return `x=${this._firstNumber},y=${this._lastNumber}`;
    }
}
exports.Shape = Shape;
