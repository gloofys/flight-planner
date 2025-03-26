package com.example.flightplanner.dto;

import lombok.Data;

import java.util.List;

@Data
public class FilterMetaDataDTO {
    private int minPrice;
    private int maxPrice;
    private int minDuration;
    private int maxDuration;
    private int minLayovers;
    private int maxLayovers;
    private List<String> timeBuckets;

    public FilterMetaDataDTO(int minPrice, int maxPrice, int minDuration, int maxDuration, int minLayovers, int maxLayovers, List<String> timeBuckets) {
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.minDuration = minDuration;
        this.maxDuration = maxDuration;
        this.minLayovers = minLayovers;
        this.maxLayovers = maxLayovers;
        this.timeBuckets = timeBuckets;
    }

    // Getters and setters (or use Lombok @Data if preferred)
}
