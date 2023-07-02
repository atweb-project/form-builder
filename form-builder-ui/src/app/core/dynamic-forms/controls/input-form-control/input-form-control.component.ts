import { Component } from '@angular/core';
import { IFormControl } from '../../models/form-control.interface';
import { IFormControlConfig } from '../../models/form-control-config.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-form-control',
  templateUrl: './input-form-control.component.html',
  styleUrls: ['./input-form-control.component.css']
})
export class InputFormControlComponent implements IFormControl {
  config!: IFormControlConfig;
  group!: FormGroup;
}
