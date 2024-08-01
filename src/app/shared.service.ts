import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() {
    console.log("Shared service constructor...");
  }

  sharedFunction() {
    console.log("My shared function is called...");
  }
}
