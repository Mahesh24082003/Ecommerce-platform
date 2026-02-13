import { Component } from '@angular/core';
import { FormControl,FormGroup,FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-complaint-component',
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './complaint-component.html',
  styleUrl: './complaint-component.css'
})
export class ComplaintComponent {
check:boolean=false;
loginform=new FormGroup({
   name:new FormControl('',Validators.required),
   address:new FormControl('',Validators.required),
   contact:new FormControl('',[(Validators.required,Validators.pattern('[0-9]+$'))]),
   email: new FormControl('',[(Validators.required,Validators.email)]),
   select:new FormControl('',[(Validators.required,Validators.nullValidator)]),
   details:new FormControl('',Validators.required),
   date:new FormControl('',[(Validators.required)])
})
checklogin(){
  this.check=true
}
}
