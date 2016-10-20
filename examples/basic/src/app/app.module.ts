import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import '../styles/app.scss'
import { AppComponent } from './app.component';
import { HomeComponent } from './home';

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,    
  ],
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  entryComponents: [AppComponent],
})
export class AppModule {

}