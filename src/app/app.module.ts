import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

import { AppComponent } from './app.component';
import { InitGameFormComponent } from './init-game-form/init-game-form.component';
import { MatComponentsModule } from './mat-components.module';
import { GameService } from './services/game.service';


@NgModule({
  declarations: [
    AppComponent,
    InitGameFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    MatComponentsModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
