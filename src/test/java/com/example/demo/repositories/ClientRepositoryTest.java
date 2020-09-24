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
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;

/**
 *
 * @author Akeed Manuideen
 */
@DataJpaTest
@Rollback(false)
@AutoConfigureTestDatabase(replace = Replace.NONE)
@TestMethodOrder(OrderAnnotation.class)
public class ClientRepositoryTest {

//    @Autowired
//    private TestEntityManager entityManager;
    @Autowired
    private ClientRepository clientrepo;

    public ClientRepositoryTest() {
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
     * Test of findByEmail method, of class ClientRepository.
     */
    @Test
    @Rollback(false)
    @Order(1)
    public void testSaveNewCustomer() {

        Customer customer = new Customer();

        customer.setEmail("akeed@gmail.com");
        customer.setFullname("Akeed");
        customer.setPassword("letmethrough");

        Customer saved = clientrepo.save(customer);

//        entityManager.persist(customer);
//                 
//        Customer found = clientrepo.findByEmail("akeed@gmail.com");
        //assertThat(found.getEmail()).isEqualTo("akeed@gmail.com");
        assertThat(saved.getId()).isGreaterThan(0);
    }

    @Test
    @Order(2)
    public void testFindCustomerByEmail() {
        Customer customer = clientrepo.findByEmail("akeed@gmail.com");
        assertThat(customer.getEmail()).isEqualTo("akeed@gmail.com");
    }

    @Test
    @Order(3)
    public void testListCustomers() {
        List<Customer> customers = (List<Customer>) clientrepo.findAll();
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

        assertThat(updatedCustomer.getFullname()).isEqualTo("Akeed New");
    }

    @Test
    @Order(5)
    @Rollback(false)
    public void testDeleteCustomer() {
        Customer customer = clientrepo.findByEmail("akeed@gmail.com");

        clientrepo.deleteById(customer.getId());

        Customer deletedCustomer = clientrepo.findByEmail("akeed@gmail.com");

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
