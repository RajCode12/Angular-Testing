import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  //fixture is used to create instance of the component
  
  let el : DebugElement;

  //Asynchrounous beforeEach - 
  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [ HomeComponent ]
  //   })
  //   .compileComponents();
  //   // this compileComponents function returns a promise that is asynchrounous that's why we need asynchronous block
  //   // If we are not using this, below test will execute before the instace is created (promise is not resolved)
  // });

  // //Synchrounous beforeEach - 
  // beforeEach(() => {
  //   fixture = TestBed.createComponent(HomeComponent);
  //   //Here, we are creating instance using Testbed
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  //there is no need to write both synchronous and asynchronous block - waitForAsync
  beforeEach(waitForAsync(
    () => {
      TestBed.configureTestingModule({
        declarations:[HomeComponent]
      }).compileComponents().then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      });
    }
  ));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //testing the DOM element using debugElement and By - Css selector
  it('should show the correct contents', () => {
    const pElements = el.queryAll(By.css('p'));
    expect(pElements[0].nativeElement.textContent).toBe('home works!');

    const buttonElements = el.queryAll(By.css('.btn'));
    expect(buttonElements[0].nativeElement.disabled).toBeTrue();

    //For data binding using data binding, it will not detect the changes - use change detection using fixture
    component.title = "Welcome to Angular Testing"; //changing the value here
    fixture.detectChanges();
    const textElements = el.queryAll(By.css('.title'));
    expect(textElements[0].nativeElement.textContent).toBe('Welcome to Angular Testing');
  })
});
