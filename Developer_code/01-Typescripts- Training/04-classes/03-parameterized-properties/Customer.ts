class CustomerForAccesorForPP{


    constructor(private _firstname: string,private _lastName: string){
    }

    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(value: string) {
        this._lastName = value;
    }
    public get firstname(): string {
        return this._firstname;
    }
    public set firstname(value: string) {
        this._firstname = value;
    }
}

let customers=new CustomerForAccesorForPP("bhaksar","soni");
console.log(customers.firstname);
console.log(customers.lastName);