package com.example.appepharma.services;

import java.util.List;

import com.example.appepharma.dtos.DrugRequestAdminDto;
import com.example.appepharma.dtos.DrugRequestClientDto;
import com.example.appepharma.models.DrugRequest;
import com.example.appepharma.models.Response;

public interface IDrugRequestService {
    public List<DrugRequest> findAll();
    public DrugRequest save(DrugRequest drugRequest);
    public List<DrugRequestClientDto> findAllForClient(Number id);
    public List<DrugRequestAdminDto> findAllForAdmin(Number id);
    public List<DrugRequestClientDto> saveAll(List<DrugRequest> drugRequests);
    public void addResponseToDrugRequest(Number id, Response response);
}
