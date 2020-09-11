import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndPoint } from '../app.constants';
import { RequestServiceBase } from './request-service-base';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    
    
    authToken: string = null;
    user: any;
    httpClient: any;
    static changePassword: any;
    constructor( private router: Router ) { }

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

    login(email, password){
        if (email === 'admin' && password === "admin"){
            window.localStorage.setItem('LoginToken',''+Math.random());
            this.router.navigateByUrl('/admin')
        }
    }

    forgetPass(email){
        if (email === 'admin'){
            this.router.navigateByUrl('/admin')
        }
    }

    logout() {
        localStorage.clear();
    }

    changePassword(){
        // var headers = new HttpHeaders()
        //   .set('Authorization', 'Token ' + localStorage.getItem('usertoken'));
        console.log("change password");
        this.router.navigateByUrl('/auth/supplierRegistration');
        
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