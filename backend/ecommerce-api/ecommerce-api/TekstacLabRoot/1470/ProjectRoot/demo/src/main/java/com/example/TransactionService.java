package com.example;

public class TransactionService {
public boolean depositToAccount(BankAccount account, double amount){
    if(amount <= 0) return false;
    account.deposit(amount);
    return true;
}
public boolean withdrawFromAccount(BankAccount account,double amount){
return account.withdraw((amount));
}
}
