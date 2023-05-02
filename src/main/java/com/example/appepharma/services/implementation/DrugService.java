package com.example.appepharma.services.implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.appepharma.models.Drug;
import com.example.appepharma.repositories.DrugRepository;
import com.example.appepharma.services.IDrugService;

@Service
public class DrugService implements IDrugService {
    @Autowired
    private DrugRepository drugRepos;
    
    public List<Drug> getAllDrugs() {
        return drugRepos.findAll();
    }
    
    public Drug save(Drug drug) {
        return drugRepos.save(drug);
    }

    public Drug findByName(String name) {
        return drugRepos.findByName(name);
    }

    public List<String> findAllNames() {
        return drugRepos.findAllNames();
    }

    public Drug findById(Number id) {
        Optional<Drug> optionalDrug = drugRepos.findById(id.longValue());
        return optionalDrug.get();
    }
}
