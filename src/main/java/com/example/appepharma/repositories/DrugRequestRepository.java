package com.example.appepharma.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.appepharma.models.DrugRequest;
import com.example.appepharma.models.Response;


public interface DrugRequestRepository extends CrudRepository<DrugRequest, Long> {
    <T extends DrugRequest> T save(T drugRequest);
    List<DrugRequest> findAll();
    
    @Query("SELECT d FROM DrugRequest d WHERE d.user.id = :id")
    public List<DrugRequest> findAllForClient(Long id);

    @Query("SELECT d FROM DrugRequest d WHERE d.pharmacy.id = :pharmacyId AND d.response.id = null")
    public List<DrugRequest> findAllForAdmin(Long pharmacyId);

    @Modifying
    @Query("UPDATE DrugRequest d SET d.response = :response WHERE d.id = :id")
    void addResponseToDrugRequest(Long id, Response response);
}
