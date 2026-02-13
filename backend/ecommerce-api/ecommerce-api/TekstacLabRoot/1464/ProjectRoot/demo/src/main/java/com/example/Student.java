package com.example;


public class Student{
    private String studentId;
    private String studentName;
    private double cgpa;
    private String placementStatus;

    public Student(String studentId,String studentName,double cgpa,String placementStatus){
        this.studentId=studentId;
        this.studentName=studentName;
        this.cgpa=cgpa;
        this.placementStatus=placementStatus;
    }
    public String getStudentId(){
        return studentId;
    }
    public void setStudentId(String studentId){
         this.studentId=studentId;
    }
    public String getStudentName(){
        return studentName;
    }
    public void setStudentName(String studentName){
        this.studentName=studentName;
    }
    public double getCgpa(){
        return cgpa;
    }
    public void setCgpa(double cgpa){
        this.cgpa=cgpa;
    }

    public String getPlacementStatus(){
        return placementStatus;
    }

    public void setPlacementStatus(){
        this.placementStatus= placementStatus;
    }

}

