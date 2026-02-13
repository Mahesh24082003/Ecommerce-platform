package com.example;
public class PlacementReport {
    public String evaluatePlacementEligibility(double cgpa) throws InvalidStudentException{
        if(cgpa >= 8.0 && cgpa <=10.0){
            return "HIGHLY ELIGIBLE";
        }
        else if(cgpa >= 6.5 && cgpa < 8.0){
            return "ELIGIBLE";
        }
        else if(cgpa >= 5.0 && cgpa < 6.5){
            return "MARGINAL ELIGIBILITY";
        }else{
            throw new InvalidStudentException("CGPA is not valid for placement eligibility");
        }
    }
}

