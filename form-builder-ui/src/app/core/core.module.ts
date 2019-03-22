import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../core/auth/auth.guard';
import { AuthenticationService } from '../core/auth/authentication.service';
import { throwIfAlreadyLoaded } from '../core/utils/module-import-guard';
import { DynamicFormsModule } from './dynamic-forms/dynamic-forms.module';

@NgModule({
  imports: [CommonModule, DynamicFormsModule],
  exports: [CommonModule, DynamicFormsModule],
  providers: [AuthGuard, AuthenticationService]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
