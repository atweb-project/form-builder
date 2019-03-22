import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { DynamicFormsModule } from '../core/dynamic-forms/dynamic-forms.module';

@NgModule({
  declarations: [HomeComponent, DashboardComponent],
  imports: [SharedModule, DashboardRoutingModule, DynamicFormsModule]
})
export class DashboardModule {}
