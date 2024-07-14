import { Shape } from "./Shape";

export class Circle extends Shape
{
    calculateArea(): number {
        return Math.PI * Math.pow(this._radius,2);
    }

    public get radius(): number {
        return this._radius;
    }
    public set radius(value: number) {
        this._radius = value;
    }

    constructor(firstNumber:number,lastNumber:number,private _radius: number){
        super(firstNumber,lastNumber)
    }

    getInfo():string{
        return  super.getInfo()+`,radius=${this._radius}`
    }
}
   
