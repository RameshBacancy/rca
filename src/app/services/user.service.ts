import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndPoint } from '../app.constants';
import { RequestServiceBase } from './request-service-base';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    
    authToken: string = null;
    user: any;
    constructor( private router: Router ) { }

    registrationLogin(number, str){
        let token = Math.random();
        if (str === 'civil' && number === '11337788'){
            window.localStorage.setItem('registerToken1',''+token);
        }
        else if(str === 'registration' && number === '1086391'){
            window.localStorage.setItem('registerToken2',''+token);
        }
    }

    login(email, password){
        if (email === 'admin' && password === "admin"){
            window.localStorage.setItem('LoginToken',''+Math.random());
            this.router.navigateByUrl('/admin')
        }
    }

    logout() {
        localStorage.removeItem('LoginToken');
    }
    // registerUser(user){
    //     return this.httpService.httpPost(EndPoint.register, user);
    // }
    
    // tslint:disable-next-line:typedef
    // login(loginData:any): Observable<any>{
    //     const loginUrl = EndPoint.login;        
    //     return this.httpService.httpPost(loginUrl, loginData);
    // }

    // storeUserToken(token:string){
    //     if(token){
    //         sessionStorage.setItem('authToken', token);
    //         this.authToken = token;
    //     }
    // }
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

    
    // PostImage(data) {
    //     let headers = new Headers();
    //     return this.http.post(EndPoint.image, data, { headers: headers })
    //         .map(response => response.json())
    // }

    // handleResponse(res) {
    //     if ('data' in res) {
    //     return res.data;
    //     }
    //     return res;
    // }
}