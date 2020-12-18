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

    static changePassword: any;
    url = environment.API_BASE_URL;
    authToken: string = null;
    currentUser: any;
    httpClient: any;

    constructor(
        private router: Router,
        private http: HttpClient,
        private alertService: AlertService,
        private spinner: SpinnerService,
        private reqHttp: RequestServiceBase
        ) { }

    createAcceptHeader() {
        let headers = new Headers();
        headers.set('Accept', 'application/json');
    }
    setToken(token) {
        this.currentUser = token;
        sessionStorage.setItem('authToken', token);
    }

    registrationLogin(num , str, type) {
        if (type === 'local') {
            localStorage.setItem('regType', 'local');
        }
        if (type === 'individual') {
        localStorage.setItem('regType', 'individual');
        }
        localStorage.setItem('foreign', 'false');
        if (str === 'civil') {
            window.localStorage.setItem('civilReg', num);
        }
        localStorage.setItem('supplierLogin', 'true');
    }

    foreignRegistration(type) {
        localStorage.setItem('supplierLogin', 'true');
        localStorage.setItem('foreign', 'true');
        localStorage.setItem('regType', 'international');
        if (type === 'alreadyRegistered') {
            localStorage.removeItem('newReg');
            this.router.navigate(['/landing/supplier-registration/login']);
        } else if (type === 'newSupplier') {
            localStorage.setItem('newReg', 'true');
            this.router.navigate(['/auth/register']);
        }
    }

    localRegistration(num) {
        localStorage.setItem('supplierLogin', 'true');
        localStorage.setItem('commercialReg', num);
        localStorage.setItem('completeReg', 'T');
    }

    supplierRegistration(body) {
        this.reqHttp.httpPost('supplier-register', body).subscribe(d => {
            localStorage.setItem('RegStatus', d.data.register_status);
            localStorage.setItem('arStatus', d.data.status);
            this.spinner.closeSpinner();
            this.router.navigate(['/landing/supplier-registration/dashboard']);
          },
          (error) => this.handleError(error)
        );
    }

    login(email, password) {
        localStorage.setItem('supplierLogin', 'false');
        this.reqHttp.httpPost( 'login', { email: email, password: password }).subscribe(
            (response) => {
                this.setToken(response.data.token);
                window.localStorage.setItem('LoginToken', '' + Math.random());
                this.router.navigateByUrl('/admin/dashboard');
                this.alertService.pushSuccess('Login Successfully!');
                this.spinner.closeSpinner();
              },
              (error) => this.handleError(error)
            );

    }

    forgetPass(email) {
        this.reqHttp.httpPost('forgot-password', { email: email }).subscribe(d => {
            this.alertService.pushSuccess('We sent you an email to reset your password.');
            this.spinner.closeSpinner();
          },
          (error) => this.handleError(error)
          );
    }

    resetPassword(body) {
        this.reqHttp.httpPost('password-reset', body).subscribe(
            (response) => {
                this.setToken(response.data.token);
                this.alertService.pushSuccess(response.message);
                this.router.navigateByUrl('/admin/user/login');
                this.spinner.closeSpinner();
            },
            (error) => this.handleError(error)
          );
    }

    logout() {
        this.reqHttp.httpGet('logout').subscribe(d => { });
    }

    changePassword(oldPassword, newPassword, confirmPassword) {
        this.reqHttp.httpPost('change-password',
            { old_password: oldPassword, new_password: newPassword, confirm_password: confirmPassword })
                .subscribe(
                    (response) => {
                        this.alertService.pushSuccess(response.message);
                        this.setToken(response.data.token);
                        this.router.navigateByUrl('/admin/user/login');
                        this.spinner.closeSpinner();
                    },
                    (error) => this.handleError(error)
                );
    }

    getrequests() {
        return this.reqHttp.httpGet('supplier-list');
    }

    approveReject(id, status) {
        this.reqHttp.httpPost('status-change', { id: id, status: status }).subscribe(d => {
            this.spinner.closeSpinner();
          });
        return this.http.post<any>(this.url + 'status-change', { id: id, status: status });
    }
    
    handleError(error) {
        const err = error.error.message || error.message
        console.log(err);
        this.alertService.pushError(err);
        this.spinner.closeSpinner();
    }
}
