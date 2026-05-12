import { Component, signal } from '@angular/core';
import { Tasks } from './components/tasks/tasks';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Tasks],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('task-client');
}
