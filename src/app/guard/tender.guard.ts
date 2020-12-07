import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';

import { Observable } from 'rxjs';
// import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class TenderGuard implements CanActivate {

    constructor(
        private router: Router,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (localStorage.getItem('arStatus') === 'approved') {
            return true;
        } else {
            this.router.navigateByUrl('/landing/supplier-registration/registration');
            return false;
        }
    }
}

