export interface AccountModel {
  id?:number;
  fullName:string;
  dateOfBirth:string;
  gender:'Male' | 'Female'|'Others';
  phoneNumber :string;
  accountType:'Savings'| 'Checking';
  initialDeposit:number;
}
