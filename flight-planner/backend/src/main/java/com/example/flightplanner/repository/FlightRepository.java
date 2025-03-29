package com.example.flightplanner.repository;

import com.example.flightplanner.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {

    @Query("SELECT DISTINCT f.from FROM Flight f")
    List<String> findDistinctAirports();

    @Query("SELECT DISTINCT f.destination FROM Flight f")
    List<String> findDistinctDestinations();

    @Query("SELECT DISTINCT f.destination FROM Flight f WHERE LOWER(f.from) = LOWER(:from)")
    List<String> findDestinationsByFrom(@Param("from") String from);

}
