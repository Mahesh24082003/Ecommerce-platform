package com.example;
import java.util.*;

public class University {
    public static List<String> courses =null;

    public static List<String> coursesList(){
        courses = new ArrayList<>();
        courses.add("Computer Science");
        courses.add("Mathematics");
        courses.add("Physics");
        courses.add("Chemistry");
        return courses;
    }

}
