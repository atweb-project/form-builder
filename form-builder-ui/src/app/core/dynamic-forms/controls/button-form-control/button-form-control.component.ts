import { Component } from '@angular/core';
import { IFormControl } from '../../models/form-control.interface';
import { IFormControlConfig } from '../../models/form-control-config.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-button-form-control',
  templateUrl: './button-form-control.component.html',
  styleUrls: ['./button-form-control.component.css']
})
export class ButtonFormControlComponent implements IFormControl {
  config!: IFormControlConfig;
  group!: FormGroup;
}
