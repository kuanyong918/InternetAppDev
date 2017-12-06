import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Global } from '../Shared/global';
import { IRegister } from '../Model/register';


@Injectable()
export class OrderService {
    constructor(private _http: Http) { }

    //currentUser: IRegister;

    ngOnInit(): void {
        


    }

    get(url: string): Observable<any> {
        return this._http.get(url)
            .map((response: Response) => <any>response.json())
            //.do(data => console.log("All: " + JSON.stringify(data)))
            .catch(this.handleError);
    }

   /* addOrder(url: string) {
        this.currentUser = JSON.parse(sessionStorage.getItem("currentUser")); // get logged in user
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        this._http.post('api/order', JSON.stringify(localStorage.getItem("currentShoppingCart" + this.currentUser.Id))), { headers: headers }).subscribe();
        alert("Order Completed");
        this.get(url);
    } */

    post(url: string, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url, body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    put(url: string, id: number, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.put(url + id, body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    delete(url: string, id: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.delete(url + id, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}