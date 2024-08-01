import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing"
import { routes } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { HomeComponent } from "./home/home.component"
import { InfoComponent } from "./info/info.component"
import { GradePipe } from "./grade.pipe"
import { GradeDirective } from "./grade.directive"
import { Router } from "@angular/router"
import { Location } from "@angular/common"
import { DebugElement } from "@angular/core"
import { By } from "@angular/platform-browser"

describe('app routing testing', () => {

    let router : Router;
    let fixture : ComponentFixture<AppComponent>;
    let homeFixture : ComponentFixture<HomeComponent>;
    let infoFixture : ComponentFixture<InfoComponent>;
    let location : Location;
    let el : DebugElement;
    let btnEl : DebugElement;
    
    //to use router testing module, use export keyword for const routes
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports:[RouterTestingModule.withRoutes(routes)],
            declarations:[AppComponent,HomeComponent,InfoComponent,GradePipe,GradeDirective]
        }).compileComponents();
    }))

    beforeEach(() => {
        router = TestBed.inject(Router);
        router.initialNavigation();
        //used for navigating to default page
        fixture = TestBed.createComponent(AppComponent);
        location = TestBed.inject(Location);

        homeFixture = TestBed.createComponent(HomeComponent);
        el = homeFixture.debugElement;

        infoFixture = TestBed.createComponent(InfoComponent);
        btnEl = infoFixture.debugElement;
    });

    it('should navigate to the default path home', waitForAsync(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(location.path()).toBe('/home');
        })
        //Use to resume testing after event has triggered asynchronous change detection
        //It returns a promise and we can resolve it using then method
    }));

    it('should navigate to info page on clicking link on home component', waitForAsync(() => {
        homeFixture.detectChanges();
        let links = el.queryAll(By.css('a'));
        links[0].nativeElement.click();
        homeFixture.whenStable().then(() => {
            expect(location.path()).toBe('/info');
        })
    }));

    it('should navigate to home on clicking button on info component', waitForAsync(() => {
        infoFixture.detectChanges();
        let btnElements = btnEl.queryAll(By.css('button'));
        btnElements[0].nativeElement.click();
        infoFixture.whenStable().then(() => {
            expect(location.path()).toBe('/home');
        });
    }));
})