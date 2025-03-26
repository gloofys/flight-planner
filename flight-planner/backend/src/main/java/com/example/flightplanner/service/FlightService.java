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
import java.util.stream.Stream;

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

    public FilterMetaDataDTO getFilterMetadata(List<Flight> flights) {
        IntSummaryStatistics priceStats = flights.stream()
                .mapToInt(f -> (int) f.getPrice())
                .summaryStatistics();

        IntSummaryStatistics durationStats = flights.stream()
                .mapToInt(Flight::getDuration)
                .summaryStatistics();

        IntSummaryStatistics layoverStats = flights.stream()
                .mapToInt(Flight::getLayovers)
                .summaryStatistics();

        List<String> timeBuckets = Stream.of("Morning", "Afternoon", "Evening")
                .filter(bucket -> flights.stream().anyMatch(f -> {
                    int hour = f.getFlightTime().getHour();
                    return (bucket.equals("Morning") && hour < 12) ||
                            (bucket.equals("Afternoon") && hour >= 12 && hour < 17) ||
                            (bucket.equals("Evening") && hour >= 17);
                }))
                .toList();

        return new FilterMetaDataDTO(
                priceStats.getMin(),
                priceStats.getMax(),
                durationStats.getMin(),
                durationStats.getMax(),
                layoverStats.getMin(),
                layoverStats.getMax(),
                timeBuckets
        );
    }
}
