package com.example.appepharma.dtos;

import java.time.LocalDate;

import com.example.appepharma.models.Drug;
import com.example.appepharma.models.Pharmacy;
import com.example.appepharma.models.Response;

public class DrugRequestClientDto {
    private Number id;
    private Drug drug;
    private LocalDate date;
    private Number quantity;
    private Pharmacy pharmacy;
    private Response response;

    public DrugRequestClientDto(Number id, Drug drug, LocalDate date, Number quantity, Pharmacy pharmacy, Response response) {
        this.id = id;
        this.drug = drug;
        this.date = date;
        this.quantity = quantity;
        this.pharmacy = pharmacy;
        this.response = response;
    }

    public Drug getDrug() {
        return drug;
    }

    public void setDrug(Drug drug) {
        this.drug = drug;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Number getQuantity() {
        return quantity;
    }

    public void setQuantity(Number quantity) {
        this.quantity = quantity;
    }

    public Pharmacy getPharmacy() {
        return pharmacy;
    }

    public void setPharmacy(Pharmacy pharmacy) {
        this.pharmacy = pharmacy;
    }

    public Number getId() {
        return id;
    }

    public void setId(Number id) {
        this.id = id;
    }

    public Response getResponse() {
        return response;
    }

    public void setResponse(Response response) {
        this.response = response;
    }
}
