/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.demo.web;

import com.example.demo.entities.Driver;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

/**
 *
 * @author Akeed Manuideen
 */
public class DriverControllerTest {
    
    public DriverControllerTest() {
    }
    
    @BeforeAll
    public static void setUpClass() {
    }
    
    @AfterAll
    public static void tearDownClass() {
    }
    
    @BeforeEach
    public void setUp() {
    }
    
    @AfterEach
    public void tearDown() {
    }

    /**
     * Test of createNewDriver method, of class DriverController.
     */
    @Test
    public void testCreateNewDriver() {
        System.out.println("createNewDriver");
        Driver driver = null;
        BindingResult result_2 = null;
        DriverController instance = new DriverController();
        ResponseEntity expResult = null;
        ResponseEntity result = instance.createNewDriver(driver, result_2);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getDriverByID method, of class DriverController.
     */
    @Test
    public void testGetDriverByID() {
        System.out.println("getDriverByID");
        Long id = null;
        DriverController instance = new DriverController();
        ResponseEntity expResult = null;
        ResponseEntity result = instance.getDriverByID(id);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of loginDriver method, of class DriverController.
     */
    @Test
    public void testLoginDriver() {
        System.out.println("loginDriver");
        Driver driver = null;
        BindingResult result_2 = null;
        DriverController instance = new DriverController();
        ResponseEntity expResult = null;
        ResponseEntity result = instance.loginDriver(driver, result_2);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of deleteDriverById method, of class DriverController.
     */
    @Test
    public void testDeleteDriverById() {
        System.out.println("deleteDriverById");
        Long id = null;
        DriverController instance = new DriverController();
        ResponseEntity expResult = null;
        ResponseEntity result = instance.deleteDriverById(id);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }
    
}
