import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  toggleArr= ['login'];

  loginName = '';
  loginPassword = '';
  sugnupEmail = '';
  signupContact='';
  signupName='';
  signupPassword='';

  toggleForm(mode: 'login' | 'signup'){
    this.toggleArr = [mode];

  }

  login(){}
  signup(){}
}
