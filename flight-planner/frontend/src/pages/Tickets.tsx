import { useLocation, useNavigate } from "react-router-dom";
import {useFlightFilters} from "../context/FlightFiltersContext.tsx";

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
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">
                Your Ticket{state.selectedSeats.length > 1 ? "s" : ""}
            </h2>

            <div className="space-y-4">
                {state.selectedSeats.map((seat) => (
                    <div
                        key={seat.id}
                        className="border p-4 rounded shadow-md bg-white relative"
                    >
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    Flight: {flight?.flightName} ({flight?.airline})
                                </h3>
                                <p className="text-gray-700">
                                    <strong>From:</strong> {flight?.from} → <strong>To:</strong> {flight?.destination}
                                </p>
                                <p className="text-gray-700">
                                    <strong>Date:</strong> {flight?.flightDate}{" "}
                                    <strong>Time:</strong> {flight?.flightTime}
                                </p>
                            </div>

                            <div className="mt-4 md:mt-0 text-right">
                                <p className="text-gray-700">
                                    <strong>Seat:</strong> {seat.seatNumber}
                                </p>
                                <p className="text-gray-700">
                                    <strong>Gate:</strong> F1
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-col md:flex-row md:justify-between">
                            <div>
                                <p className="text-gray-700">
                                    <strong>Duration:</strong> {flight?.duration} min
                                </p>
                            </div>
                            <div className="mt-2 md:mt-0 text-right">
                                <p className="text-gray-700">
                                    <strong>Price:</strong> ${flight?.price}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={handleBookNewFlight}
                className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
            >
                Book a New Flight
            </button>
        </div>
    );
};

export default Tickets;
