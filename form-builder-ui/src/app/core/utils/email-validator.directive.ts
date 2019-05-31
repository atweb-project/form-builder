import { FormControl } from '@angular/forms';

export function validateEmail(c: FormControl) {
  const EMAIL_REGEXP = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  return EMAIL_REGEXP.test(c.value)
    ? null
    : {
        validateEmail: {
          valid: false
        }
      };
}
