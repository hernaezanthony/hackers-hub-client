import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import {UserService } from 'src/app/user.service';
import {AlertService } from 'src/app/alert.service';
import {AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,

  ) { }
  
  angularForm : FormGroup;
  usernameControl : FormControl;
  passwordControl : FormControl;

  ngOnInit() {

		this.usernameControl = new FormControl('', Validators.required);
    this.passwordControl = new FormControl('', Validators.required);
		

    this.angularForm = new FormGroup ({
			username: this.usernameControl,
			password: this.passwordControl,
    });	
    
    this.authenticationService.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  
   get f() { return this.angularForm.controls; }
  
   
   onSubmit() {
    this.submitted = true;

    if (this.angularForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
}
}
