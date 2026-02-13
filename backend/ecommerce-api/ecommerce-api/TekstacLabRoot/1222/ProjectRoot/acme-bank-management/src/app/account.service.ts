import { Injectable } from '@angular/core';
import { AccountModel } from './account.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
   private apiUrl ='http://lmsreact.tekstac.com:3000/account';
   constructor(private http:HttpClient){}
   getAccounts():Observable<AccountModel[]>{
    return this.http.get<AccountModel[]>(this.apiUrl);
   }
   createAccount(account:AccountModel):Observable<AccountModel>{
    return this.http.post<AccountModel>(this.apiUrl,account)
   }
}
