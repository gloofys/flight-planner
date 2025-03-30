package com.example.flightplanner.service;

import com.example.flightplanner.model.Seat;
import com.example.flightplanner.repository.SeatRepository;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class SeatService {

    private final SeatRepository seatRepository;
    private final RandomSeatGenerationService seatGenerationService;

    public SeatService(SeatRepository seatRepository, RandomSeatGenerationService seatGenerationService) {
        this.seatRepository = seatRepository;
        this.seatGenerationService = seatGenerationService;
    }
    public void resetSeatPlan() {
        seatRepository.deleteAll();
        seatGenerationService.seedSeats();
    }

    public List<Seat> getAllSeats() {
        return seatRepository.findAll();
    }
    public List<Seat> getFilteredSeats(boolean wantWindow, boolean wantExtraLegroom, boolean wantNearExit) {
        return seatRepository.findAll().stream()
                .filter(seat -> !seat.isOccupied())
                .filter(seat -> !wantWindow || seat.isWindow())
                .filter(seat -> !wantExtraLegroom || seat.isHasExtraLegRoom())
                .filter(seat -> !wantNearExit || seat.isNearExit())
                .collect(Collectors.toList());
    }

}
