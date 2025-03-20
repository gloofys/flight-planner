import { useEffect, useState} from "react";
import {getFlights} from "../services/flightService.ts";

interface Flight {
    id: number;
    destination: string;
    departure: string;
    flightTime: string;
    flightDuration: string;
    price: number;
    layovers: number;
    airline: string;
    flightName: string;
}

const FlightList = () =>{
    const [flights, setFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getFlights()
            .then(setFlights)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if(loading) return <p>Loading Flights...</p>;

    return (
        <div>
            <h2>Available Flights</h2>
            <ul>
                {flights.map((flight) =>(
                    <li key={flight.id}>
                        {flight.flightName}: {flight.destination} - {flight.layovers} + {flight.flightTime}
                        ({flight.departure}) - {flight.price} - {flight.flightTime} + {flight.airline}
                    </li>
                    )
                )}
            </ul>
        </div>
    )
}

export default FlightList;