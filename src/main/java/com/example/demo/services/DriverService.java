package com.example.demo.services;

import com.example.demo.entities.Customer;
import com.example.demo.entities.Driver;
import com.example.demo.entities.Parcel;
import com.example.demo.exceptions.UserNotFoundException;
import com.example.demo.repositories.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DriverService {

    @Autowired
    DriverRepository driverRepository;

    public Driver saveOrUpdateDriver(Driver driver) {

        return driverRepository.save(driver);
    }

    public Driver getDriverById(Long id) {

        Driver driver = driverRepository.getDriverById(id);
        if (driver == null) {
            throw new UserNotFoundException("User id " + id + " is not found");
        }
        return driver;
    }


    public Driver loginDriver(String email, String password) {


        Driver driver = driverRepository.findByEmail(email);

        if (driver == null) {
            throw new UserNotFoundException("Invalid credentials");
        } else {
            String _password = driver.getPassword();
            if (!_password.equals(password)) {
                throw new UserNotFoundException("Invalid credentials");
            }
        }

        return driver;
    }
    public void deleteDriverById(Long id) {

        Driver driver = getDriverById(id);
        if (driver != null) {
            driverRepository.delete(driver);
        }
    }

}
