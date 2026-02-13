package com.example;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTimeout;

import java.time.Duration;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;

public class PlacementReportTest{
    private PlacementReport report;

    @BeforeAll
    static void initSuite(){
        System.out.println("Execution of PlacementReport Test Suite Started");
    }

    @AfterAll
    static void cleanupSuite(){
        System.out.println("Execution of PlacementReport Test Suite Finished");
    }
    @BeforeEach
    void setUp(){
        report = new PlacementReport();
        assertNotNull(report,"PlacementReport object should be initialized");


    }
    @AfterEach
    void tearDown(){
        System.out.println("Cleaning up after test case.");
    }
    @Test
    @Order(1)
    @DisplayName("Verify Highly Eligible Range [8.0, 10.0]")
    void testHighlyEligible() {
        assertAll("Highly Eligible Grouped Assertions",
        () -> assertEquals("HIGHLY ELIGIBLE", report.evaluatePlacementEligibility(8.0)),
        () -> assertEquals("HIGHLY ELIGIBLE", report.evaluatePlacementEligibility(9.0)),
        () -> assertEquals("HIGHLY ELIGIBLE", report.evaluatePlacementEligibility(10.0)));


    }
    @Test
    @Order(2)
    @DisplayName("Verify Eligible Range [6.5, 7.9]")
    void testEligible() {
        assertAll("Eligible Grouped Assertions",
        () -> assertEquals("ELIGIBLE", report.evaluatePlacementEligibility(6.5)),
        () -> assertEquals("ELIGIBLE", report.evaluatePlacementEligibility(7.2)),
        () -> assertEquals("ELIGIBLE", report.evaluatePlacementEligibility(7.9)));


    }
    @Test
    @Order(3)
    @DisplayName("Test Marginal Eligible Range [5.0, 6.4] with Timeout")
    void testMarginalEligible() {
        assertTimeout(Duration.ofMillis(500),
        ()-> {assertAll("Marginal Group Assertions" ,
        ()->assertEquals("MARGINAL ELIGIBILITY", report.evaluatePlacementEligibility(5.0)),
        () -> assertEquals("MARGINAL ELIGIBILITY", report.evaluatePlacementEligibility(5.7)),
        () -> assertEquals("MARGINAL ELIGIBILITY", report.evaluatePlacementEligibility(6.4)));
    });


    }
    @Test
    @Order(4)
    @DisplayName("Test Invalid CGPA Exception Test")
    void testInvalidCgpa(){
        assertThrows(InvalidStudentException.class,() -> report.evaluatePlacementEligibility(4.9));
        assertThrows(InvalidStudentException.class,() -> report.evaluatePlacementEligibility(10.1));

    }


}
