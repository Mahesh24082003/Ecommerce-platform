package com.example;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;
public class StudentTest {
    private Student student;

    @BeforeAll
    static void initSuite(){
        System.out.println("Student Test Suite Started");
    }

    @AfterAll
    static void cleanupSuite(){
        System.out.println("Student Test Suite Finished");
    }
    @BeforeEach
    void setUp(){
        student = new Student("Mahesh", 22, "mahesh@example.com");

    }
    @Test
    @Order(1)
    @DisplayName("Test Student Constructor")
    void testConstructor(){
        assertAll("Constructor initialization",
        () -> assertEquals("Mahesh", student.getName()),
        () -> assertEquals(22,student.getAge()),
        () -> assertEquals("mahesh@example.com", student.getEmail())
        );
    }

    @Test
    @Order(2)
    @DisplayName("Test Get Name")
    void testGetName(){
        assertEquals("Mahesh", student.getName());


    }

    @Test
    @Order(2)
    @DisplayName("Test Get Age")
    void testGetAge(){
        assertEquals(22, student.getAge());

    }

    @Test
    @Order(3)
    @DisplayName("Test Get Email")
    void testGetEmail(){
        assertEquals("mahesh@example.com", student.getEmail());
    }

    @Test
    @Order(4)
    @DisplayName("Test Set for name")
    void testSetName(){
        student.setName("Rahul");
        assertEquals("Rahul",student.getName());

    }

     @Test
    @Order(3)
    @DisplayName("Test Set for age")
    void testSetAge(){
        student.setAge(25);
        assertEquals(25,student.getAge());

    }

     @Test
    @Order(3)
    @DisplayName("Test Set for email")
    void testSetters(){
        student.setEmail("rahul@example.com");
        assertEquals("rahul@example.com",student.getEmail());

    }
}
