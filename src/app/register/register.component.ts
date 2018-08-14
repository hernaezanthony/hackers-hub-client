import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import {UserService } from 'src/app/user.service';
import {AlertService } from 'src/app/alert.service';
import { PasswordValidation } from 'src/app/password.validation';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {}
  
  angularForm : FormGroup;

  firstNameControl : FormControl;
  lastNameControl : FormControl;
  usernameControl : FormControl;
  passwordControl : FormControl;
  confirmPasswordControl : FormControl;


  ngOnInit() {

    this.firstNameControl = new FormControl('', Validators.required);
		this.lastNameControl = new FormControl('', Validators.required);
		this.usernameControl = new FormControl('', Validators.required);
    this.passwordControl = new FormControl('', Validators.required);
    this.confirmPasswordControl = new FormControl('', Validators.required); 

    this.angularForm = this.formBuilder.group({
      firstName: this.firstNameControl,
			lastName: this.lastNameControl,
      username: this.usernameControl,
      password: this.passwordControl,
      passwordConfirm: this.confirmPasswordControl,
    },{ validator: PasswordValidation.MatchPassword} );	

    
  }
  
  
  onSubmit(){

    console.log(this.angularForm.value);
    this.userService.register(this.angularForm.value)
            //.pipe(first())
            .subscribe(
                res => {
                    this.alertService.success('Registration successful', true);
                    console.log("Success");
                    this.router.navigate(['/']);
                },
                error => {
                    this.alertService.error(error);
                    console.log("Error");
                });
  }
}
