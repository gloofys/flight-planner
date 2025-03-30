package com.example.flightplanner.controller;

import com.example.flightplanner.model.Seat;
import com.example.flightplanner.service.SeatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/seats")
@CrossOrigin(origins = "http://localhost:5176")
public class SeatController {

    private final SeatService seatService;

    public SeatController(SeatService seatService) {
        this.seatService = seatService;
    }

    @GetMapping
    public List<Seat> getAllSeats() {
        return seatService.getAllSeats();
    }

    @GetMapping("/filter")
    public List<Seat> getFilteredSeats(
            @RequestParam(required = false, defaultValue = "false") boolean window,
            @RequestParam(required = false, defaultValue = "false") boolean extraLegroom,
            @RequestParam(required = false, defaultValue = "false") boolean nearExit
    ){
        return seatService.getFilteredSeats(window, extraLegroom, nearExit);
    }
    @PostMapping("/reset")
    public ResponseEntity<Void> resetSeatPlan() {
        seatService.resetSeatPlan();
        return ResponseEntity.ok().build();
    }

}
