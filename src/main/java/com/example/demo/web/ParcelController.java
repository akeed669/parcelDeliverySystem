package com.example.demo.web;

import com.example.demo.entities.Customer;
import com.example.demo.entities.Parcel;
import com.example.demo.services.MapValidationErrorService;
import com.example.demo.services.ParcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("api/parcels")
public class ParcelController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private ParcelService parcelService;

    @PostMapping("")
    public ResponseEntity<?> createNewParcel(@Valid @RequestBody Parcel parcel, BindingResult result) {

        if (result.hasErrors()) {
            return new ResponseEntity<String>("Invalid parcel object", HttpStatus.BAD_REQUEST);
        }

        parcelService.saveOrUpdateParcel(parcel);
        return new ResponseEntity<Parcel>(parcel, HttpStatus.CREATED);
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getParcelByID(@PathVariable Long id) {

        Parcel parcel = parcelService.getParcelByID(id);
        return new ResponseEntity<Parcel>(parcel, HttpStatus.FOUND);
    }


    @GetMapping("")
    public Iterable<Parcel> getAll() {
        return parcelService.getAllParcels();
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteParcelById(@PathVariable Long id) {
        parcelService.deleteParcelById(id);
        return new ResponseEntity<String>("Parcel with id " + id + " was deleted", HttpStatus.OK);
    }

    @PutMapping(value = "/parcel/{id}", produces = "application/json")
    public ResponseEntity<Parcel> updateParcelStatus(
            @PathVariable(value = "id") Long id, @RequestBody Parcel parcel) {

        int status = parcel.getStatus();
        System.out.println("status"+status);
        return new ResponseEntity<>(parcelService.parcelStatusChange(id, status), HttpStatus.OK);
    }
}
