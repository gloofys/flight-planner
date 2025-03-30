package com.example.flightplanner.config;

import com.example.flightplanner.model.Flight;
import com.example.flightplanner.repository.FlightRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Random;

@Component
public class FlightDataGenerator implements ApplicationRunner {

    private final FlightRepository flightRepository;
    private final Random random = new Random();

    private final String[] departureCities = {"Tallinn", "Paris", "Berlin", "London", "Rome", "Madrid", "Amsterdam", "Prague"};
    private final String[] destinations = {"New York", "Dubai", "Tokyo", "Sydney", "Moscow", "Istanbul", "Toronto", "Beijing"};
    private final String[] airlines = {"Air Baltic", "Air France", "Lufthansa", "British Airways", "Finnair", "Czech Airlines"};
    private final String[] flightCodes = {"AB", "AF", "LH", "BA", "AZ", "IB", "KL", "OK"};

//    This FlightDataGenerator was written with help from AI

    public FlightDataGenerator(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (flightRepository.count() == 0) {
            seedFlights();
        }
    }

    private void seedFlights() {
        int numberOfFlights = 100;
        for (int i = 0; i < numberOfFlights; i++) {

            String from = departureCities[random.nextInt(departureCities.length)];
            String destination;
            do {
                destination = destinations[random.nextInt(destinations.length)];
            } while (destination.equalsIgnoreCase(from));

            LocalDate flightDate = LocalDate.now().plusDays(random.nextInt(30) + 1);

            int hour = random.nextInt(19) + 5;
            int minute = (random.nextInt(4)) * 15;
            LocalTime flightTime = LocalTime.of(hour, minute);

            int duration = random.nextInt(541) + 60;

            double price = (random.nextDouble() * 950) + 50;
            price = Math.round(price);

            int layovers = random.nextInt(3);

            String airline = airlines[random.nextInt(airlines.length)];
            String flightCode = flightCodes[random.nextInt(flightCodes.length)];
            int flightNumber = random.nextInt(900) + 100;
            String flightName = flightCode + flightNumber;

            Flight flight = Flight.builder()
                    .from(from)
                    .destination(destination)
                    .flightDate(flightDate)
                    .flightTime(flightTime)
                    .duration(duration)
                    .price(price)
                    .layovers(layovers)
                    .airline(airline)
                    .flightName(flightName)
                    .build();

            flightRepository.save(flight);
        }
    }
}