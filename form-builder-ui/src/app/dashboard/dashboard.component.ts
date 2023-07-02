import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  AfterContentChecked
} from '@angular/core';
import { AuthenticationService } from '../core/auth/authentication.service';
import { ConfigService } from '../core/config/config.service';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from './services/sidenav.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterContentChecked {
  isAdmin!: boolean;
  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  constructor(
    private authenticationService: AuthenticationService,
    private configService: ConfigService,
    private cd: ChangeDetectorRef,
    private sidenavService: SidenavService
  ) {}

  ngOnInit() {
    this.isAdmin = this.authenticationService.isAdmin();
    this.sidenavService.setSidenav(this.sidenav);
  }

  ngAfterContentChecked() {
    this.cd.detectChanges();
  }

  showLoader() {
    return this.configService.showLoader();
  }
}
