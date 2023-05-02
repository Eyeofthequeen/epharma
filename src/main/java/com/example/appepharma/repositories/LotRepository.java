package com.example.appepharma.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.appepharma.models.Lot;

// @Repository implicit by extention
public interface LotRepository extends CrudRepository<Lot, Long> {
    List<Lot> findAll();
    <T extends Lot> T save(T lot);

    @Query(value = "SELECT nextval('lots_id_seq') + 1", nativeQuery = true)
    Long getNextLotId();
}
