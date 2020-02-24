import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {ForgotComponent} from "./forgot/forgot.component";
import {AuthGuard} from "../guards/auth.guard";

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [AuthGuard], data: {be: false}
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [AuthGuard], data: {be: false}
  },
  {
    path: 'forgot',
    component: ForgotComponent,
    canActivate: [AuthGuard], data: {be: false}
  },
  {
    path: '**',
    redirectTo: 'sign-in',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
