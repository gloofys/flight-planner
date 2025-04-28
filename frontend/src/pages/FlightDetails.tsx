import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {formatDate, formatTime} from "../utils/dateTimeUtils.tsx"
import {formatDuration} from "../utils/timeUtils.ts";

const API_URL = import.meta.env.VITE_API_URL;

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

const FlightDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [flight, setFlight] = useState<Flight | null>(null);
    const [loading, setLoading] = useState(true);

    const handleChooseSeats = async () => {
        try {
            const res = await fetch(`${API_URL}/api/seats/reset`, {
                method: "POST",
            });
            if (!res.ok) {
                console.error("Failed to reset seat plan");
                return;
            }
            navigate(`/flights/${id}/seats`, {state: {flight}});
        } catch (error) {
            console.error("Error resetting seat plan:", error);
        }
    };

    useEffect(() => {
        fetch(`${API_URL}/api/flights/${id}`)
            .then(res => res.json())
            .then(setFlight)
            .catch(err => console.error("Failed to fetch flight", err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p className="p-4">Loading flight details...</p>;
    if (!flight) return <p className="p-4">Flight not found.</p>;

    return (
        <div className="min-h-screen bg-ebb px-4 py-10">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white p-6 rounded shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Flight Information</h2>
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-gray-800 text-base md:text-lg">
                        <div className="space-y-2">
                            <p><strong>From:</strong> {flight.from}</p>
                            <p><strong>To:</strong> {flight.destination}</p>
                            <p><strong>Date:</strong> {formatDate(flight.flightDate)}</p>
                            <p><strong>Time:</strong> {formatTime(flight.flightTime)}</p>
                        </div>
                        <div className="space-y-2">
                            <p><strong>Duration:</strong> {formatDuration(flight.duration)}</p>

                            <p><strong>Airline:</strong> {flight.airline}</p>
                            <p><strong>Flight:</strong> {flight.flightName}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded shadow-md">
                    <p className="text-2xl md:text-3xl font-bold text-royal-blue">
                        €{flight.price.toFixed(2)}
                        <span className="text-sm md:text-base text-gray-500 font-normal ml-2">(per person)</span>
                    </p>
                    <div className="mt-4 md:mt-0 flex gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="px-6 py-2 bg-gray-200 text-gray-800 rounded shadow hover:bg-gray-300 transition cursor-pointer"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleChooseSeats}
                            className="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition cursor-pointer"
                        >
                            Choose Seats
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlightDetails;
