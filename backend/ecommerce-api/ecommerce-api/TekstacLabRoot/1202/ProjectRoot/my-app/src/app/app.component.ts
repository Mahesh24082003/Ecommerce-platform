import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  standalone:true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  email:string ='';
  confirmation: string[]=[];

  subscribe() {
    if (this.email.trim()){
      this.confirmation = [
        "Confirmation mail has been sent to your mail id successfully"
      ];
    }
  }
}
