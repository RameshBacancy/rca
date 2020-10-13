import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndPoint } from '../app.constants';
import { RequestServiceBase } from './request-service-base';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SpinnerService } from './spinner.service';
import { AlertService } from './alert.service';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    url = environment.API_BASE_URL;
    authToken: string = null;
    currentUser: any;
    httpClient: any;
    static changePassword: any;
    constructor(
        private router: Router, 
        private http: HttpClient, 
        private alertService: AlertService,
        private spinner: SpinnerService, 
        private _http: RequestServiceBase
        ) { }

    createAcceptHeader() {
        let headers = new Headers();
        headers.set('Accept', 'application/json');
    }
    setToken(token) {
        this.currentUser = token;
        sessionStorage.setItem('authToken', token);
    }

    registrationLogin(number, str, type) {
        if(type === 'local'){
            localStorage.setItem('regType','local');
        }
        if(type === 'individual'){
        localStorage.setItem('regType','individual');
        }
        localStorage.setItem('foreign', 'false')
        if (str === 'civil') {
            window.localStorage.setItem('civilReg', number);
        }
        localStorage.setItem('supplierLogin', 'true');
    }

    foreignRegistration(type) {
        localStorage.setItem('supplierLogin', 'true');
        localStorage.setItem('foreign', 'true');
        localStorage.setItem('regType','international');
        if (type === 'alreadyRegistered') {
            localStorage.removeItem('newReg')
            this.router.navigate(['/landing/supplier-registration/login']);
        }
        else if (type === 'newSupplier') {
            localStorage.setItem('newReg', 'true')
            this.router.navigate(['/auth/register']);
        }
    }

    localRegistration(number) {
        localStorage.setItem('supplierLogin', 'true');
        localStorage.setItem('commercialReg', number);
        localStorage.setItem('completeReg', 'T');
        
    }

    supplierRegistration(body) {
        this._http.httpPost('supplier-register', body).subscribe(d => { 
            localStorage.setItem('RegStatus',d.data.register_status);
            localStorage.setItem('arStatus',d.data.status);
            this.spinner.closeSpinner();
            this.router.navigate(['/landing/supplier-registration/dashboard']);
          })
    }

    login(email, password){
        localStorage.setItem('supplierLogin', 'false');
        let data;
        this._http.httpPost( 'login', { email: email, password: password }).subscribe(
            (response) => {                           
                this.setToken(response.data.token);
                window.localStorage.setItem('LoginToken',''+Math.random());
                this.router.navigateByUrl('/admin/dashboard');
                this.alertService.pushSuccess('Login Successfully!')
                this.spinner.closeSpinner();
              },
              (error) => {   
                this.alertService.pushError(error.error.message) ;
                this.spinner.closeSpinner();
              }
              );
        
    }

    forgetPass(email) {
        this._http.httpPost('forgot-password', { email: email }).subscribe(d => {
            this.alertService.pushSuccess('We sent you an email to reset your password.');
            this.spinner.closeSpinner();
          },
          e => {
            this.alertService.pushError(e.error.message);
            this.spinner.closeSpinner()
           }
          )
    }

    resetPassword(body) {
        this._http.httpPost('password-reset', body).subscribe(
            (response) => {                           
              this.setToken(response.data.token);
                this.alertService.pushSuccess(response.message);
                  this.router.navigateByUrl('/admin/user/login');
                this.spinner.closeSpinner();
            },
            (error) => {                              
                this.alertService.pushError(error.error.message);
              this.spinner.closeSpinner();
            }
          )
    }

    logout() {
        this._http.httpGet('logout').subscribe(d => { })
    }

    changePassword(oldPassword, newPassword, confirmPassword) {
        this._http.httpPost('change-password', { old_password: oldPassword, new_password: newPassword, confirm_password: confirmPassword }).subscribe(
            (response) => {     
                this.alertService.pushSuccess(response.message);                      
                this.setToken(response.data.token);
                this.router.navigateByUrl('/admin/user/login');
                this.spinner.closeSpinner();
            },
            (error) => {                              
                this.alertService.pushError(error.error.message);
                this.spinner.closeSpinner();
            }
          )
    }

    getrequests(){
    let data= [];
        this._http.httpGet('supplier-list').subscribe(d => {
            d.data.filter( m => {
              if(m.register_status == 'finish'){
              data.push(m);
              }
            });
          });
        return data;
    }

    approveReject(id, status){
        this._http.httpPost('status-change', { id: id, status: status }).subscribe(d => { 
            this.spinner.closeSpinner();
          });
        return this.http.post<any>(this.url + 'status-change', { id: id, status: status });
    }
}