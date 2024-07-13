"use strict";
class CustomerForAccesorForPP {
    constructor(_firstname, _lastName) {
        this._firstname = _firstname;
        this._lastName = _lastName;
    }
    get lastName() {
        return this._lastName;
    }
    set lastName(value) {
        this._lastName = value;
    }
    get firstname() {
        return this._firstname;
    }
    set firstname(value) {
        this._firstname = value;
    }
}
let customers = new CustomerForAccesorForPP("bhaksar", "soni");
console.log(customers.firstname);
console.log(customers.lastName);
