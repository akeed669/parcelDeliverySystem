/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.demo.repositories;

import com.example.demo.entities.Customer;
import java.util.List;
import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

// disable full auto-configuration and instead 
// apply only configuration relevant to JPA tests
@DataJpaTest
// disable auto rollback for the whole test class
@Rollback(false)
// run tests on real database instead of in-memory H2 database
@AutoConfigureTestDatabase(replace = Replace.NONE)
//specify the execution order of each test
@TestMethodOrder(OrderAnnotation.class)
public class ClientRepositoryTest {

    @Autowired
    // testing CRUD operations of ClientRepository
    private ClientRepository clientrepo;

    public ClientRepositoryTest() {
    }    
  
    @Test
    //disable roll back; data will be committed to the database
    //data available for subsequent test methods
    @Rollback(false)
    //will run as the first test in class 
    @Order(1)
    public void testSaveNewCustomer() {
        // create new customer
        Customer customer = new Customer();

        customer.setEmail("akeed@gmail.com");
        customer.setFullname("Akeed");
        customer.setPassword("letmethrough");

        Customer saved = clientrepo.save(customer);
        // method from AssertJ library for better readability
        //checks that the id of created object > 0
        assertThat(saved.getId()).isGreaterThan(0);
    }

    @Test
    @Order(2)
    public void testFindCustomerByEmail() {
        Customer customer = clientrepo.findByEmail("akeed@gmail.com");
        //checks that the email of created object matches input
        assertThat(customer.getEmail()).isEqualTo("akeed@gmail.com");
    }

    @Test
    @Order(3)
    public void testListCustomers() {
        List<Customer> customers = (List<Customer>) clientrepo.findAll();
        //checks that the returned list of customers > 0
        assertThat(customers).size().isGreaterThan(0);
    }

    @Test
    @Rollback(false)
    @Order(4)
    public void testUpdateCustomer() {
        
        Customer customer = clientrepo.findByEmail("akeed@gmail.com");
        customer.setFullname("Akeed New");

        clientrepo.save(customer);

        Customer updatedCustomer = clientrepo.findByEmail("akeed@gmail.com");
        //checks that the update was successful

        assertThat(updatedCustomer.getFullname()).isEqualTo("Akeed New");
    }

    @Test
    @Order(5)
    @Rollback(false)
    public void testDeleteCustomer() {
        Customer customer = clientrepo.findByEmail("akeed@gmail.com");

        clientrepo.deleteById(customer.getId());

        Customer deletedCustomer = clientrepo.findByEmail("akeed@gmail.com");
        //checks that the delete operation was successful

        assertThat(deletedCustomer).isNull();

    }

    /**
     * Test of getClientById method, of class ClientRepository.
     */
    public class ClientRepositoryImpl implements ClientRepository {

        public Customer findByEmail(String email) {
            return null;
        }

        public Customer getClientById(Long id) {
            return null;
        }

        @Override
        public <S extends Customer> S save(S s) {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        @Override
        public <S extends Customer> Iterable<S> saveAll(Iterable<S> itrbl) {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        @Override
        public Optional<Customer> findById(Long id) {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        @Override
        public boolean existsById(Long id) {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        @Override
        public Iterable<Customer> findAll() {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        @Override
        public Iterable<Customer> findAllById(Iterable<Long> itrbl) {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        @Override
        public long count() {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        @Override
        public void deleteById(Long id) {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        @Override
        public void delete(Customer t) {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        @Override
        public void deleteAll(Iterable<? extends Customer> itrbl) {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        @Override
        public void deleteAll() {
            throw new UnsupportedOperationException("Not supported yet.");
        }
    }

}
