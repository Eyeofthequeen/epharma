package com.example.appepharma.models;

import java.time.LocalDate;

import jakarta.persistence.*;


@Entity
@Table(name = "lots")
public class Lot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate expiration;

    @Column(nullable = false)
    private Integer quantity;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "drug_id", nullable = false)
    private Drug drug;

    public Lot() {} // Empty constructor required by JPA

    public Lot(Number id, LocalDate expiration, Integer quantity, Drug drug) {
        this.id = id.longValue();
        this.expiration = expiration;
        this.quantity = quantity;
        this.drug = drug;
    }

    public Lot(LocalDate expiration, Integer quantity, Drug drug) {
        this.expiration = expiration;
        this.quantity = quantity;
        this.drug = drug;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getExpiration() {
        return expiration;
    }

    public void setExpiration(LocalDate expiration) {
        this.expiration = expiration;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Drug getDrug() {
        return drug;
    }

    public void setDrug(Drug drug) {
        this.drug = drug;
    }
}
