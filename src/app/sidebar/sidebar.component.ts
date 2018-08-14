import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';
//import { settings } from 'cluster';

import {AuthGuard} from 'src/app/auth.guard';

import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [ConfirmationService]
})

export class SidebarComponent implements OnInit {

currentUser: User;
currentUrl: string;
loggedIn = false;

constructor(private router: Router, private authGuard: AuthGuard, private confirmationService: ConfirmationService) {
  router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
  });

  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
}

  ngOnInit() {

  }

  confirmLogout(){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to log out?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.router.navigate(['/login']);
      },  
      reject: () => {
      
      }
    });
  }
}