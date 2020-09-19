package com.example.demo.web;

import com.example.demo.entities.Customer;
import com.example.demo.entities.Parcel;
import com.example.demo.services.ClientService;
import com.example.demo.services.MapValidationErrorService;
import org.hibernate.usertype.CompositeUserType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController

@RequestMapping("api/clients")
public class ClientController {


    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private ClientService clientService;

    @PostMapping("")
    public ResponseEntity<?> createNewClient(@Valid @RequestBody Customer client, BindingResult result) {

        if (result.hasErrors()) {
            return new ResponseEntity<String>("Invalid customer object", HttpStatus.BAD_REQUEST);
        }

        clientService.saveOrUpdateClient(client);
        return new ResponseEntity<Customer>(client, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCustomerByID(@PathVariable Long id) {

        Customer customer = clientService.getCustomerById(id);
        return new ResponseEntity<Customer>(customer, HttpStatus.FOUND);
    }
    
    @GetMapping("")
    public Iterable<Customer> getAll() {

        return clientService.getAllCustomers();
    }


    @PostMapping(value = "/login", produces = "application/json")
    public ResponseEntity<?> loginCustomer(@Valid @RequestBody Customer customer, BindingResult result) {

        if (customer.getPassword() == null || customer.getEmail() == null) {
            return new ResponseEntity<String>("Provide credentials", HttpStatus.BAD_REQUEST);
        }

        Customer authorizedCustomer = clientService.loginCustomer(customer.getEmail(), customer.getPassword());

        return new ResponseEntity<Customer>(authorizedCustomer, HttpStatus.OK);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCustomerById(@PathVariable Long id) {
        clientService.deleteCustomerById(id);
        return new ResponseEntity<String>("Customer with id " + id + " was deleted", HttpStatus.OK);
    }
}
