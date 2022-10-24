import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';
import { SignupCardComponent } from './components/signup-card/signup-card.component';
import { LoginCardComponent } from './components/login-card/login-card.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupCardComponent,
    LoginCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule,
    ReactiveFormsModule
  ],
  providers:[
    LoginService
  ]
})
export class LoginModule { }
