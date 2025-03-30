package com.example.flightplanner.model;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;

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

    @Column(name = "departure_city")
    private String from;

    private String destination;

    @Column(name = "flight_date")
    private LocalDate flightDate;

    @Column(name = "flight_time")
    private LocalTime flightTime;

    private int duration;

    private double price;

    private int layovers;

    private String airline;

    private String flightName;
}
