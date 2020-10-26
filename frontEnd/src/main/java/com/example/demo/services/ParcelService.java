package com.example.demo.services;

import com.example.demo.entities.Customer;
import com.example.demo.entities.Driver;
import com.example.demo.entities.Parcel;
import com.example.demo.exceptions.ParcelNotFoundException;
import com.example.demo.repositories.ClientRepository;
import com.example.demo.repositories.DriverRepository;
import com.example.demo.repositories.ParcelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ParcelService {

    @Autowired
    private ParcelRepository parcelRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private DriverRepository driverRepository;

    public Parcel saveOrUpdateParcel(Parcel parcel) {
        Customer customer = clientRepository.findByEmail(parcel.getOwner());
        parcel.setCustomer(customer);

        return parcelRepository.save(parcel);
    }

    public Parcel getParcelByID(Long id) {

        Parcel parcel = parcelRepository.findParcelById(id);
        if (parcel == null) {
            throw new ParcelNotFoundException("Parcel ID " + id + " does not exists");
        }
        return parcel;
    }

    public Iterable<Parcel> getAllParcels() {
        return parcelRepository.findAll();
    }

    public void deleteParcelById(Long id) {

        Parcel parcel = getParcelByID(id);
        if (parcel != null) {
            parcelRepository.delete(parcel);
        }
    }

    //Use 1 - 3 numbers to represent parcel status
    public Parcel parcelStatusChange(Long id, int status, String deliveryAgent, String address, String desc, String dest, int weight) {

        Parcel oldParcel = getParcelByID(id);
        if (oldParcel != null) {
            
            oldParcel.setDeliveryAgent(deliveryAgent); 
            Driver driver = driverRepository.findByEmail(deliveryAgent);
            oldParcel.setDriver(driver);
            
            oldParcel.setAddress(address);
            oldParcel.setDescription(desc);
            oldParcel.setDestination(dest);
            oldParcel.setStatus(status);
            oldParcel.setWeight(weight);
            

            Parcel updatedParcel = parcelRepository.save(oldParcel);
            return updatedParcel;
        } else {
            return null;
        }
    }
    
    

//     //Use 1 - 3 numbers to represent parcel status
//    public Parcel parcelDriverAssignment(Long id, Driver driver) {
//
//        Parcel parcel = getParcelByID(id);
//        if (parcel != null) {
//            parcel.setDriver(driver);
//            Parcel updatedParcel = parcelRepository.save(parcel);
//            return updatedParcel;
//        } else {
//            return null;
//        }
//    }
}
