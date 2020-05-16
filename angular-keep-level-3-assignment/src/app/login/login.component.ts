import { Component } from '@angular/core';
import { User } from '../user';
import { FormGroup, FormControl, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userObj: User;
  loginForm: FormGroup;
  bearerToken: string;
  submitMessage: string;

  // @ViewChild(FormGroupDirective, { static: false })
  // formGroupDirective: FormGroupDirective;
  userId = new FormControl();
  userPassword = new FormControl();

  constructor(private formbuilder: FormBuilder, private authservice: AuthenticationService,
    private routerService: RouterService) {
    this.userObj = new User();

    this.loginForm = formbuilder.group({
      userId: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      userPassword: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });
  }

  registerUser() {
    console.log("registerUser called from header");
    this.routerService.routeToRegisterPage();

  }

  loginSubmit() {
    this.userObj = this.loginForm.value;

    this.authservice.authenticateUser({
      userId: this.userObj.userId,
      userPassword: this.userObj.userPassword
    }).subscribe(
      res => {
        console.log("Hi from login submit");
        this.bearerToken = res['Token'];
        console.log(this.bearerToken+" login bearer tok");
        this.authservice.setBearerToken(this.bearerToken);
        this.authservice.setUserId(this.userObj.userId);
        this.routerService.routeToDashboard();
      },
      err => {
        if (err.status === 403) {
          console.log("Hi from login submit err if");
          this.submitMessage = err.error.message;
        }
        else {
          console.log("Hi from login submit err else");
          this.submitMessage = err.message;
        }
      }
    );
    // this.formGroupDirective.resetForm();
  }
}
