package com.example.flightplanner.service;

import com.example.flightplanner.model.Seat;
import com.example.flightplanner.repository.SeatRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
// This Service was coded with the help of AI, but i had to make many tweaks to make it work as its supposed to
@Service
public class RandomSeatGenerationService {

    private final SeatRepository seatRepository;

    public RandomSeatGenerationService(SeatRepository seatRepository) {
        this.seatRepository = seatRepository;
    }

    public void seedSeats() {
        int totalRows = 31;
        String[] seatLetters = {"A", "B", "C", "D", "E"};
        Random random = new Random();
        List<Seat> seatsToSave = new ArrayList<>();

        for (int row = 1; row <= totalRows; row++) {
            if (row == 13) continue;

            for (int col = 0; col < seatLetters.length; col++) {
                String letter = seatLetters[col];
                boolean isWindow = (letter.equals("A") || letter.equals("E"));
                boolean isAisle = (letter.equals("B") || letter.equals("C"));
                boolean isExitRow = (row == 14);
                boolean hasExtraLegRoom = (isExitRow || row == 1);
                boolean isNearExit = (isExitRow || row == 1 || row == 12 || row == 31);
                String seatNumber = row + letter;

                Seat seat = Seat.builder()
                        .rowIndex(row)
                        .columnIndex(col)
                        .seatNumber(seatNumber)
                        .isOccupied(random.nextBoolean())
                        .isWindow(isWindow)
                        .isAisle(isAisle)
                        .hasExtraLegRoom(hasExtraLegRoom)
                        .isExitRow(isExitRow)
                        .isNearExit(isNearExit)
                        .build();

                seatsToSave.add(seat);
            }
        }
        seatRepository.saveAll(seatsToSave);
    }
}
