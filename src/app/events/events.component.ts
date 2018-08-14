import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material';
import {Router,NavigationEnd} from '@angular/router';

import { ConfirmationService } from 'primeng/primeng';



@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  providers: [ConfirmationService]
})
export class EventsComponent implements OnInit {

   		events$: Object;
		currentUrl: string;

		constructor(private data: DataService, private router:  Router, public snackBar: MatSnackBar, private confirmationService: ConfirmationService) { 
			router.events.subscribe(event => {
				if (event instanceof NavigationEnd) {
					this.currentUrl = event.url;
				}
			});
		}

		  ngOnInit() {
			  
			  this.data.getEvents().subscribe(
			  	data => this.events$ = data 
			  );

			  console.log(localStorage.getItem('currentUser'));
			  

			}

			confirm(eventId) {
				this.confirmationService.confirm({
					message: 'Are you sure that you want to delete this event?',
					header: 'Confirmation',
					icon: 'pi pi-exclamation-triangle',
					accept: () => {
						this.data.deleteEvent(eventId).subscribe( 
							res => {
								console.log(res);
								this.snackBar.open('Event Deleted!','OK', {
									duration: 2000, panelClass: ['snackbar']
									});
								
								this.ngOnInit();
							},
							err => {
								console.log("Error occured");
							}
						);
					},
					reject: () => {
					
					}
				});
			}

			confirmDelete(eventId){
				if(confirm("Are you sure to delete this event? ")) {
					this.data.deleteEvent(eventId).subscribe( 
						res => {
							console.log(res);
							this.snackBar.open('Event Deleted!','OK', {
								duration: 2000, panelClass: ['snackbar']
								});

							this.router.navigateByUrl('/forms', {skipLocationChange: true}).then(()=>
							this.router.navigate(['/']));
						},
						err => {
							console.log("Error occured");
						}
					);
				}
			}

	
}
