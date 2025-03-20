package com.example.flightplanner.model;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "flights")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String departure;

    private String destination;

    @Column(name = "flight_time")
    private LocalDateTime flightTime;

    private int duration;

    private double price;

    private int layovers;

    private String airline;

    private String flightName;
}
