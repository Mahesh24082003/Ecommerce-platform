import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Validator,FormGroup,ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountModel } from './account.model';
import { AccountService } from './account.service';
@Component({
  selector: 'app-root',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{

    accountForm:FormGroup;
    accounts: any[]=[];
    isLoading=false;
    constructor(
      private fb : FormBuilder,
      private accountService:AccountService
    ) {
      this.accountForm=this.fb.group({
        fullName:['',Validators.required],
        dateOfBirth:['',Validators.required],
        gender:['Male',Validators.required],
        phoneNumber:['',[Validators.required,Validators.pattern('^[0-9]{10}$')]],
        accountType:['Savings',Validators.required],
        initialDeposit:['',[(Validators.required,Validators.min(500))]]

      })
    };
    ngOnInit():void{
       this.loadAccounts();
    }
    loadAccounts():void{
      this.isLoading=true;
      this.accountService.getAccounts().subscribe({
        next:(data)=>{
          this.accounts=data;
          this.isLoading=false;
        },
        error:(err)=>{
          console.error('Failed to load Accoutns',err);
          this.isLoading=false;
        }

      })
    }
    onSubmit():void{
      if(this.accountForm.invalid){
        this.accountForm.markAllAsTouched();
        return
      }
      this.accountService.createAccount(this.accountForm.value).subscribe({
        next:(createdAccount)=>{
          this.accounts.push(createdAccount);
          alert('Account created successfully');
          this.accountForm.reset({gender:'Male',accountType:'Savings'})
        },
        error:(err)=>{console.error('Failed to create account',err);
        alert('Error creating account')}
      })

    }
  }
