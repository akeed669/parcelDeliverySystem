package com.example.demo.repositories;

import com.example.demo.entities.Customer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends CrudRepository<Customer, Long> {


    Customer findByEmail(String email);
    Customer getClientById(Long id);
}
