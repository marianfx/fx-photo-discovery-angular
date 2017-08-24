"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
/*Observables.
Observables are the next thing introduced in ES7 (not available tho, so use them with the rxjs library).
They are the advanced version of promises and can be used to make http requests (promises are the advanced versions of callbacks).
 - They act like a stream of data, capable of handling multiple values over time (not as promises, which are called once).
 - They are cancellable.
 - The operators available: map, filter, take, skip, debounce
*/
const Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
let UserService = class UserService {
    constructor(_http) {
        this._http = _http;
    } //this is the poor man DI (angular will instantiate the needed classes)
    get(url) {
        return this._http.get(url) //this returns an Observable<Response> list
            .map((response) => response.json()) //for each element of the list, map tells us what to do with it (return). This will transform each element to JSON => the method will return finally an array of JSON
            .do((data) => console.log(JSON.stringify(data))) //i think this executed at the end, but don't know for sure
            .catch(this.handleError); //catch the error
    }
    post(url, model) {
        let body = JSON.stringify(model);
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url, body, options)
            .map((response) => response.json())
            .catch(this.handleError);
    }
    put(url, id, model) {
        let body = JSON.stringify(model);
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(url + id, body, options)
            .map((response) => response.json())
            .catch(this.handleError);
    }
    delete(url, id) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        return this._http.delete(url + id, options)
            .map((response) => response.json())
            .catch(this.handleError);
    }
    handleError(error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || "Server error happened in User service.");
    }
};
UserService = __decorate([
    core_1.Injectable() //declares this services as injectival (as in DI)
    ,
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map