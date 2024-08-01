import { DebugElement } from '@angular/core';
import { GradeDirective } from './grade.directive';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GradePipe } from './grade.pipe';
import { By } from '@angular/platform-browser';

describe('GradeDirective', () => {
    let component : AppComponent;
    let fixture : ComponentFixture<AppComponent>;
    let el : DebugElement; // used to check DOM elements (elements in html file)

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations:[AppComponent, GradePipe, GradeDirective]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  }))

  it('should create an instance', () => {
    let mockEleRef = {
        nativeElement : document.createElement('div')
    };
    const directive = new GradeDirective(mockEleRef);
    expect(directive).toBeTruthy();
  });

  it('should should change the color on mouse hover', () => {
    let divs = el.queryAll(By.css('div'));
    let div0 = divs[0];
    let div1 = divs[1];
    let div2 = divs[2];
    let div3 = divs[3];
    let div4 = divs[4];

    div0.triggerEventHandler('mouseenter',{});
    fixture.detectChanges();
    expect(div0.nativeElement.style.color).toBe('green');

    div1.triggerEventHandler('mouseenter',{});
    fixture.detectChanges();
    expect(div1.nativeElement.style.color).toBe('blue');

    div3.triggerEventHandler('mouseenter',{});
    fixture.detectChanges();
    expect(div3.nativeElement.style.color).toBe('red');
  })
  
});
