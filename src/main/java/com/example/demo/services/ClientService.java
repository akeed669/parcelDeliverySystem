package com.example.demo.services;

import com.example.demo.entities.Customer;
import com.example.demo.entities.Driver;
import com.example.demo.exceptions.UserNotFoundException;
import com.example.demo.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public Customer saveOrUpdateClient(Customer client) {
        return clientRepository.save(client);
    }


    public Customer getCustomerById(Long id) {

        Customer customer = clientRepository.getClientById(id);
        if (customer == null) {
            throw new UserNotFoundException("User id " + id + " is not found");
        }
        return customer;
    }
    
    public Iterable<Customer> getAllCustomers() {
        return clientRepository.findAll();
    }


    public Customer loginCustomer(String email, String password) {


        Customer customer1 = clientRepository.findByEmail(email);

        if (customer1 == null) {
            throw new UserNotFoundException("Invalid credentials");
        } else {
            String _password = customer1.getPassword();
            if (! _password.equals(password) ){
                throw new UserNotFoundException("Invalid credentials");
            }
        }

        return customer1;
    }

    public void deleteCustomerById(Long id) {

        Customer customer = getCustomerById(id);
        if (customer != null) {
            clientRepository.delete(customer);
        }
    }
}
