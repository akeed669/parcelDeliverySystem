/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.demo.services;

import com.example.demo.entities.Customer;
import com.example.demo.repositories.ClientRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import org.mockito.InjectMocks;
import org.springframework.boot.test.mock.mockito.MockBean;

/**
 *
 * @author Akeed Manuideen
 */
public class ClientServiceTest {

    @MockBean
    private ClientRepository repo;

    @InjectMocks
    private ClientService service;

    public ClientServiceTest() {
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
     * Test of saveOrUpdateClient method, of class ClientService.
     */
    @Test
    public void testSaveOrUpdateClient() {
        System.out.println("saveOrUpdateClient");
        Customer client = null;
        ClientService instance = new ClientService();
        Customer expResult = null;
        Customer result = instance.saveOrUpdateClient(client);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getCustomerById method, of class ClientService.
     */
    @Test
    public void testGetCustomerById() {
        System.out.println("getCustomerById");
        Long id = null;
        ClientService instance = new ClientService();
        Customer expResult = null;
        Customer result = instance.getCustomerById(id);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getAllCustomers method, of class ClientService.
     */
    @Test
    public void testGetAllCustomers() {
        System.out.println("getAllCustomers");
        ClientService instance = new ClientService();
        Iterable<Customer> expResult = null;
        Iterable<Customer> result = instance.getAllCustomers();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of loginCustomer method, of class ClientService.
     */
    @Test
    public void testLoginCustomer() {
        System.out.println("loginCustomer");
        String email = "";
        String password = "";
        ClientService instance = new ClientService();
        Customer expResult = null;
        Customer result = instance.loginCustomer(email, password);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of deleteCustomerById method, of class ClientService.
     */
    @Test
    public void testDeleteCustomerById() {
        System.out.println("deleteCustomerById");
        Long id = null;
        ClientService instance = new ClientService();
        instance.deleteCustomerById(id);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

}
