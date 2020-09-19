package com.example.demo.web;

import com.example.demo.entities.Customer;
import com.example.demo.entities.Driver;
import com.example.demo.services.DriverService;
import com.example.demo.services.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("api/drivers")
public class DriverController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private DriverService driverService;


    @PostMapping("")
    public ResponseEntity<?> createNewDriver(@Valid @RequestBody Driver driver, BindingResult result) {

        if (result.hasErrors()) {
            return new ResponseEntity<String>("Invalid driver object", HttpStatus.BAD_REQUEST);
        }

        driverService.saveOrUpdateDriver(driver);
        return new ResponseEntity<Driver>(driver, HttpStatus.CREATED);
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getDriverByID(@PathVariable Long id) {

        Driver driver = driverService.getDriverById(id);
        return new ResponseEntity<Driver>(driver, HttpStatus.FOUND);
    }


    @PostMapping(value = "/login", produces = "application/json")
    public ResponseEntity<?> loginDriver(@Valid @RequestBody Driver driver, BindingResult result) {

        if (driver.getPassword() == null || driver.getEmail() == null) {
            return new ResponseEntity<String>("Provide credentials", HttpStatus.BAD_REQUEST);
        }

        Driver authorizedDriver = driverService.loginDriver(driver.getEmail(), driver.getPassword());

        return new ResponseEntity<Driver>(authorizedDriver, HttpStatus.OK);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDriverById(@PathVariable Long id) {
        driverService.deleteDriverById(id);
        return new ResponseEntity<String>("Driver with id " + id + " was deleted", HttpStatus.OK);
    }
}
