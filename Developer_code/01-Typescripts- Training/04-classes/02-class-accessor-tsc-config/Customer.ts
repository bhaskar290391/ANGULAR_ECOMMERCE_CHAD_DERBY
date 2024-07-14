class CustomerForAccesor{

    private _firstName!: string;
    private _lastName!: string;

    public get firstName(): string {
        return this._firstName;
    }
    public set firstName(value: string) {
        this._firstName = value;
    }
    
    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(value: string) {
        this._lastName = value;
    }

}

let customers=new CustomerForAccesor();
customers.firstName="bhaskar";
customers.lastName="Maddy";
console.log(customers.firstName);
console.log(customers.lastName);