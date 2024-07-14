"use strict";
class CustomerForAccesor {
    get firstName() {
        return this._firstName;
    }
    set firstName(value) {
        this._firstName = value;
    }
    get lastName() {
        return this._lastName;
    }
    set lastName(value) {
        this._lastName = value;
    }
}
let customers = new CustomerForAccesor();
customers.firstName = "bhaskar";
customers.lastName = "Maddy";
console.log(customers.firstName);
console.log(customers.lastName);
