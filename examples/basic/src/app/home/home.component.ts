import { Component } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.scss']
})

export class HomeComponent {
  content: string = 'hello world';
}