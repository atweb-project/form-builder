import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { DynamicFormsModule } from '../core/dynamic-forms/dynamic-forms.module';
import { FormBuilderComponent } from './form-builder/form-builder.component';

@NgModule({
  declarations: [HomeComponent, DashboardComponent, FormBuilderComponent],
  imports: [SharedModule, DashboardRoutingModule, DynamicFormsModule]
})
export class DashboardModule {}
