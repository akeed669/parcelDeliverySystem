package com.example.demo.repositories;

import com.example.demo.entities.Customer;
import com.example.demo.entities.Driver;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DriverRepository extends CrudRepository<Driver, Long> {
    Driver findByEmail(String email);
    Driver getDriverById(Long id);
}
