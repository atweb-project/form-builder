import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormControlsDirective } from './dynamic-form-controls.directive';
import { ButtonFormControlComponent } from './controls/button-form-control/button-form-control.component';
import { CheckboxFormControlComponent } from './controls/checkbox-form-control/checkbox-form-control.component';
import { InputFormControlComponent } from './controls/input-form-control/input-form-control.component';
import { DynamicFormsComponent } from './dynamic-forms.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DropdownFormControlComponent } from './controls/dropdown-form-control/dropdown-form-control.component';

@NgModule({
  declarations: [
    DynamicFormControlsDirective,
    ButtonFormControlComponent,
    CheckboxFormControlComponent,
    InputFormControlComponent,
    DynamicFormsComponent,
    DropdownFormControlComponent
  ],
  imports: [CommonModule, SharedModule],
  exports: [DynamicFormsComponent, DynamicFormControlsDirective],
  entryComponents: [
    ButtonFormControlComponent,
    CheckboxFormControlComponent,
    InputFormControlComponent,
    DropdownFormControlComponent
  ]
})
export class DynamicFormsModule {}
