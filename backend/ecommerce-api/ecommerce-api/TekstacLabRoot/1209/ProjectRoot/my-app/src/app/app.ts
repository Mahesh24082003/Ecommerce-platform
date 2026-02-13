import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student } from './student.model';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  students: Student[] =[
    new Student('SAM','RS200',21),
    new Student('JOHN', 'ST001' ,22),
    new Student('ANGEL','AN021',20)
  ];
}
