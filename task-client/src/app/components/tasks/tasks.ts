import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TasksService, Task } from '../../services/tasks';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks implements OnInit {
 
  form!: FormGroup;
   tasks: Task[] = [];
  loading = false; 
  errorMessage = '';

  constructor(
    private tasksService: TasksService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required]
    });
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;

    this.tasksService.getTasks().subscribe({
      next: res => {
      this.tasks = [...res];
      this.loading = false;
       this.cdr.detectChanges();
      },
      error: err => {
        this.errorMessage = 'Failed to load tasks';
        this.loading = false;
      }
    });
  }

  addTask() {
    if (this.form.invalid) return;

    const newTask: Task = {
      id: 0,
      title: this.form.value.title!,
      isCompleted: false
    };

    this.tasksService.addTask(newTask).subscribe(res => {
      this.tasks = [...this.tasks, res];
      this.form.reset();
    });
  }


  toggle(task: Task) {
    task.isCompleted = !task.isCompleted
  }
}
