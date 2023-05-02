package com.example.appepharma.converters;

import java.io.IOException;

import com.example.appepharma.models.Address;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class AddressConverter implements AttributeConverter<Address, String> {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Address address) {
        if (address == null) {
            return null;
        }

        try {
            return objectMapper.writeValueAsString(address);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error serializing address to json: " + e.getMessage());
        }
    }

    @Override
    public Address convertToEntityAttribute(String json) {
        if (json == null || json.trim().isEmpty()) {
            return null;
        }

        try {
            return objectMapper.readValue(json, Address.class);
        } catch (IOException e) {
            throw new RuntimeException("Error deserializing address from json: " + e.getMessage());
        }
    }
    
}
