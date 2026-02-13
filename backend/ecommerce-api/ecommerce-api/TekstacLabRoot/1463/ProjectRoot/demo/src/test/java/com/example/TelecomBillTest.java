package com.example;

import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class TelecomBillTest{
    @BeforeAll
    static void initSuite(){
        System.out.println("Starting the entire TelecomBill Test Suite.");
    }
    @AfterAll
    static void cleanupSuite(){
        System.out.println("All tests completed. Finalizing suite.");
    }
    @BeforeEach
    void setup(){
        System.out.println("Initializing test Case...");

    }
    @AfterEach
    void tearDown(){
        System.out.println("Test case execution completed.");
    }

    @Test
    @Order(1)
    @DisplayName("Validate correct results for Prepaid and Postpaid in various cases")
    void testValidateConnectionTypeValid(){
        assertTrue(TelecomBill.validateConnectionType("Prepaid"));
        assertTrue(TelecomBill.validateConnectionType("prepaid"));
        assertTrue(TelecomBill.validateConnectionType("PREPAID"));
        assertTrue(TelecomBill.validateConnectionType("Postpaid"));
        assertTrue(TelecomBill.validateConnectionType("pOsTpAiD"));
    }

    @Test
    @Order(2)
    @DisplayName("Handle invalid connection types and empty strings")
    void testValidateConnectionTypeInValid(){
        assertFalse(TelecomBill.validateConnectionType("Wireless"));
        assertFalse(TelecomBill.validateConnectionType(""));
        assertFalse(TelecomBill.validateConnectionType(null));
        assertFalse(TelecomBill.validateConnectionType("@#$123"));
    }

    @Test
    @Order(3)
    @DisplayName("Calculate bill for data usage less than 100 units")
    void testCalculateBillLowUsage(){
        assertEquals(75.0,TelecomBill.calculateBillAmount(50),0.001);
        assertEquals(148.5,TelecomBill.calculateBillAmount(99),0.001);


    }
    @Test
    @Order(4)
    @DisplayName("Calculate bill for usage between 100 and 499 units")
    void testCalculateBillMediumUsage(){
        assertEquals(200.0,TelecomBill.calculateBillAmount(100),0.001);
        assertEquals(998.0,TelecomBill.calculateBillAmount(499),0.001);
    }
    @Test
    @Order(5)
    @DisplayName("Calculate bill for usuage of 500 or more units")
    void testCalculateBillHighUsage(){
        assertEquals(1750.0,TelecomBill.calculateBillAmount(500),0.001);
        assertEquals(3500.0,TelecomBill.calculateBillAmount(1000),0.001);


    }
    @Test
    @Order(6)
    @DisplayName("Calculate bill is zero for zero or negative usuage")
    void testCalculateBillZeroOrNegative(){
        assertEquals(0.0,TelecomBill.calculateBillAmount(0),0.001);
        assertEquals(0.0,TelecomBill.calculateBillAmount(-10),0.001);


    }


}


