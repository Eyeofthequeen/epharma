package com.example.appepharma.services;

import java.util.List;

import com.example.appepharma.models.Pharmacy;

public interface IPharmacyService {
    Pharmacy save(Pharmacy pharmacy);
    List<Pharmacy> findAll();
}
