/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.demo.web;

import com.example.demo.entities.Customer;
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
public class ClientControllerTest {
    
    public ClientControllerTest() {
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
     * Test of createNewClient method, of class ClientController.
     */
    @Test
    public void testCreateNewClient() {
        System.out.println("createNewClient");
        Customer client = null;
        BindingResult result_2 = null;
        ClientController instance = new ClientController();
        ResponseEntity expResult = null;
        ResponseEntity result = instance.createNewClient(client, result_2);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getCustomerByID method, of class ClientController.
     */
    @Test
    public void testGetCustomerByID() {
        System.out.println("getCustomerByID");
        Long id = null;
        ClientController instance = new ClientController();
        ResponseEntity expResult = null;
        ResponseEntity result = instance.getCustomerByID(id);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getAll method, of class ClientController.
     */
    @Test
    public void testGetAll() {
        System.out.println("getAll");
        ClientController instance = new ClientController();
        Iterable<Customer> expResult = null;
        Iterable<Customer> result = instance.getAll();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of loginCustomer method, of class ClientController.
     */
    @Test
    public void testLoginCustomer() {
        System.out.println("loginCustomer");
        Customer customer = null;
        BindingResult result_2 = null;
        ClientController instance = new ClientController();
        ResponseEntity expResult = null;
        ResponseEntity result = instance.loginCustomer(customer, result_2);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of deleteCustomerById method, of class ClientController.
     */
    @Test
    public void testDeleteCustomerById() {
        System.out.println("deleteCustomerById");
        Long id = null;
        ClientController instance = new ClientController();
        ResponseEntity expResult = null;
        ResponseEntity result = instance.deleteCustomerById(id);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }
    
}
