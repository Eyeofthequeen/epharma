package com.example.appepharma.dtos;

import java.time.LocalDate;

import com.example.appepharma.models.Drug;
import com.example.appepharma.models.Response;
import com.example.appepharma.models.User;

public class DrugRequestAdminDto {
    private Number id;
    private Drug drug;
    private LocalDate date;
    private Number quantity;
    private Response response;
    private UserDto client;

    public DrugRequestAdminDto() {}

    public DrugRequestAdminDto(Number id, Drug drug, LocalDate date, Number quantity, Response response, User user) {
        this.id = id;
        this.drug = drug;
        this.date = date;
        this.quantity = quantity;
        this.response = response;
        this.client = new UserDto(user.getEmail(), user.getTelephon(), user.getFirstName(), user.getLastName());
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

    public Response getResponse() {
        return response;
    }

    public void setResponse(Response response) {
        this.response = response;
    }

    public UserDto getClient() {
        return client;
    }

    public void setClient(UserDto user) {
        this.client = user;
    }

    public static class UserDto {
        private String email;
        private String telephon;
        private String firstName;
        private String lastName;

        public UserDto(String email, String telephon, String firstName, String lastName) {
            this.email = email;
            this.telephon = telephon;
            this.firstName = firstName;
            this.lastName = lastName;
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
    }

    public Number getId() {
        return id;
    }

    public void setId(Number id) {
        this.id = id;
    }
}
