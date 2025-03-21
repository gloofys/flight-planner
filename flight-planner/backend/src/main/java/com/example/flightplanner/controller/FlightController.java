package com.example.flightplanner.controller;
import com.example.flightplanner.model.Flight;
import com.example.flightplanner.service.FlightService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.List;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin(origins = "http://localhost:5175")
public class FlightController {


    private final FlightService flightService;


    public FlightController(FlightService flightService){
    this.flightService = flightService;
    }

    @GetMapping
    public ResponseEntity<List<Flight>> getFilteredFlights(
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String destination,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate flightDate) {

        if (from == null && destination == null && flightDate == null) {
            return ResponseEntity.badRequest().build();
        }

        List<Flight> flights = flightService.getFilteredFlights(from, destination, flightDate);
        return ResponseEntity.ok(flights);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Flight> getFlightById(@PathVariable Long id){
        return flightService.getFlightById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
