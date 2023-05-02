package com.example.appepharma.models;


import java.util.*;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.appepharma.converters.AddressConverter;
import com.example.appepharma.converters.PositionConverter;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User implements UserDetails {
    public enum UserType {
        Pharmacist,
        Client,
        Employee
    }

    public enum Professional {
        Pharmacist,
        LabTech,
        Nurse,
        None
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = true)
    private String[] roles;

    @Column(nullable = false)
    private String type;

    @Column(nullable = true)
    private String professional;

    @Column(nullable = true, columnDefinition = "text")
    @Convert(converter = AddressConverter.class)
    private Address address;

    @ManyToOne(fetch = FetchType.EAGER, optional = true, cascade = CascadeType.ALL)
    @JoinColumn(name = "pharmacy_id", nullable = true)
    private Pharmacy pharmacy;

    @Column(nullable = true, columnDefinition = "text")
    @Convert(converter = PositionConverter.class)
    private Position position;

    @Column(nullable = true)
    private String firstName;

    @Column(nullable = true)
    private String lastName;

    @Column(nullable = true)
    private String telephon;

    @Column(nullable = true)
    private Integer maximumDistance;

    public User() {} // Empty constructor required by JPA

    public User(String username, String password, String email, Integer type, Position position) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.type = UserType.values()[type].toString();
        this.position = position;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getType() {
        return type;
    }

    public void setType(UserType type) {
        this.type = type.toString();
    }

    public String getProfessional() {
        return this.professional;
    }

    public void setProfessional(Professional professional) {
        this.professional = professional.toString();
    }

    public String[] getRoles() {
        return roles;
    }

    public void setRoles(String[] roles) {
        this.roles = roles;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.stream(this.roles)
                     .map(SimpleGrantedAuthority:: new)
                     .collect(Collectors.toList());
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public void setProfessional(String professional) {
        this.professional = professional;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getTelephon() {
        return telephon;
    }

    public void setTelephon(String telephon) {
        this.telephon = telephon;
    }

    public Pharmacy getPharmacy() {
        return pharmacy;
    }

    public void setPharmacy(Pharmacy pharmacy) {
        this.pharmacy = pharmacy;
    }

    public Number getMaximumDistance() {
        return maximumDistance;
    }

    public void setMaximumDistance(Integer maximumDistance) {
        this.maximumDistance = maximumDistance;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public boolean isAdminOrUserAdmin() {
        for (String role : this.roles) {
            if (role.equals("Administration") || role.equals("UserAdmin")) {
                return true;
            }
        }
        return false;
    }
}

