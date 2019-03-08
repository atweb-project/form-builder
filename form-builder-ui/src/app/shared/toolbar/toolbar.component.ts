import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthenticationService } from '../../core/auth/authentication.service';
import * as _ from 'lodash';
import { SidenavService } from '../../dashboard/services/sidenav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  isAuthenticated: User;
  email = '';

  constructor(
    private authenticationService: AuthenticationService,
    private sidenavService: SidenavService,
    private router: Router
  ) {
    this.isAuthenticated = this.authenticationService.currentUserValue;
    this.getUserName();
  }

  ngOnInit() {}

  getUserName() {
    if (this.isAuthenticated) {
      if (!_.isNil(this.authenticationService.currentUserValue.email)) {
        this.email = this.authenticationService.currentUserValue.email;
      }
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  toogleSideNav() {
    if (this.isAuthenticated) {
      this.sidenavService.toggle();
    }
  }
}
