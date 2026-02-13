package com.example;
import static org.junit.jupiter.api.Assertions.*;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;


public class UniversityTest {

    @Test
    @DisplayName("Verify that the list is not null")
    void testListNotNull(){
        assertNotNull(University.coursesList());
    }

    @Test
    @DisplayName("Verify that the list contains expected number of courses")
    void testListSize(){
        assertEquals(4,University.coursesList().size());
    }

    @Test
    @DisplayName("Verify the exact course names in the correct order")
    void testListOrder(){
        List<String> expected = Arrays.asList("Computer Science", "Mathematics","Physics","Chemistry");
        assertIterableEquals(expected, University.coursesList());
    }


}
