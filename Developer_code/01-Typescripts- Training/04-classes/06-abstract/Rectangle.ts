import { Shape } from "./Shape";

export class Rectangle extends Shape{
    
    calculateArea(): number {
        return this._length * this._breath;
    }


    constructor(firstNumber:number,lastNumber:number,private _length: number,
        private _breath: number
    ){
        super(firstNumber,lastNumber)
    }

    public get length(): number {
        return this._length;
    }
    public set length(value: number) {
        this._length = value;
    }

    public get breadth(): number {
        return this._breath;
    }
    public set breath(value: number) {
        this._breath = value;
    }

    getInfo():string{
        return  super.getInfo()+`,length=${this._length},breadth=${this._breath}`
    }
}