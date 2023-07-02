import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  loading: boolean = false;
  constructor() {}

  showLoader() {
    return this.loading;
  }

  setLoader(value: boolean) {
    return (this.loading = value);
  }
}
