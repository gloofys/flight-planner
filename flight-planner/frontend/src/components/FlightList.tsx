import { useEffect, useState} from "react";
import {getFlights} from "../services/flightService.ts";
import FlightSearchBar from "./FlightSearchBar.tsx";

interface Flight {
    id: number;
    destination: string;
    from: string;
    flightTime: string;
    flightDate: string;
    flightDuration: string;
    price: number;
    layovers: number;
    airline: string;
    flightName: string;
}

const FlightList = () =>{
    const [flights, setFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<Record<string, any>>({});

    useEffect(() => {
        getFlights(filters)
            .then(setFlights)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [filters]);

    useEffect(() => {
        getFlights()
            .then(data => setFlights(data))
            .catch(err => console.error("Failed to fetch initial flights", err));
    }, []);

    if(loading) return <p>Loading Flights...</p>;

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Search Flights</h2>
            <FlightSearchBar onSearch={setFilters}/>
            {loading ? (
                <p>Loading flights...</p>
            ) : flights.length > 0 ? (
                <ul className="mt-4">
                    {flights.map((flight) => (
                        <li key={flight.id} className="border p-2 mb-2">
                            ✈️ {flight.from} → {flight.destination}
                            ({flight.flightDate}) - ${flight.price}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No flights found.</p>
            )}
        </div>
    )
}

export default FlightList;