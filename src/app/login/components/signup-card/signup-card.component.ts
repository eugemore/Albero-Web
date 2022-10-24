import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { confirmPasswordValidator } from 'src/app/shared/utils/validators/confirm-password.validator';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-signup-card',
  templateUrl: './signup-card.component.html',
  styleUrls: ['./signup-card.component.sass']
})
export class SignupCardComponent implements OnInit {

  form: FormGroup;
  signUpError: any;
  @Output() signupOutput: EventEmitter<void> = new EventEmitter<void>();

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validators: [confirmPasswordValidator()]
    });
  }

  ngOnInit() {

  }

  // signup() {
  //   console.log(this.form)
  // }

  signup() {
    const val = { ...this.form.value };
    delete val.confirmPassword;
    if (val.email && val.password) {
      this.loginService.signUp(val)
        .subscribe(
          (res: HttpErrorResponse | HttpResponse<any>) => {
            if ('error' in res) {
              this.signUpError = res.error;
            } else {
              this.router.navigateByUrl('/chart');
            }
          }
        );
    }
  }
}
