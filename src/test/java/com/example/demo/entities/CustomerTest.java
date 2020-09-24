/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.demo.entities;

import java.util.Date;
import java.util.List;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 *
 * @author Akeed Manuideen
 */
public class CustomerTest {
    
    public CustomerTest() {
    }
    
    @BeforeAll
    public static void setUpClass() {
    }
    
    @AfterAll
    public static void tearDownClass() {
    }

    /**
     * Test of getParcels method, of class Customer.
     */
    @Test
    public void testGetParcels() {
        System.out.println("getParcels");
        Customer instance = new Customer();
        List<Parcel> expResult = null;
        List<Parcel> result = instance.getParcels();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of setParcels method, of class Customer.
     */
    @Test
    public void testSetParcels() {
        System.out.println("setParcels");
        List<Parcel> parcels = null;
        Customer instance = new Customer();
        instance.setParcels(parcels);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getId method, of class Customer.
     */
    @Test
    public void testGetId() {
        System.out.println("getId");
        Customer instance = new Customer();
        Long expResult = null;
        Long result = instance.getId();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of setId method, of class Customer.
     */
    @Test
    public void testSetId() {
        System.out.println("setId");
        Long id = null;
        Customer instance = new Customer();
        instance.setId(id);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getEmail method, of class Customer.
     */
    @Test
    public void testGetEmail() {
        System.out.println("getEmail");
        Customer instance = new Customer();
        String expResult = "";
        String result = instance.getEmail();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of setEmail method, of class Customer.
     */
    @Test
    public void testSetEmail() {
        System.out.println("setEmail");
        String email = "akeed@gmail.com";
        Customer instance = new Customer();
        instance.setEmail(email);
        String result = instance.getEmail();        
        assertEquals(email, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getFullname method, of class Customer.
     */
    @Test
    public void testGetFullname() {
        System.out.println("getFullname");
        Customer instance = new Customer();
        String expResult = "";
        String result = instance.getFullname();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of setFullname method, of class Customer.
     */
    @Test
    public void testSetFullname() {
        System.out.println("setFullname");
        String fullname = "";
        Customer instance = new Customer();
        instance.setFullname(fullname);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getMobile method, of class Customer.
     */
    @Test
    public void testGetMobile() {
        System.out.println("getMobile");
        Customer instance = new Customer();
        int expResult = 0;
        int result = instance.getMobile();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of setMobile method, of class Customer.
     */
    @Test
    public void testSetMobile() {
        System.out.println("setMobile");
        int mobile = 0;
        Customer instance = new Customer();
        instance.setMobile(mobile);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getPassword method, of class Customer.
     */
    @Test
    public void testGetPassword() {
        System.out.println("getPassword");
        Customer instance = new Customer();
        String expResult = "";
        String result = instance.getPassword();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of setPassword method, of class Customer.
     */
    @Test
    public void testSetPassword() {
        System.out.println("setPassword");
        String password = "";
        Customer instance = new Customer();
        instance.setPassword(password);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getCreatedAt method, of class Customer.
     */
    @Test
    public void testGetCreatedAt() {
        System.out.println("getCreatedAt");
        Customer instance = new Customer();
        Date expResult = null;
        Date result = instance.getCreatedAt();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of setCreatedAt method, of class Customer.
     */
    @Test
    public void testSetCreatedAt() {
        System.out.println("setCreatedAt");
        Date createdAt = null;
        Customer instance = new Customer();
        instance.setCreatedAt(createdAt);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getUpdatedAt method, of class Customer.
     */
    @Test
    public void testGetUpdatedAt() {
        System.out.println("getUpdatedAt");
        Customer instance = new Customer();
        Date expResult = null;
        Date result = instance.getUpdatedAt();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of setUpdatedAt method, of class Customer.
     */
    @Test
    public void testSetUpdatedAt() {
        System.out.println("setUpdatedAt");
        Date updatedAt = null;
        Customer instance = new Customer();
        instance.setUpdatedAt(updatedAt);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of onCreate method, of class Customer.
     */
    @Test
    public void testOnCreate() {
        System.out.println("onCreate");
        Customer instance = new Customer();
        instance.onCreate();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of onUpdate method, of class Customer.
     */
    @Test
    public void testOnUpdate() {
        System.out.println("onUpdate");
        Customer instance = new Customer();
        instance.onUpdate();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }
    
}
