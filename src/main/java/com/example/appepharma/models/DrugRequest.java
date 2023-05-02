package com.example.appepharma.models;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="drug_requests")
public class DrugRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date = LocalDate.now();

    @Column(nullable = false)
    private int quantity;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "drug_id", nullable = false)
    private Drug drug;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "pharmacy_id", referencedColumnName = "id", nullable = false)
    private Pharmacy pharmacy;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "response_id")
    private Response response;

    public DrugRequest() {}

    public DrugRequest(Number quantity, Drug drug, User user) {
        this.quantity = quantity.intValue();
        this.drug = drug;
        this.user = user;
    }

    public DrugRequest(Number quantity, Drug drug, User user, Pharmacy pharmacy) {
        this.quantity = quantity.intValue();
        this.drug = drug;
        this.user = user;
        this.pharmacy = pharmacy;
    }

    public DrugRequest(Long id, LocalDate date, Number quantity, Drug drug, Response response, User user) {
        this.id = id;
        this.date = date;
        this.quantity = quantity.intValue();
        this.drug = drug;
        this.response = response;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Drug getDrug() {
        return drug;
    }

    public void setDrug(Drug drug) {
        this.drug = drug;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Response getResponse() {
        return response;
    }

    public void setResponse(Response response) {
        this.response = response;
    }

    public Pharmacy getPharmacy() {
        return pharmacy;
    }

    public void setPharmacy(Pharmacy pharmacy) {
        this.pharmacy = pharmacy;
    }
}
