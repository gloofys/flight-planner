package com.example.flightplanner.service;
import com.example.flightplanner.model.Flight;
import com.example.flightplanner.repository.FlightRepository;
import org.springframework.stereotype.Service;
import com.example.flightplanner.dto.FilterMetaDataDTO;

import java.util.List;
import java.util.Optional;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.IntSummaryStatistics;

@Service
public class FlightService {
    private final FlightRepository flightRepository;

    public FlightService(FlightRepository flightRepository){
        this.flightRepository = flightRepository;
    }

    public List<Flight> getAllFlights(){
        return flightRepository.findAll();
    }

    public List<Flight> getFilteredFlights(String from, String destination, LocalDate flightDate) {
        List<Flight> exactFlights = flightRepository.findAll().stream()
                .filter(f -> from == null || (f.getFrom() != null && f.getFrom().equalsIgnoreCase(from)))
                .filter(f -> destination == null || (f.getDestination() != null && f.getDestination().equalsIgnoreCase(destination)))
                .filter(f -> flightDate == null || (f.getFlightDate() != null && f.getFlightDate().equals(flightDate)))
                .toList();

        if (!exactFlights.isEmpty()) {
            return exactFlights;
        }


        return flightRepository.findAll().stream()
                .filter(f -> from == null || (f.getFrom() != null && f.getFrom().equalsIgnoreCase(from)))
                .filter(f -> destination == null || (f.getDestination() != null && f.getDestination().equalsIgnoreCase(destination)))
                .filter(f -> flightDate != null && f.getFlightDate() != null && f.getFlightDate().isAfter(flightDate))
                .sorted(Comparator.comparing(Flight::getFlightDate))
                .limit(1)
                .toList();
    }

    public Optional<Flight> getFlightById(Long id){
        return flightRepository.findById(id);
    }

    public FilterMetaDataDTO getFilterMetadata(String from, String destination, LocalDate flightDate) {
        List<Flight> filteredFlights = getFilteredFlights(from, destination, flightDate);

        System.out.println("Received filters - From: " + from + ", Destination: " + destination + ", FlightDate: " + flightDate);
        System.out.println("Filtered flights count: " + filteredFlights.size());

        if (filteredFlights.isEmpty()) {
            return new FilterMetaDataDTO(0, 0, 0, 0); // fallback
        }

        IntSummaryStatistics priceStats = filteredFlights.stream()
                .mapToInt(f -> (int) f.getPrice())
                .summaryStatistics();
        IntSummaryStatistics durationStats = filteredFlights.stream()
                .mapToInt(Flight::getDuration)
                .summaryStatistics();
        int maxLayovers = filteredFlights.stream()
                .mapToInt(Flight::getLayovers)
                .max()
                .orElse(0);

        return new FilterMetaDataDTO(
                priceStats.getMin(),
                priceStats.getMax(),
                durationStats.getMax(),
                maxLayovers
        );
    }
}
