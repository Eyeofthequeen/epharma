package com.example.appepharma.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.appepharma.models.Drug;
import com.example.appepharma.services.IDrugService;

@RestController
@RequestMapping("/api/drugs")
public class DrugController {
    @Autowired
    private IDrugService drugService;

    @GetMapping("/all")
    public List<Drug> getAllDrugs() {
        return drugService.getAllDrugs();
    }

    @GetMapping("/all/names")
    public List<String> getAllDrugNames() {
        return drugService.findAllNames();
    }

    @PostMapping("/save")
    public Drug save(@RequestBody Drug drug){
        return drugService.save(drug);
    }

    @GetMapping("/get/{id}")
    public Drug getById(@PathVariable("id") Number id) {
        return drugService.findById(id);
    }
}
