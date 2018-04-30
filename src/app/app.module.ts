import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material'

import { AppComponent } from './app.component';
import { InitGameFormComponent } from './init-game-form/init-game-form.component';


@NgModule({
  declarations: [
    AppComponent,
    InitGameFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
