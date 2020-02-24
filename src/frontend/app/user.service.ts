import {Inject, Injectable, OnInit, PLATFORM_ID} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {WsEvent} from "ws-client-events-decorators";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  // @WsEvent({name: 'sign-up', success: 'sign-up'})
  signUp: (request: { firstName: string; lastName: string; email: string; password: string; rememberMe: string; }) => Promise<void>;
  // @WsEvent({name: 'sign-in', success: 'sign-in'})
  signIn: (request: { email: string; password: string; rememberMe: boolean; }) => Promise<void>;

  isAuth: () => Promise<void>;

  isAuthBS: BehaviorSubject<boolean>;

  public isBrowser: boolean = isPlatformBrowser(this.platformId);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isAuthBS = new BehaviorSubject(false);
    console.log(this.isBrowser);
    // console.log(this.socket);
    // console.log(this.socket.of('ha-ha'));
    // socket.of('users');
  }

  ngOnInit(): void {
    console.log('ha-ha');
  }
}
