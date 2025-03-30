import {useEffect, useState} from "react";
import {getFlightsMetadata, getFlights} from "../services/flightService.ts";
import FlightSearchBar from "../components/searchbar/FlightSearchBar.tsx";
import {useFlightFilters} from "../context/FlightFiltersContext.tsx";
import DesktopFlightFilters from "../components/flightFilters/DesktopFlightFilters.tsx";
import {Link} from "react-router-dom";
import MobileFlightFilters from "../components/flightFilters/MobileFlightFilters.tsx";
import FlightIcon from '@mui/icons-material/Flight';
import { formatDate, formatTime} from"../utils/dateTimeUtils.tsx"

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
    const {filters, setUiFilters} = useFlightFilters();
    const [baseFlights, setBaseFlights] = useState<Flight[]>([]);
    const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState(true);
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(1000);
    const [durationMax, setDurationMax] = useState(600);
    const [layoversMax, setLayoversMax] = useState(2);
    const [displayCount, setDisplayCount] = useState(5);

    useEffect(() => {
        getFlightsMetadata(filters.search)
            .then((meta) => {
                let adjustedMin = meta.minPrice;
                let adjustedMax = meta.maxPrice;
                if (meta.minPrice === meta.maxPrice) {
                    adjustedMax = meta.maxPrice + 1;
                }
                setPriceMin(adjustedMin);
                setPriceMax(adjustedMax);
                setUiFilters((prev) => ({
                    ...prev,
                    priceRange: [adjustedMin, adjustedMax],
                    flightDuration: meta.maxDuration || prev.flightDuration,
                    layovers: 2,
                }));
                if (meta.maxDuration) setDurationMax(meta.maxDuration);
                if (meta.maxLayovers) setLayoversMax(meta.maxLayovers);
            })
            .catch(console.error);
    }, [filters.search]);


    useEffect(() => {
        setLoading(true);
        getFlights(filters.search)
            .then((data) => {
                console.log("Base Flights from backend:", data);
                setBaseFlights(data);
                setLoading(false);
                setDisplayCount(5);

            })
            .catch((err) => {
                console.error("Failed to fetch base flights", err);
                setLoading(false);
            });
    }, [filters.search]);

    const flightsToDisplay = filteredFlights.slice(0, displayCount);

    const exactDateMatches = filters.search.flightDate
        ? filteredFlights.filter(
            (flight) => flight.flightDate === filters.search.flightDate
        )
        : [];

    useEffect(() => {
        const {priceRange, flightDuration, layovers, flightTime} = filters.ui;

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
        <div className="flex flex-col min-h-screen bg-ebb">
            <header className="w-full bg-ebb shadow-md p-4 z-50">
                <FlightSearchBar/>
            </header>
            <MobileFlightFilters/>
            <div className="flex flex-1">

                <aside className="hidden md:block w-64 bg-ebb shadow-md p-4">
                    <DesktopFlightFilters priceMin={priceMin} priceMax={priceMax} durationMax={durationMax}
                                          layoversMax={layoversMax}/>
                </aside>
                <main className="flex-1 p-6 2xl:mx-30">
                    {loading ? (
                        <p>Loading Flights...</p>
                    ) : filteredFlights.length > 0 ? (
                        <>
                            {filters.search.flightDate && exactDateMatches.length === 0 && (
                                <p className="mb-4 text-xl 2xl:text-2xl xl:text-xl text-gray-600">
                                    No flights available on {formatDate(filters.search.flightDate)}.  Displaying  flights departing after your selected date.
                                </p>
                            )}
                            <ul className="mt-4">
                                {flightsToDisplay.map((flight) => (
                                    <li
                                        key={flight.id}
                                        className="p-4 mb-3 rounded shadow-md bg-white hover:bg-gray-300 transition"
                                    >
                                        <Link to={`/flights/${flight.id}`} className="block text-sm">
                                            <div className="font-semibold text-lg">
                                                <FlightIcon/> {flight.from} → {flight.destination}
                                            </div>
                                            <div className="text-gray-600">
                                                {formatDate(flight.flightDate)} at {formatTime(flight.flightTime)}
                                            </div>
                                            <div className="text-gray-700 font-medium mt-1">
                                                €{flight.price.toFixed(2)}
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            {filteredFlights.length > displayCount && (
                                <div className="text-center mt-4">
                                    <button
                                        onClick={() => setDisplayCount(displayCount + 5)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-100 hover:text-black"
                                    >
                                        Load More Flights
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <p>No flights found.</p>
                    )}
                </main>
            </div>
        </div>
    );
};

export default FlightList;