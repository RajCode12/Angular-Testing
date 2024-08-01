import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';
import { SharedService } from './shared.service';

//adding x to describe or it (eg. xdescribe, xit) - that entire test case will be ignored
//adding f to describe or it (eg. fdescribe, fit) - it focus only on that test case (rest will be ignored)

describe('CalculatorService', () => {
  let calc : CalculatorService;
  let shared : SharedService;

  beforeEach(() => {
    // shared = new SharedService();
    // whenever, we are instantiating new service, constructor is called and we don't want that, - onSpyObject -> used to create a mock service

    // shared = jasmine.createSpyObj("SharedService",["sharedFunction"]);
    // first argument - service name, second argument - list of functions
    // this will create a mock service and don't call the constructor every time when new service is created.

    // calc = new CalculatorService(shared);
    // Here, we are manually creating instances of the service (not using dependency injection) - test bed
    // Test Bed is used to provide dependencies for the services

    shared = jasmine.createSpyObj("SharedService",["sharedFunction"]);
    // Suppose we want to use createSpyObj as SharedService inside TestBed
    TestBed.configureTestingModule({
      providers:[CalculatorService,
        {
          provide: SharedService, //service name
          useValue: shared //spy object
        }
      ],
    });
    shared = TestBed.inject(SharedService);
    calc = TestBed.inject(CalculatorService);
    
  })

  it('should multiply two numbers', () => {
    // shared = new SharedService();
    // calc = new CalculatorService(shared);
    // we have to create shared and calc everytime for checking a new test case - beforeEach, beforeAll

    const result = calc.multiply(5,6);
    //Now, If we are using cal.multiply function, how we come to know that sharedFunction() is also called - spy
    expect(result).toBe(30);    
  });

  it('should call the shared function', () => {
    // spyOn(shared,"sharedFunction");
    // first argument - service name, second argument - method name

    // spyOn(shared,"sharedFunction").and.callThrough();
    //This will ensure that original function is called everytime when multiply is called.

    const result = calc.multiply(5,6); 
    //Now, we can check whether shared function is called or not on calling multiply
    expect(shared.sharedFunction).toHaveBeenCalled();
  })
});
