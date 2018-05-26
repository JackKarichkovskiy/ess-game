import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TutorialComponent } from './tutorial/tutorial.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private static readonly LS_NOT_FIRST_ENTRY_KEY = 'notFirstEntry';

  constructor(private dialog: MatDialog) {
    this.openTutorialIfNeeded();
  }

  openTutorial() {
    this.dialog.open(TutorialComponent, {
      width: '800px',
      position: {
        top: '150px'
      }
    });
  }

  private openTutorialIfNeeded() {
    let notFirstEntry = !!localStorage.getItem(AppComponent.LS_NOT_FIRST_ENTRY_KEY);
    if (notFirstEntry) return;

    this.openTutorial();
    localStorage.setItem(AppComponent.LS_NOT_FIRST_ENTRY_KEY, String(true));
  }
}
