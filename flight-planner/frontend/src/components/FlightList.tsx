import { useEffect, useState } from "react";
import { getFlightsMetadata, getFlights } from "../services/flightService.ts";
import FlightSearchBar from "./FlightSearchBar.tsx";
import { useFlightFilters } from "../context/FlightFiltersContext.tsx";
// import MobileFlightFilters from "./flightFilters/MobileFlightFilters.tsx";
import DesktopFlightFilters from "./flightFilters/DesktopFlightFilters.tsx";
import {Link} from "react-router-dom";

interface Flight {
    id: number;
    destination: string;
    from: string;
    flightTime: string;
    flightDate: string;
    duration: number;
    price: number;
    layovers: number;
    airline: string;
    flightName: string;
}

const FlightList = () => {
    const { filters, setUiFilters } = useFlightFilters();
    const [baseFlights, setBaseFlights] = useState<Flight[]>([]);
    const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState(true);
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(1000);

    useEffect(() => {
        getFlightsMetadata()
            .then((meta) => {
                setPriceMin(meta.minPrice);
                setPriceMax(meta.maxPrice);
                setUiFilters({
                    priceRange: [meta.minPrice, meta.maxPrice],
                    flightDuration: meta.maxDuration ?? 600,
                    layovers: meta.maxLayovers ?? 2,
                    flightTime: "Any",
                });
            })
    }, []);

    // Fetch base flights (search results)
    useEffect(() => {
        setLoading(true);
        getFlights(filters.search)
            .then((data) => {
                console.log("Base Flights from backend:", data);
                setBaseFlights(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch base flights", err);
                setLoading(false);
            });
    }, [filters.search]);

    useEffect(() => {
        const { priceRange, flightDuration, layovers, flightTime } = filters.ui;

        const result = baseFlights.filter((flight) => {
            const time = flight.flightTime.slice(0, 5);

            const inPriceRange = flight.price >= priceRange[0] && flight.price <= priceRange[1];
            const withinDuration = flight.duration <= flightDuration;
            const withinLayovers = flight.layovers <= layovers;

            const matchesTime =
                flightTime === "Any" ||
                (flightTime === "Morning" && time < "12:00") ||
                (flightTime === "Afternoon" && time >= "12:00" && time < "17:00") ||
                (flightTime === "Evening" && time >= "17:00");

            return inPriceRange && withinDuration && withinLayovers && matchesTime;
        });

        setFilteredFlights(result);
    }, [filters.ui, baseFlights]);


    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="w-full bg-white shadow-md p-4 sticky top-0 z-50">
                <FlightSearchBar />
            </header>

            {/* Main content layout */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="hidden md:block w-64 bg-gray-50 border-r p-4">
                    <DesktopFlightFilters priceMin={priceMin} priceMax={priceMax} />
                </aside>

                {/* Flights list */}
                <main className="flex-1 p-6">
                    {loading ? (
                        <p>Loading Flights...</p>
                    ) : filteredFlights.length > 0 ? (
                        <ul className="mt-4">
                            {filteredFlights.map((flight) => (
                                <li key={flight.id} className="border p-2 mb-2 rounded hover:bg-gray-100">
                                    <Link to={`/flights/${flight.id}`} className="block">
                                        ✈️ {flight.from} → {flight.destination} ({flight.flightDate}) – ${flight.price}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No flights found.</p>
                    )}
                </main>
            </div>
        </div>
    );
};

export default FlightList;