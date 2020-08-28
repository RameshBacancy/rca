import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndPoint } from '../app.constants';
import { RequestServiceBase } from './request-service-base';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    
    authToken: string = null;
    user: any;
    constructor(
        private httpService: RequestServiceBase) { 
    }

    registerUser(user){
        return this.httpService.httpPost(EndPoint.register, user);
    }
    
    // tslint:disable-next-line:typedef
    login(loginData:any): Observable<any>{
        const loginUrl = EndPoint.login;        
        return this.httpService.httpPost(loginUrl, loginData);
    }

    storeUserToken(token:string){
        if(token){
            sessionStorage.setItem('authToken', token);
            this.authToken = token;
        }
    }
    isAuthenticated() {
        const token = sessionStorage.getItem('authToken');
        this.authToken = token;
        return token;
    }

    // getProfile() {
    //     let headers = new Headers();
    //     this.loadToken();
    //     headers.append('Authorization', this.authToken);
    //     headers.append('Content-Type', 'application/json');
    //     return this.http.get(EndPoint.profile, { headers: headers })
    //         .map(res => res.json())

    // }

    // loggedIn() {
    //     return tokenNotExpired('user_token');
    // }

    // logout() {
    //     this.authToken = null;
    //     this.user = null;
    //     localStorage.removeItem('user_token');
    // }
    // PostImage(data) {
    //     let headers = new Headers();
    //     return this.http.post(EndPoint.image, data, { headers: headers })
    //         .map(response => response.json())
    // }

    handleResponse(res) {
        if ('data' in res) {
        return res.data;
        }
        return res;
    }
}