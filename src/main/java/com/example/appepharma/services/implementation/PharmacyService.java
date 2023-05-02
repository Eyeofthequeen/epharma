package com.example.appepharma.services.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.appepharma.models.Pharmacy;
import com.example.appepharma.repositories.PharmacyRepository;
import com.example.appepharma.services.IPharmacyService;

@Service
public class PharmacyService implements IPharmacyService {
    @Autowired
    private PharmacyRepository pharmacyRepos;

    public Pharmacy save(Pharmacy pharmacy) {
        return pharmacyRepos.save(pharmacy);
    }

    public List<Pharmacy> findAll() {
        return pharmacyRepos.findAll();
    }
}
