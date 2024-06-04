import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  alert = false;
  showInvalidUserPopup: boolean = false;
  showDashboard = false;

  constructor(private router: Router, private sharedService: SharedService) { }
  
  ngOnInit(): void { }
  
  username: any = '';
  password: string = '';

  loginForm = new FormGroup({
    uname: new FormControl("", [
      Validators.required,
      Validators.pattern("[a-zA-Z].*"),
    ]),
    pwd: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-zA-Z0-9]).{8,}$/),
      Validators.pattern(/[!@#$%^&*(),.?":{}|<>]/)
    ])
  });

  loginSubmitted() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('uname')?.value as string;
      const password = this.loginForm.get('pwd')?.value as string;

      this.sharedService.setUsername(username);
      this.router.navigate(['/dashboard']);
      console.log(this.loginForm.value);

      // Save to localStorage
      let data = { username, password };
      localStorage.setItem('session', JSON.stringify(data));
    } else {
      this.showInvalidUserPopup = true;
      setTimeout(() => {
        this.showInvalidUserPopup = false;
      }, 5000);
    }
  }

  showPassword = false;

  get uname(): FormControl {
    return this.loginForm.get("uname") as FormControl;
  }

  get pwd(): FormControl {
    return this.loginForm.get("pwd") as FormControl;
  }
}
