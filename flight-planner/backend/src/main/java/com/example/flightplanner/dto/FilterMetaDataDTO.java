package com.example.flightplanner.dto;

import lombok.Data;

@Data
public class FilterMetaDataDTO {
    private int minPrice;
    private int maxPrice;
    private int maxDuration;
    private int maxLayovers;

    public FilterMetaDataDTO(int minPrice, int maxPrice, int maxDuration, int maxLayovers) {
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.maxDuration = maxDuration;
        this.maxLayovers = maxLayovers;
    }
}
