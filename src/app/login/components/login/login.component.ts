
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  signup: boolean = false;

  constructor() {
  }

  toggleCard(){
    this.signup = !this.signup; 
  }
}
