import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GradePipe } from './grade.pipe';
import { GradeDirective } from './grade.directive';
import { InfoComponent } from './info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GradePipe,
    GradeDirective,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    //provideHttpClient();
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
