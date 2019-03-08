import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  loading: false;
  constructor() {}

  showLoader() {
    return this.loading;
  }

  setLoader(value) {
    return (this.loading = value);
  }
}
