package com.example.flightplanner.controller;
import com.example.flightplanner.model.Flight;
import com.example.flightplanner.service.FlightService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin(origins = "http://localhost:5173")
public class FlightController {


    private final FlightService flightService;


    public FlightController(FlightService flightService){
    this.flightService = flightService;
    }

    @GetMapping
    public ResponseEntity<List<Flight>> getAllFlights(){
    return ResponseEntity.ok(flightService.getAllFlights());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Flight> getFlightById(@PathVariable Long id){
        return flightService.getFlightById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
