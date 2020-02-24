import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../user.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit {

  error: string;
  loading: boolean;

  form: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.email
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
      rememberMe: [
        false,
        [
          Validators.required
        ]
      ]
    });
  }

  get f() {
    return this.form.controls;
  }

  async signIn() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    try {
      await this.userService.signIn({email: this.f.email.value, password: this.f.password.value, rememberMe: this.f.rememberMe.value});
      this.error = undefined;
    } catch (e) {
      this.error = e.message;
    }

    this.loading = false;
  }
}
