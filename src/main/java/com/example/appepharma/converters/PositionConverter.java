package com.example.appepharma.converters;

import java.io.IOException;

import com.example.appepharma.models.Position;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.Converter;
import jakarta.persistence.AttributeConverter;

@Converter
public class PositionConverter implements AttributeConverter<Position, String> {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Position position) {
        if (position == null) {
            return null;
        }

        try {
            return objectMapper.writeValueAsString(position);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error serializing address to json: " + e.getMessage());
        }
    }

    @Override
    public Position convertToEntityAttribute(String json) {
        if (json == null || json.trim().isEmpty()) {
            return null;
        }

        try {
            return objectMapper.readValue(json, Position.class);
        } catch (IOException e) {
            throw new RuntimeException("Error deserializing address from json: " + e.getMessage());
        }
    }
}
