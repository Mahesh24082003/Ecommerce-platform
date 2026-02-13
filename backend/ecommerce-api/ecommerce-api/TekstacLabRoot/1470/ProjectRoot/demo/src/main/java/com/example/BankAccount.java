package com.example;

public class BankAccount {
     private String accountNumber;
     private String accountHolder;
     private double balance;
     public BankAccount(String accountNumber,String accountHolder, double initialBalance){
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
     }

     public String getAccountNumber(){
        return accountNumber;
     }

     public String getAccountHolder(){
        return accountHolder;
     }

     public double getBalance(){
        return balance;
     }
     public void deposit(double amount){
        balance+=amount;
     }
     public boolean withdraw(double amount){
        if(amount > 0 && balance >= amount){
            balance -= amount;
            return true;

        }
        return false;

     }

}
