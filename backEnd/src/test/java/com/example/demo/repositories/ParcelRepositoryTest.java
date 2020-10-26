/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.demo.repositories;

import com.example.demo.entities.Parcel;
import java.util.List;
import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

/**
 *
 * @author Akeed Manuideen
 */
@DataJpaTest
@Rollback(false)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ParcelRepositoryTest {

    @Autowired
    private ParcelRepository parcelrepo;   
  

    public ParcelRepositoryTest() {
    }

    @Test
    @Rollback(false)
    @Order(1)
    public void testSaveNewParcel() {

        Parcel parcel = new Parcel();        
        
        parcel.setAddress("India");
        parcel.setDescription("Bottles");
        parcel.setDestination("Africa");
        parcel.setStatus(0);
        parcel.setDeliveryAgent("akeed@gmail.com");  
        parcel.setOwner("johntricks@gmail.com");   
        parcel.setWeight(10);

        Parcel saved = parcelrepo.save(parcel);

        assertThat(saved.getId()).isGreaterThan(0);
    }

    @Test
    @Order(2)
    public void testFindParcelByOwner() {
        Parcel parcel = parcelrepo.findByOwner("johntricks@gmail.com");
        assertThat(parcel.getOwner()).isEqualTo("johntricks@gmail.com");
    }

    @Test
    @Order(3)
    public void testListParcels() {
        List<Parcel> parcels = (List<Parcel>) parcelrepo.findAll();
        assertThat(parcels).size().isGreaterThan(0);
    }

    @Test
    @Rollback(false)
    @Order(4)
    public void testUpdateParcel() {

        Parcel parcel = parcelrepo.findByOwner("johntricks@gmail.com");
        parcel.setDestination("New Orleans");

        parcelrepo.save(parcel);

        Parcel updatedParcel = parcelrepo.findByOwner("johntricks@gmail.com");

        assertThat(updatedParcel.getDestination()).isEqualTo("New Orleans");
    }

    @Test
    @Order(5)
    @Rollback(false)
    public void testDeleteParcel() {
        Parcel parcel = parcelrepo.findByOwner("johntricks@gmail.com");

        parcelrepo.deleteById(parcel.getId());

        Parcel deletedParcel = parcelrepo.findByOwner("johntricks@gmail.com");

        assertThat(deletedParcel).isNull();

    }

    public class ParcelRepositoryImpl implements ParcelRepository {

        public Parcel findParcelById(Long id) {
            return null;
        }

        @Override
        public <S extends Parcel> S save(S s) {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        @Override
        public <S extends Parcel> Iterable<S> saveAll(Iterable<S> itrbl) {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        @Override
        public Optional<Parcel> findById(Long id) {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        @Override
        public boolean existsById(Long id) {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        @Override
        public Iterable<Parcel> findAll() {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        @Override
        public Iterable<Parcel> findAllById(Iterable<Long> itrbl) {
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
        public void delete(Parcel t) {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        @Override
        public void deleteAll(Iterable<? extends Parcel> itrbl) {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        @Override
        public void deleteAll() {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        @Override
        public Parcel findByOwner(String owner) {
            throw new UnsupportedOperationException("Not supported yet.");
        }
    }

}
