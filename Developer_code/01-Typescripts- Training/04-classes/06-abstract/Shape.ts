export abstract class Shape{


    constructor(private _firstNumber: number,private _lastNumber: number){
    }

    public get lastNumber(): number {
        return this._lastNumber;
    }
    public set lastNumber(value: number) {
        this._lastNumber = value;
    }

    public get firstNumber(): number {
        return this._firstNumber;
    }
    public set firstNumber(value: number) {
        this._firstNumber = value;
    }


    getInfo():string{
        return `x=${this._firstNumber},y=${this._lastNumber}`
    }

    abstract calculateArea():number;
}