import { Component, signal } from '@angular/core';
import { ComplaintComponent } from './complaint-component/complaint-component';

@Component({
  selector: 'app-root',
  imports: [ComplaintComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-app');
}
