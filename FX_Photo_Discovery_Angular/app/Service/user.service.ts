import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

/*Observables.
Observables are the next thing introduced in ES7 (not available tho, so use them with the rxjs library).
They are the advanced version of promises and can be used to make http requests (promises are the advanced versions of callbacks).
 - They act like a stream of data, capable of handling multiple values over time (not as promises, which are called once).
 - They are cancellable.
 - The operators available: map, filter, take, skip, debounce
*/
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()//declares this services as injectival (as in DI)
export class UserService {//this is on the userside; will send requests to server

    constructor(private _http: Http) { }//this is the poor man DI (angular will instantiate the needed classes)

    get(url: string): Observable<any> {
        return this._http.get(url) //this returns an Observable<Response> list
            .map((response: Response) => response.json())//for each element of the list, map tells us what to do with it
            .do((data) => console.log(JSON.stringify(data)))//i think this executed at the end, but don't know for sure
            .catch(this.handleError);//catch the error
    }

    post(url: string, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(url, body, options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    put(url: string, id: number, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.put(url + id, body, options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    
    delete(url: string, id: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.delete(url + id, options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || "Server error happened in User service.");
    }
}