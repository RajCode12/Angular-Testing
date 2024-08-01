import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private shared : SharedService) { }

  multiply(a:number, b:number) : number {
    this.shared.sharedFunction();
    // Now, this service has another shared service
    return a*b;
  }
}
