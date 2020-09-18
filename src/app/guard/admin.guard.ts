import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate, CanActivateChild } from '@angular/router';

import { ReplaySubject, Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
//import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    // tslint:disable-next-line:no-inferrable-types
    reason: number = 1;

    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        if(window.localStorage.getItem("LoginToken")){ 
            return true;
        }
        else{
            this.router.navigateByUrl('/admin/user/login');
            return false;
        }
    }
}
