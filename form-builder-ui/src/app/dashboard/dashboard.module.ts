import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { DynamicFormsModule } from '../core/dynamic-forms/dynamic-forms.module';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { LayoutTabComponent } from './form-builder/layout-tab/layout-tab.component';
import { FormComponentsTabComponent } from './form-builder/form-components-tab/form-components-tab.component';
import { FormSettingsTabComponent } from './form-builder/form-settings-tab/form-settings-tab.component';
import { FormDroppableContainerComponent } from './form-builder/form-droppable-container/form-droppable-container.component';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    FormBuilderComponent,
    LayoutTabComponent,
    FormComponentsTabComponent,
    FormSettingsTabComponent,
    FormDroppableContainerComponent
  ],
  imports: [SharedModule, DashboardRoutingModule, DynamicFormsModule]
})
export class DashboardModule {}
