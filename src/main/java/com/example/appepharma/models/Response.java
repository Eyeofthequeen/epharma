package com.example.appepharma.models;

import jakarta.persistence.*;

@Entity
@Table(name = "responses")
public class Response {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private Boolean hasGeneric;

    @Column(nullable = false)
    private String availability;

    @Column(nullable = true)
    private Double price;

    @Column(nullable = true)
    private String comment;

    public Response() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isHasGeneric() {
        return hasGeneric;
    }

    public void setHasGeneric(boolean hasGeneric) {
        this.hasGeneric = hasGeneric;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
