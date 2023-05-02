package com.example.appepharma.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.appepharma.dtos.LotDto;
import com.example.appepharma.models.Drug;
import com.example.appepharma.models.Lot;
import com.example.appepharma.services.IDrugService;
import com.example.appepharma.services.ILotService;


@RestController
@RequestMapping("/api/lots")
public class LotController {
    @Autowired
    private ILotService lotService;

    @Autowired
    private IDrugService drugService;

    @GetMapping("/all")
    public List<Lot> getAllLots() {
        return lotService.getAllLots();
    }

    @GetMapping("/next/id")
    public Number getNextLotId() {
        Number test = lotService.getNextLotId();
        return test;
    }

    @PostMapping("/save")
    public Lot save(@RequestBody LotDto dto) {
        Drug drug = drugService.findByName(dto.getName());
        return lotService.save(new Lot(dto.getNumber(), dto.getExpiration(), dto.getQuantity(), drug));
    }
}
