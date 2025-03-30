package com.example.flightplanner.service;

import com.example.flightplanner.model.Seat;
import com.example.flightplanner.repository.SeatRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
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

    public List<Seat> findAdjacentSeats(int groupSize) {
        List<Seat> unoccupied = seatRepository.findAll().stream()
                .filter(seat -> !seat.isOccupied())
                .collect(Collectors.toList());

        Map<Integer, List<Seat>> seatsByRow = unoccupied.stream()
                .collect(Collectors.groupingBy(Seat::getRowIndex));

        for (Map.Entry<Integer, List<Seat>> entry : seatsByRow.entrySet()) {
            List<Seat> rowSeats = entry.getValue();
            rowSeats.sort(Comparator.comparingInt(Seat::getColumnIndex));

            for (int i = 0; i < rowSeats.size() - (groupSize - 1); i++) {
                boolean consecutive = true;
                for (int j = 0; j < groupSize - 1; j++) {
                    int currCol = rowSeats.get(i + j).getColumnIndex();
                    int nextCol = rowSeats.get(i + j + 1).getColumnIndex();
                    if (nextCol - currCol != 1) {
                        consecutive = false;
                        break;
                    }
                }
                if (consecutive) {
                    return rowSeats.subList(i, i + groupSize);
                }
            }
        }
        return Collections.emptyList();
    }

}
