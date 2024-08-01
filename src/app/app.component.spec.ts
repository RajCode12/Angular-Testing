import { ComponentFixture, fakeAsync, TestBed , tick, flush, flushMicrotasks} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { GradePipe } from './grade.pipe';

describe('AppComponent', () => {
    let fixture : ComponentFixture<AppComponent>;
    let el : DebugElement;
    let component : AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent, GradePipe
      ],
    }).compileComponents().then(() => {
        fixture = TestBed.createComponent(AppComponent);
        el = fixture.debugElement;
        component = fixture.componentInstance;
    })
  });

  it('should create the app', () => {
    // const fixture = TestBed.createComponent(AppComponent);
    // const app = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should create render a button with subscribe', () => {
    component.isSubscribed = false;
    fixture.detectChanges();
    const btnElements = el.queryAll(By.css('.subscribe'));
    //component.btnText = "Subscribe";
    expect(btnElements[0].nativeElement.textContent).toBe("Subscribe");
    expect(btnElements[0].nativeElement.disabled).toBeFalse();
  });

  it('should render button with text subsribed and button should be disabled after subscribe', fakeAsync(() => {
    component.isSubscribed = false;
    fixture.detectChanges();
    let btnElements = el.queryAll(By.css('.subscribe'));
    //component.btnText = "Subscribe";
    btnElements[0].nativeElement.click(); // not hard coded - we are not setting btnText to subscribed and isSubscribed to true, instead calling the click() method to confirm
    
    setTimeout(() => {
        console.log("other test cases");
    }, 8000);
    setTimeout(() => {
        fixture.detectChanges();
        //Now, after we click on the button, btnElements[0] is still pointing to first button - Error
        btnElements = el.queryAll(By.css('.subscribe'));
        // expect(btnElements[0].nativeElement.textContent).toBe("Subscribed");
        // expect(btnElements[0].nativeElement.disabled).toBeTrue();
        //expect(btnElements[0].nativeElement.disabled).toBeFalse();
        //this disabled button is passing for both toBeTrue and toBeFalse - Error
        //this toBeFalse should give error, reason it is not giving error is test runner marking expect as completed before it is getting executed due to asynchronous
        //So, we want our test runner to wait for these code to execute - Done Function (DoneFn)
        //done();
        //defaul timeout for asynchronous - 5000ms
        //So, we need to inform jasmine that we have done with the execution
    }, 3000);

    flush();
    
    //tick(8000); //use to set timeout
    //Now, we don't need to write expect inside timeout
    //tick(3000);
    expect(btnElements[0].nativeElement.textContent).toBe("Subscribed");
    expect(btnElements[0].nativeElement.disabled).toBeTrue();
    //tick(5000);
    
  }));
  //Although, this code is correct but it is not convenient for complex components having multiple timeout and we don't know the duration - fakeAsync, zone (use to detect changes)

  //fakeAsync use zone to mark test has completed after all the asynchronous event executed (eg. button click)

  //Still in reality, we are not aware about the exact time - flush
  // It will wait for all asynchronous event to execute.

  //Promise - gives value after an asynchronous operation is executed
  
  it('should test the promise', fakeAsync(() => {
    let counter = 0;
    
    setTimeout(() => {
      console.log("First timeout");
      counter += 2;
    }, 2000);

    setTimeout(() => {
      counter += 3;
      console.log("Second timeout");
    }, 3000);
    
    Promise.resolve().then(() => {
      console.log("Promise");
      counter += 1;
    })
    //No matter, whatever be the time limit of setTimeout, Promise will be executed first
    //It is a micro task so it has seperate queue which executes first than timeout which is a macro task

    //tick(1000);
    //expect(counter).toBe(1);
    //we cannot use this to check the micro tasks result.
    //If we want to check our result only after performing all the micro tasks (promise) - flushMircotasks()

    flushMicrotasks();
    expect(counter).toBe(1);

    tick(2000);
    expect(counter).toBe(3);
    tick(3000);
    expect(counter).toBe(6);
    // flush();
    // expect(counter).toBe(6);
  }));
  
  it('should test the observable', fakeAsync(() => {
    let isSubscribed = false;
    let myObs = of(isSubscribed).pipe(delay(1000));
    //delay is same as setTimeout
    myObs.subscribe(() => {
      isSubscribed = true;
    })
    tick(1000);
    expect(isSubscribed).toBeTrue();
  }));
  
});

// ng test --no-watch --code-coverage
// --n-watch -> we don't want to rebuilt it every time the file changes
// --code-coverage -> to get the code coverage report
// it will generate a seperate code coverage testing folder
// for more details, you can open index.html file inside that code coverage folder generated.
// we can increase the code coverage and see which function we have not tested by clicking on particular files in that html file.

