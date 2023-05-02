package com.example.appepharma.converters;

import java.io.IOException;

import com.example.appepharma.models.Pharmacy;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class PharmacyConverter implements AttributeConverter<Pharmacy, String> {
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    @Override
    public String convertToDatabaseColumn(Pharmacy pharmacy) {
        if (pharmacy == null) { return null; }

        try {
            return objectMapper.writeValueAsString(pharmacy);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error serializing address to json: " + e.getMessage());
        }
    }

    @Override
    public Pharmacy convertToEntityAttribute(String json) {
        if (json == null || json.trim().isEmpty()) {
            return null;
        }

        try {
            return objectMapper.readValue(json, Pharmacy.class);
        } catch (IOException e) {
            throw new RuntimeException("Error deserializing address from json: " + e.getMessage());
        }
    }
}
