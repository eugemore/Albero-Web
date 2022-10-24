import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.sass']
})
export class LoginCardComponent implements OnInit {

  form: FormGroup;
  wrongPassword: boolean = false;
  @Output() signupOutput: EventEmitter<void> = new EventEmitter<void>();

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  login() {
    const val = this.form.value;

    if (val.email && val.password) {
      this.loginService.login(val)
        .subscribe(
          (x: HttpResponse<any>) => {
            switch (x.status) {
              case 200:
                this.router.navigateByUrl('/chart');
                break;
              case 401:
                this.wrongPassword = true;
                break;

              default:
                break;
            }
          }
        );
    }
  }
}
