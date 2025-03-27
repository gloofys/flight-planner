package com.example.flightplanner.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int rowIndex;
    private int columnIndex;
    private String seatNumber;
    private boolean isOccupied;
    private boolean isWindow;
    private boolean isAisle;
    private boolean hasExtraLegRoom;
    private boolean isExitRow;
    private boolean isNearExit;
}
