import { useLocation, useNavigate } from "react-router-dom";
import {useFlightFilters} from "../context/FlightFiltersContext.tsx";
import {formatDate, formatTime} from "../utils/dateTimeUtils.tsx";
import {formatDuration} from "../utils/timeUtils.ts";

interface Seat {
    id: number;
    seatNumber: string;
}

interface Flight {
    id: number;
    from: string;
    destination: string;
    flightDate: string;
    flightTime: string;
    airline: string;
    flightName: string;
    duration: number;
    price: number;
    layovers: number;
}

interface TicketState {
    selectedSeats: Seat[];
    flight?: Flight;
}

const Tickets = () => {
    const { resetFilters } = useFlightFilters();
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as TicketState | undefined;
    const flight = state?.flight;

    const handleBookNewFlight = () => {
        resetFilters()
        navigate("/")
    }

    if (!state || !state.selectedSeats || state.selectedSeats.length === 0) {
        return (
            <div className="max-w-3xl mx-auto p-6">
                <p>No ticket information available. Please book a flight.</p>
                <button
                    onClick={() => navigate("/")}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Book a New Flight
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-ebb px-4 py-8">
            <div className="w-full max-w-3xl bg-white rounded shadow-md p-4 md:p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Your Ticket{state.selectedSeats.length > 1 ? "s" : ""}
                </h2>

                <div className="space-y-4">
                    {state.selectedSeats.map((seat) => (
                        <div
                            key={seat.id}
                            className="border p-4 rounded shadow bg-gray-100 relative"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        Flight: {flight?.flightName} ({flight?.airline})
                                    </h3>
                                </div>

                                <div>
                                    <p className="text-gray-700">
                                        <strong>From:</strong> {flight?.from} → <strong>To:</strong> {flight?.destination}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Date:</strong> {formatDate(flight?.flightDate)}{" "}
                                        <strong>Time:</strong> {formatTime(flight?.flightTime)}
                                    </p>
                                </div>

                                <div className="text-left md:text-right">
                                    <p className="text-gray-700">
                                        <strong>Seat:</strong> {seat.seatNumber}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Gate:</strong> F1
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-col md:flex-row md:justify-between md:items-center">
                                <p className="text-gray-700">
                                    <strong>Duration:</strong> {formatDuration(flight?.duration)}
                                </p>
                                <p className="text-gray-900 text-lg font-semibold mt-2 md:mt-0">
                                    €{flight?.price.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleBookNewFlight}
                        className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition cursor-pointer"
                    >
                        Book a New Flight
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Tickets;
