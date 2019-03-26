import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormControlsDirective } from './dynamic-form-controls.directive';
import { ButtonFormControlComponent } from './controls/button-form-control/button-form-control.component';
import { CheckboxFormControlComponent } from './controls/checkbox-form-control/checkbox-form-control.component';
import { InputFormControlComponent } from './controls/input-form-control/input-form-control.component';
import { DynamicFormsComponent } from './dynamic-forms.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    DynamicFormControlsDirective,
    ButtonFormControlComponent,
    CheckboxFormControlComponent,
    InputFormControlComponent,
    DynamicFormsComponent
  ],
  imports: [CommonModule, SharedModule],
  exports: [DynamicFormsComponent, DynamicFormControlsDirective],
  entryComponents: [
    ButtonFormControlComponent,
    CheckboxFormControlComponent,
    InputFormControlComponent
  ]
})
export class DynamicFormsModule {}
