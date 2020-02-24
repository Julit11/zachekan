import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../user.service";
import {MustMatch} from "../../custom-validators/must-match.validator";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {

  error: string;
  loading: boolean;

  form: FormGroup;

  confirmMode: boolean = false;

  public secretCode: string = '';

  timer: number = 0;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.maxLength(25),
          Validators.email
        ]
      ],
      firstName: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(1),
        ]
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(1),
        ]
      ],
      password: [
        '',
        [
          Validators.minLength(6),
          Validators.maxLength(255),
          Validators.required
        ]
      ],
      confirmPassword: [
        '',
        [
          Validators.minLength(6),
          Validators.maxLength(255),
          Validators.required
        ]
      ],
      rememberMe: [
        false,
        [
          Validators.required
        ]
      ]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() {
    return this.form.controls;
  }

  setTimer() {
    this.timer = 59;

    this.tick();
  }

  tick() {
    this.timer -= 1;

    if (this.timer > 0) {
      setTimeout(() => {
        this.tick();
      }, 1000);
    }
  }

  async signUp() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    try {
      /*
      await this.userService.signUp({
        firstName: this.f.firstName.value,
        lastName: this.f.lastName.value,
        email: this.f.email.value,
        password: this.f.password.value,
        rememberMe: this.f.rememberMe.value
      });
       */
      this.confirmMode = true;

      this.error = undefined;

      this.setTimer();

      // this.router.navigate(['/auth/confirm-email']);
    } catch (e) {
      this.error = e.message;
    }

    this.loading = false;
  }

  async confirmEmail() {
  }

  async sendEmailAgain() {
  }
}
