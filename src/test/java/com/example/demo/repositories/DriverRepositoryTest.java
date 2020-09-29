/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.demo.repositories;

import com.example.demo.entities.Driver;
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

/**
 *
 * @author Akeed Manuideen
 */
@DataJpaTest
@Rollback(false)
@AutoConfigureTestDatabase(replace = Replace.NONE)
@TestMethodOrder(OrderAnnotation.class)
public class DriverRepositoryTest {
    
    @Autowired
    private DriverRepository driverrepo;
    
    public DriverRepositoryTest() {
    }

    
   @Test
    @Rollback(false)
    @Order(1)
    public void testSaveNewDriver() {

        Driver driver = new Driver();

        driver.setEmail("akeed@gmail.com");
        driver.setFullname("Akeed");
        driver.setPassword("letmethrough");

        Driver saved = driverrepo.save(driver);
        
        assertThat(saved.getId()).isGreaterThan(0);
    }

    @Test
    @Order(2)
    public void testFindDriverByEmail() {
        Driver driver = driverrepo.findByEmail("akeed@gmail.com");
        assertThat(driver.getEmail()).isEqualTo("akeed@gmail.com");
    }

    @Test
    @Order(3)
    public void testListDrivers() {
        List<Driver> drivers = (List<Driver>) driverrepo.findAll();
        assertThat(drivers).size().isGreaterThan(0);
    }

    @Test
    @Rollback(false)
    @Order(4)
    public void testUpdateDriver() {
        
        Driver driver = driverrepo.findByEmail("akeed@gmail.com");
        driver.setFullname("Akeed New");

        driverrepo.save(driver);

        Driver updatedDriver = driverrepo.findByEmail("akeed@gmail.com");

        assertThat(updatedDriver.getFullname()).isEqualTo("Akeed New");
    }

    @Test
    @Order(5)
    @Rollback(false)
    public void testDeleteDriver() {
        Driver driver = driverrepo.findByEmail("akeed@gmail.com");

        driverrepo.deleteById(driver.getId());

        Driver deletedDriver = driverrepo.findByEmail("akeed@gmail.com");

        assertThat(deletedDriver).isNull();

    }

    public class DriverRepositoryImpl implements DriverRepository {

        public Driver findByEmail(String email) {
            return null;
        }

        public Driver getDriverById(Long id) {
            return null;
        }

        @Override
        public <S extends Driver> S save(S s) {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        @Override
        public <S extends Driver> Iterable<S> saveAll(Iterable<S> itrbl) {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        @Override
        public Optional<Driver> findById(Long id) {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        @Override
        public boolean existsById(Long id) {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        @Override
        public Iterable<Driver> findAll() {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        @Override
        public Iterable<Driver> findAllById(Iterable<Long> itrbl) {
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
        public void delete(Driver t) {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        @Override
        public void deleteAll(Iterable<? extends Driver> itrbl) {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        @Override
        public void deleteAll() {
            throw new UnsupportedOperationException("Not supported yet.");
        }
    }
    
}
