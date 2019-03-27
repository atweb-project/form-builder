import { Component, OnInit } from '@angular/core';
import { IFormControl } from '../../models/form-control.interface';
import { IFormControlConfig } from '../../models/form-control-config.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dropdown-form-control',
  templateUrl: './dropdown-form-control.component.html',
  styleUrls: ['./dropdown-form-control.component.scss']
})
export class DropdownFormControlComponent implements IFormControl {
  config: IFormControlConfig;
  group: FormGroup;
}
