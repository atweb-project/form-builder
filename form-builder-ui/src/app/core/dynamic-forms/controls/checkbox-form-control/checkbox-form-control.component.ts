import { Component } from '@angular/core';
import { IFormControl } from '../../models/form-control.interface';
import { IFormControlConfig } from '../../models/form-control-config.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox-form-control',
  templateUrl: './checkbox-form-control.component.html',
  styleUrls: ['./checkbox-form-control.component.css']
})
export class CheckboxFormControlComponent implements IFormControl {
  config!: IFormControlConfig;
  group!: FormGroup;
}
