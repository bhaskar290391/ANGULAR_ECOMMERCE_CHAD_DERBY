import { Shape } from "./Shape";

export class Circle extends Shape
{
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
   
