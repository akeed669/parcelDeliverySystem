/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.demo.web;

import com.example.demo.entities.Parcel;
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
public class ParcelControllerTest {
    
    public ParcelControllerTest() {
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
     * Test of createNewParcel method, of class ParcelController.
     */
    @Test
    public void testCreateNewParcel() {
        System.out.println("createNewParcel");
        Parcel parcel = null;
        BindingResult result_2 = null;
        ParcelController instance = new ParcelController();
        ResponseEntity expResult = null;
        ResponseEntity result = instance.createNewParcel(parcel, result_2);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getParcelByID method, of class ParcelController.
     */
    @Test
    public void testGetParcelByID() {
        System.out.println("getParcelByID");
        Long id = null;
        ParcelController instance = new ParcelController();
        ResponseEntity expResult = null;
        ResponseEntity result = instance.getParcelByID(id);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getAll method, of class ParcelController.
     */
    @Test
    public void testGetAll() {
        System.out.println("getAll");
        ParcelController instance = new ParcelController();
        Iterable<Parcel> expResult = null;
        Iterable<Parcel> result = instance.getAll();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of deleteParcelById method, of class ParcelController.
     */
    @Test
    public void testDeleteParcelById() {
        System.out.println("deleteParcelById");
        Long id = null;
        ParcelController instance = new ParcelController();
        ResponseEntity expResult = null;
        ResponseEntity result = instance.deleteParcelById(id);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of updateParcelStatus method, of class ParcelController.
     */
    @Test
    public void testUpdateParcelStatus() {
        System.out.println("updateParcelStatus");
        Long id = null;
        Parcel parcel = null;
        ParcelController instance = new ParcelController();
        ResponseEntity<Parcel> expResult = null;
        ResponseEntity<Parcel> result = instance.updateParcelStatus(id, parcel);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }
    
}
