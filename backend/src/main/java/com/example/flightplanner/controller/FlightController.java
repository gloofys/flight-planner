package com.example.flightplanner.controller;

import com.example.flightplanner.model.Flight;
import com.example.flightplanner.repository.FlightRepository;
import com.example.flightplanner.service.FlightService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.flightplanner.dto.FilterMetaDataDTO;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/flights")
@CrossOrigin(origins = "http://localhost:5176")
public class FlightController {

    private final FlightService flightService;
    private final FlightRepository flightRepository;

    public FlightController(FlightService flightService, FlightRepository flightRepository) {
        this.flightService = flightService;
        this.flightRepository = flightRepository;
    }

    @GetMapping
    public ResponseEntity<List<Flight>> getFilteredFlights(
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String destination,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate flightDate
    ) {
        if (from == null && destination == null && flightDate == null) {
            return ResponseEntity.ok(flightService.getAllFlights());
        }
        return ResponseEntity.ok(flightService.getFilteredFlights(from, destination, flightDate));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Flight> getFlightById(@PathVariable Long id) {
        return flightService.getFlightById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/options")
    public Map<String, List<String>> getFlightOptions() {
        Map<String, List<String>> options = new HashMap<>();
        options.put("from", flightRepository.findDistinctAirports());
        options.put("to", flightRepository.findDistinctDestinations());
        return options;
    }
    @GetMapping("/destinations")
    public Map<String, List<String>> getDestinations(@RequestParam String from) {
        List<String> destinations = flightRepository.findDestinationsByFrom(from);
        return Collections.singletonMap("to", destinations);
    }

    @GetMapping("/metadata")
    public ResponseEntity<FilterMetaDataDTO> getFlightMetadata(
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String destination,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate flightDate) {

        FilterMetaDataDTO meta = flightService.getFilterMetadata(from, destination, flightDate);
        return ResponseEntity.ok(meta);
    }
}
