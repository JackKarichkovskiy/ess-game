import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material';

@Component({
  selector: 'sidenav-button',
  templateUrl: './sidenav-button.component.html',
  styleUrls: ['./sidenav-button.component.css']
})
export class SidenavButtonComponent {

  @Input('for') for: MatDrawer;

}
