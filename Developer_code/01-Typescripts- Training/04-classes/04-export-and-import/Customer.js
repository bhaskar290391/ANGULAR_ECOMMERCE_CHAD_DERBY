"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerForAccesorForExportImport = void 0;
class CustomerForAccesorForExportImport {
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
exports.CustomerForAccesorForExportImport = CustomerForAccesorForExportImport;
