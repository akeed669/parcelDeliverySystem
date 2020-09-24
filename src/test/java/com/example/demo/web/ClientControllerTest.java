/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.demo.web;

import com.example.demo.entities.Customer;
import com.example.demo.services.ClientService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.validation.BindingResult;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 *
 * @author Akeed Manuideen
 */
public class ClientControllerTest {

    @InjectMocks
    ClientController clientController;

    @Mock
    ClientService customerServices;

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
    
//    @Test
//    public void testAddEmployee() 
//    {
//        MockHttpServletRequest request = new MockHttpServletRequest();
//        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
//         
//        when(customerServices.saveOrUpdateClient(any(Customer.class))).thenReturn(true);
//         
//        Employee employee = new Employee(1, "Lokesh", "Gupta", "howtodoinjava@gmail.com");
//        ResponseEntity<Object> responseEntity = employeeController.addEmployee(employee);
//         
//        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(201);
//        assertThat(responseEntity.getHeaders().getLocation().getPath()).isEqualTo("/1");
//    }
    
//    @Test
//    public void testFindAll() 
//    {
//        // given
//        Customer customer1 = new Customer();
//        Customer customer2 = new Customer();
//        Customers employees = new Customers();
//        employees.setEmployeeList(Arrays.asList(employee1, employee2));
// 
//        when(customerServices.getAllCustomers()).thenReturn(employees);
// 
//        // when
//        Employees result = employeeController.getEmployees();
// 
//        // then
//        assertThat(result.getEmployeeList().size()).isEqualTo(2);
//         
//        assertThat(result.getEmployeeList().get(0).getFirstName())
//                        .isEqualTo(employee1.getFirstName());
//         
//        assertThat(result.getEmployeeList().get(1).getFirstName())
//                        .isEqualTo(employee2.getFirstName());
//    }
    
    
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
