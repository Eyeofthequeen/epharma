package com.example.appepharma.services.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.appepharma.models.Lot;
import com.example.appepharma.repositories.LotRepository;
import com.example.appepharma.services.ILotService;

@Service
public class LotService implements ILotService {
    @Autowired
    private LotRepository lotRepos;

    public Long getNextLotId() {
        return lotRepos.getNextLotId();
    }

    public List<Lot> getAllLots() {
        return lotRepos.findAll();
    }

    public Lot save(Lot lot) {
        return lotRepos.save(lot);
    }
}
