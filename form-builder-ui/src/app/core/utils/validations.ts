import { Validators } from '@angular/forms';
export const UsernameValidation = [Validators.required];
export const PasswordValidation = [
  Validators.required,
  // Validators.minLength(8),
  // Validators.maxLength(50)
];
export const EmailValidation = [Validators.required, Validators.email];
