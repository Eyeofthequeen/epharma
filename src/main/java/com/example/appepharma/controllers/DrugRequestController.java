package com.example.appepharma.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.appepharma.dtos.DrugRequestAdminDto;
import com.example.appepharma.dtos.DrugRequestClientDto;
import com.example.appepharma.dtos.DrugRequestCreateDto;
import com.example.appepharma.models.Drug;
import com.example.appepharma.models.DrugRequest;
import com.example.appepharma.models.Pharmacy;
import com.example.appepharma.models.Response;
import com.example.appepharma.models.User;
import com.example.appepharma.repositories.ResponseRepository;
import com.example.appepharma.repositories.UserRepository;
import com.example.appepharma.services.IDrugRequestService;
import com.example.appepharma.services.IDrugService;
import com.example.appepharma.services.IPharmacyService;

import net.minidev.json.JSONObject;

@RestController
@RequestMapping("/api/drug/requests")
public class DrugRequestController {
    @Autowired
    private IDrugRequestService drugRequestService;

    @Autowired
    private IDrugService drugService;

    @Autowired
    private UserRepository userRepos;

    @Autowired
    private IPharmacyService pharmacyService;

    // REMPLACER par service
    @Autowired
    private ResponseRepository responseService;

    @GetMapping("/all")
    public List<?> findAllDrugRequest(@RequestParam("email") String email) {
        User user = userRepos.findByEmail(email);

        if (user.isAdminOrUserAdmin()) {
            return drugRequestService.findAllForAdmin(user.getPharmacy().getId());
        }

        return drugRequestService.findAllForClient(user.getId()); 
    }
    
    @PostMapping("/save/for/closest/pharmacies")
    public List<DrugRequestClientDto> saveForClosesPharmacies(@RequestBody DrugRequestCreateDto dto) {
        User user = userRepos.findByEmail(dto.getUser().getEmail());
        Drug drug = drugService.findByName(dto.getName());
        List<Pharmacy> pharmacies = pharmacyService.findAll();

        List<DrugRequest> requests = new ArrayList<>();

        for(Pharmacy pharmacy: pharmacies) {
            requests.add(new DrugRequest(dto.getQuantity(), drug, user, pharmacy));
        }

        return drugRequestService.saveAll(requests);
    }

    @PostMapping("/save/response")
    public ResponseEntity<String> saveResponse(@RequestBody DrugRequestAdminDto request) {
        Response savedResponse = responseService.save(request.getResponse());
        drugRequestService.addResponseToDrugRequest(request.getId(), savedResponse);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("response", "Saved successfully.");
        return ResponseEntity.ok(jsonObject.toString());
    }
}
