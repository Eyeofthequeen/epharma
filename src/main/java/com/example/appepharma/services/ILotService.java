package com.example.appepharma.services;

import java.util.List;

import com.example.appepharma.models.Lot;

public interface ILotService {
    public List<Lot> getAllLots();
    public Lot save(Lot lot);
    public Long getNextLotId();
}
