import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFormControlConfig } from 'src/app/core/dynamic-forms/models/form-control-config.interface';
import * as _ from 'lodash';

@Component({
  selector: 'app-form-control-settings',
  templateUrl: './form-control-settings.component.html',
  styleUrls: ['./form-control-settings.component.scss']
})
export class FormControlSettingsComponent implements OnInit {
  settingsForm: FormGroup;
  controlSettings: IFormControlConfig;
  types = ['input', 'email', 'password', 'checkbox', 'dropdown'];
  constructor(
    public dialogRef: MatDialogRef<FormControlSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (!_.isNil(this.data.control)) {
      this.controlSettings = this.data.control;
    }
    this.buildSettingsForm();
  }

  buildSettingsForm() {
    this.settingsForm = this.formBuilder.group({
      type: [this.controlSettings.type || 'input'],
      label: [this.controlSettings.label || ''],
      name: [this.controlSettings.name || ''],
      placeholder: [this.controlSettings.placeholder || ''],
      dropdown: [this.convertArrayToString(this.controlSettings.options) || ''],
      value: [this.controlSettings.value || ''],
      disabled: [this.controlSettings.disabled || false],
      required: [this.controlSettings.required || false]
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  save(form: FormGroup) {
    this.controlSettings.type = form.value.type;
    this.controlSettings.label = form.value.label;
    this.controlSettings.name = form.value.name;
    this.controlSettings.placeholder = form.value.placeholder;
    this.controlSettings.options = form.value.dropdown.split(',');
    this.controlSettings.value = form.value.value;
    this.controlSettings.disabled = form.value.disabled;
    this.controlSettings.required = form.value.required;
    this.dialogRef.close(this.controlSettings);
  }

  private convertArrayToString(value) {
    if (!_.isNil(value) || !_.isEmpty(value)) {
      return value.join(',');
    }
    return value;
  }
}
