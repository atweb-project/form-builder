import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  AfterContentChecked
} from '@angular/core';
import { AuthenticationService } from '../core/auth/authentication.service';
import { ConfigService } from '../core/config/config.service';
import { MatSidenav } from '@angular/material';
import { SidenavService } from './services/sidenav.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterContentChecked {
  isAdmin: boolean;
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    private authenticationService: AuthenticationService,
    private configService: ConfigService,
    private cd: ChangeDetectorRef,
    private sidenavService: SidenavService
  ) {}

  ngOnInit() {
    this.isAdmin = this.authenticationService.currentUserValue.admin;
    this.sidenavService.setSidenav(this.sidenav);
  }

  ngAfterContentChecked() {
    this.cd.detectChanges();
  }

  showLoader() {
    return this.configService.showLoader();
  }
}
