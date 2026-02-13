package com.example;

public class NotificationService{
   public String notifyDeposit(String accountHolder,double amount){
    return "Deposit of "+amount + " made successfully for " + accountHolder;

   }
   public String notifyWithdrawal(String accountHolder, double amount){
    return "Withdrawal of "+amount + " made successfully for "+ accountHolder;
   }

   public String notifyInsufficientFunds(String accountHolder){
    return "Withdrawal failed due to insufficient funds for " + accountHolder;
   }
}
