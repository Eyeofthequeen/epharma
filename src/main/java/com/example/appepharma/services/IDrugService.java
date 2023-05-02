package com.example.appepharma.services;

import java.util.List;

import com.example.appepharma.models.Drug;

public interface IDrugService {
    public Drug findByName(String name);
    public List<Drug> getAllDrugs();
    public Drug save(Drug drug);
    public List<String> findAllNames();
    public Drug findById(Number id);
}
