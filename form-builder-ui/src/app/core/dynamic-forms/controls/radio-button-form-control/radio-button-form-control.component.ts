import { Component } from '@angular/core';
import { IFormControl } from '../../models/form-control.interface';
import { IFormControlConfig } from '../../models/form-control-config.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-radio-button-form-control',
  templateUrl: './radio-button-form-control.component.html',
  styleUrls: ['./radio-button-form-control.component.css']
})
export class RadioButtonFormControlComponent implements IFormControl {
  config!: IFormControlConfig;
  group!: FormGroup;
}
