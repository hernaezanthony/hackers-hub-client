import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { User } from 'src/app/user';

export interface Type {
	value: string;
	viewValue: string;
  }

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})


export class FormsComponent implements OnInit {
	constructor(private fb: FormBuilder,private data: DataService,private router:  Router,
			public snackBar: MatSnackBar) { }

	name$ : Object;
	location$ : Object;
	type$ : Object;
	date$ : Object;
	time$ : Object;
	jSon$ : Object;
	username$ : Object;

	angularForm : FormGroup;
	
	nameControl : FormControl;
	locationControl : FormControl;
	typeControl : FormControl;
	dateControl : FormControl;
	timeControl : FormControl;

	selectedValue: string;
	currentUser: User;
		
  ngOnInit() {
	  	
		this.nameControl = new FormControl('', Validators.required);
		this.locationControl = new FormControl('', Validators.required);
		this.typeControl = new FormControl('', Validators.required);
		this.dateControl = new FormControl('', Validators.required);
		this.timeControl = new FormControl('', Validators.required);


		this.angularForm = new FormGroup ({
			name: this.nameControl,
			location: this.locationControl,
			type: this.typeControl,
			date: this.dateControl,
			time: this.timeControl
		});	
		
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }	


  onSubmit() {
		this.name$  = this.angularForm.value.name
		this.location$  = this.angularForm.value.location
		this.type$  = this.angularForm.value.type
		this.date$  = this.angularForm.value.date
		this.time$  = this.angularForm.value.time
		this.username$ = this.currentUser.username		
		
		this.jSon$ = {
			name: this.name$,
			location: this.location$,
			type: this.type$,
			date: this.date$,
			time: this.time$,
			created_by: this.username$
			};
		
		this.data.postData(this.jSon$).subscribe( 
			res => {
				console.log(res);
				console.log(this.jSon$);
				this.angularForm.reset();
				this.snackBar.open('Event Added!','OK', {
					duration: 2000, panelClass: ['snackbar']
				  });
				this.router.navigate(['/']);
			},
			err => {
				console.log("Error occured");
			}
		);
  }


  	getErrorMessage() {
	return this.nameControl.hasError('required') ? 'You must enter a value' : 
		this.locationControl.hasError('required') ? 'You must enter a value' :
		this.typeControl.hasError('required') ? 'You must enter a value' : 
		this.dateControl.hasError('required') ? 'You must enter a value' :
		this.timeControl.hasError('required') ? 'You must enter a value' :'';
	}

	gotoHome(){
		this.router.navigate(['/']);
	  }

	types: Type[] = [
		{value: 'Hackathon', viewValue: 'Hackathon'},
		{value: 'Seminar', viewValue: 'Seminar'},
		{value: 'Workshop', viewValue: 'Workshop'}
	  ];

}
