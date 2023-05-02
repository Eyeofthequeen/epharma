package com.example.appepharma.services.implementation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.appepharma.dtos.DrugRequestClientDto;
import com.example.appepharma.dtos.DrugRequestAdminDto;
import com.example.appepharma.models.DrugRequest;
import com.example.appepharma.models.Response;
import com.example.appepharma.repositories.DrugRequestRepository;
import com.example.appepharma.services.IDrugRequestService;

import jakarta.transaction.Transactional;

@Service
public class DrugRequestService implements IDrugRequestService {
    @Autowired
    private DrugRequestRepository drugRequestRepos;

    public DrugRequest save(DrugRequest drugRequest) {
        return drugRequestRepos.save(drugRequest);
    }

    public List<DrugRequest> findAll() {
        return drugRequestRepos.findAll();
    }

    public List<DrugRequestClientDto> findAllForClient(Number id) {
        List<DrugRequest> requests = drugRequestRepos.findAllForClient(id.longValue());
        List<DrugRequestClientDto> dto = new ArrayList<>();
        for(DrugRequest request : requests) {   
            dto.add(new DrugRequestClientDto(request.getId(), request.getDrug(), request.getDate(), request.getQuantity(), request.getPharmacy(), request.getResponse()));
        }
        return dto;
    }

    public List<DrugRequestClientDto> saveAll(List<DrugRequest> drugRequests) {
        Iterable<DrugRequest> requests = drugRequestRepos.saveAll(drugRequests);
        List<DrugRequestClientDto> dto = new ArrayList<>();
        for(DrugRequest request : requests) {   
            dto.add(new DrugRequestClientDto(request.getId(), request.getDrug(), request.getDate(), request.getQuantity(), request.getPharmacy(), request.getResponse()));
        }
        return dto;
    }

    public List<DrugRequestAdminDto> findAllForAdmin(Number id) {
        List<DrugRequest> requests = drugRequestRepos.findAllForAdmin(id.longValue());
        List<DrugRequestAdminDto> dto = new ArrayList<>();
        for(DrugRequest request : requests) {
            dto.add(new DrugRequestAdminDto(request.getId(), request.getDrug(), request.getDate(), request.getQuantity(), request.getResponse(), request.getUser()));
        }
        return dto;
    }

    @Transactional
    public void addResponseToDrugRequest(Number id, Response response) {
        drugRequestRepos.addResponseToDrugRequest(id.longValue(), response);
    }
}
