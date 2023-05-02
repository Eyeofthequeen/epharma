package com.example.appepharma.models;

import com.example.appepharma.converters.AddressConverter;

import jakarta.persistence.*;

@Entity
@Table(name = "pharmacies")
public class Pharmacy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String telephon;

    @Column(nullable = false, columnDefinition = "text")
    @Convert(converter = AddressConverter.class)
    private Address address;

    public Pharmacy(String name, String email, String telephon, Address address) {
        this.name = name;
        this.email = email;
        this.telephon = telephon;
        this.address = address;
    }

    public Pharmacy() {}
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephon() {
        return telephon;
    }

    public void setTelephon(String telephon) {
        this.telephon = telephon;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
