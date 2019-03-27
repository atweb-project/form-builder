import {
  Directive,
  Input,
  ComponentRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  Type,
  OnChanges,
  OnInit
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IFormControl } from './models/form-control.interface';
import { IFormControlConfig } from './models/form-control-config.interface';
import { ButtonFormControlComponent } from './controls/button-form-control/button-form-control.component';
import { CheckboxFormControlComponent } from './controls/checkbox-form-control/checkbox-form-control.component';
import { InputFormControlComponent } from './controls/input-form-control/input-form-control.component';
import { DropdownFormControlComponent } from './controls/dropdown-form-control/dropdown-form-control.component';

const components: { [type: string]: Type<IFormControl> } = {
  input: InputFormControlComponent,
  email: InputFormControlComponent,
  password: InputFormControlComponent,
  checkbox: CheckboxFormControlComponent,
  dropdown: DropdownFormControlComponent,
  button: ButtonFormControlComponent
};

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[dynamicFormControl]'
})
export class DynamicFormControlsDirective
  implements IFormControl, OnChanges, OnInit {
  @Input()
  config: IFormControlConfig;
  @Input()
  group: FormGroup;
  component: ComponentRef<IFormControl>;

  constructor(
    private readonly resolver: ComponentFactoryResolver,
    private readonly container: ViewContainerRef
  ) {}

  ngOnInit() {
    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<IFormControl>(
      components[this.config.type]
    );
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }
}
