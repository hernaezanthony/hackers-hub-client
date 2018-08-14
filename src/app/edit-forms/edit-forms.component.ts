import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';


export interface Type {
	value: string;
	viewValue: string;
  }

@Component({
  selector: 'app-edit-forms',
  templateUrl: './edit-forms.component.html',
  styleUrls: ['./edit-forms.component.scss']
})
export class EditFormsComponent implements OnInit {

  event$: Object;

  constructor(private route: ActivatedRoute,private fb: FormBuilder,private data: DataService,
    private router:  Router, public snackBar: MatSnackBar) 
   {

    this.route.params.subscribe( params => this.event$ = params.id);
    
   }

  name$ : Object;
	location$ : Object;
	type$ : Object;
  jSon$ : Object;
  date$ : Object;
	time$ : Object;
  id$ : Object;
	angularForm : FormGroup;
	
	nameControl : FormControl;
	locationControl : FormControl;
  typeControl : FormControl;
  idControl: FormControl
  dateControl : FormControl;
	timeControl : FormControl;

  selectedValue: string;

  

  ngOnInit() {

    this.data.getEvent(this.event$).subscribe(
      data => this.event$ = data);

      this.data.getEvent(this.event$)
      .subscribe( data => {
        this.angularForm.setValue(data);
      });

    this.idControl = new FormControl();
    this.nameControl = new FormControl('', Validators.required);
		this.locationControl = new FormControl('', Validators.required);
    this.typeControl = new FormControl('', Validators.required);
    this.dateControl = new FormControl('', Validators.required);
		this.timeControl = new FormControl('', Validators.required);
		
		this.angularForm = new FormGroup ({
      id: this.idControl,
			name: this.nameControl,
			location: this.locationControl,
      type: this.typeControl,
      date: this.dateControl,
      time: this.timeControl
      
    });	
    
  }

  setValues(nm, loc, ty, date,time){
    this.nameControl.patchValue(nm);
    this.locationControl.patchValue(loc);
    this.typeControl.patchValue(ty);
    this.dateControl.patchValue(date);
    this.timeControl.patchValue(time);
  }


  getErrorMessage() {
    return this.nameControl.hasError('required') ? 'You must enter a value' : 
      this.locationControl.hasError('required') ? 'You must enter a value' :
      this.typeControl.hasError('required') ? 'You must enter a value' :
      this.dateControl.hasError('required') ? 'You must enter a value' :
		  this.timeControl.hasError('required') ? 'You must enter a value' : '';
    }
  
    types: Type[] = [
      {value: 'Hackathon', viewValue: 'Hackathon'},
      {value: 'Seminar', viewValue: 'Seminar'},
      {value: 'Workshop', viewValue: 'Workshop'}
      ];
      
    onSubmit(){

      this.name$  = this.angularForm.value.name
		  this.location$  = this.angularForm.value.location
		  this.type$  = this.angularForm.value.type
      this.id$ = this.angularForm.value.id
      this.date$  = this.angularForm.value.date
		  this.time$  = this.angularForm.value.time

      
		  this.jSon$ = {
			  name: this.name$,
			  location: this.location$,
        type: this.type$,
        date: this.date$,
			  time: this.time$
			};
      
      this.data.updateEvent(this.id$,this.jSon$).subscribe( 
        res => {
          this.angularForm.reset();
          this.snackBar.open('Event Updated!','OK', {
            duration: 2000, panelClass: ['snackbar']
            });
          this.router.navigate(['/']);
        },
        err => {
          console.log("Error occured");
        }
      );
    }

    gotoHome(){
      this.router.navigate(['/']);
    }
}
