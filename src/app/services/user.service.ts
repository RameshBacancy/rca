import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndPoint } from '../app.constants';
import { RequestServiceBase } from './request-service-base';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    
    url= environment.API_BASE_URL;
    authToken: string = null;
    currentUser: any;
    httpClient: any;
    static changePassword: any;
    constructor( private router: Router, private http: HttpClient ) { }

    createAcceptHeader() {
        let headers = new Headers();
        headers.set('Accept', 'application/json'); 
    }
    setToken(token){
         this.currentUser = token;  
         localStorage.setItem('authToken', token);
    }

    registrationLogin(number, str, type){
        if(type == 'international'){
            localStorage.setItem('foreign', 'true');
        }
        if(type == 'local' || type == 'individual'){
            localStorage.setItem('foreign', 'false');
        }
        if (str === 'civil' && number === '11337788'){
            window.localStorage.setItem('civilReg',''+Math.random());
        }
    }

    foreignRegistration(type){
        if (type === 'alreadyRegistered') {
            if (localStorage.getItem('civilReg')) {
                localStorage.setItem('completeReg', 'T');
                localStorage.removeItem('newReg')
              this.router.navigate(['/landing/supplier-registration/dashboard']);
            }
            else{
            //   this.alertService.pushError('Your Civil Number is Incorrect.');
            }
          }
          if (type === 'newSupplier') {
            if (localStorage.getItem('civilReg')) {
                localStorage.setItem('completeReg', 'T');
                localStorage.setItem('newReg', 'true')
                this.router.navigate(['/auth/register']);
              }
          }
    }

    localRegistration(number){
        if (number === '1086391'){
            localStorage.setItem('commercialReg',''+Math.random());
                localStorage.setItem('completeReg', 'T');
                this.router.navigate(['/landing/supplier-registration/dashboard']);
        }
    }

    login(email, password): Observable<any>{
        return this.http.post<any>(this.url+'login',{email: email, password: password});
    }

    forgetPass(email): Observable<any>{
        return this.http.post<any>(this.url+'forgot-password',{email: email});
    }

    resetPassword(email, token, newPassword): Observable<any>{
        return this.http.post<any>(this.url+'password-reset',{email: email, token: token, password: newPassword});
    }
    logout(): Observable<any> {
        return this.http.get<any>(this.url+'logout');
    }

    changePassword(oldPassword, newPassword, confirmPassword): Observable<any>{
        return this.http.post<any>(this.url+'change-password',{old_password: oldPassword, new_password: newPassword, confirm_password: confirmPassword});
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