import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from "../user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    const exceptedBe = next.data.be;

    const ifFalseRedirectTo = next.data.ifFalseRedirectTo;

    if (!exceptedBe === this.userService.isAuthBS.getValue()) {
      this.router.navigate([ifFalseRedirectTo ? ifFalseRedirectTo : '/']);
    }

    return exceptedBe === this.userService.isAuthBS.getValue();
  }
}
