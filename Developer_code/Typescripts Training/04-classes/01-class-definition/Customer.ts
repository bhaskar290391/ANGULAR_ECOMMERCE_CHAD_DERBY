class Customer{
    firstName:string;
    lastName:string;

    constructor(firstName:string,lastName:string){
        this.firstName=firstName;
        this.lastName=lastName;
    }
}

let customer=new Customer("bhaskar","mudaliyar");
console.log(customer.firstName);
console.log(customer.lastName);