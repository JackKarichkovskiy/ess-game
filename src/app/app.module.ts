import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InitGameFormComponent } from './init-game-form/init-game-form.component';
import { MatComponentsModule } from './mat-components.module';


@NgModule({
  declarations: [
    AppComponent,
    InitGameFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
