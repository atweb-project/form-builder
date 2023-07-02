import { Component } from '@angular/core';
import { IFormControl } from '../../models/form-control.interface';
import { IFormControlConfig } from '../../models/form-control-config.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-textarea-form-control',
  templateUrl: './textarea-form-control.component.html',
  styleUrls: ['./textarea-form-control.component.css']
})
export class TextareaFormControlComponent implements IFormControl {
  config!: IFormControlConfig;
  group!: FormGroup;
}
