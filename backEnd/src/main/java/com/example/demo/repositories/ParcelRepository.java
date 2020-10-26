package com.example.demo.repositories;

import com.example.demo.entities.Parcel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParcelRepository extends CrudRepository<Parcel, Long> {

    Parcel findByOwner(String owner);
    Parcel findParcelById(Long id);

}
