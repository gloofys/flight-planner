import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface Flight {
    id: number;
    destination: string;
    from: string;
    flightTime: string;
    flightDate: string;
    duration: string;
    price: number;
    layovers: number;
    airline: string;
    flightName: string;
}

const FlightDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [flight, setFlight] = useState<Flight | null>(null);
    const [loading, setLoading] = useState(true);

    const handleChooseSeats = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/seats/reset", {
                method: "POST",
            });
            if (!res.ok) {
                throw new Error("Failed to reset seat plan");
            }
            navigate(`/flights/${id}/seats`);
        } catch (error) {
            console.error("Error resetting seat plan:", error);
        }
    };

    useEffect(() => {
        fetch(`http://localhost:8080/api/flights/${id}`)
            .then(res => res.json())
            .then(setFlight)
            .catch(err => console.error("Failed to fetch flight", err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p className="p-4">Loading flight details...</p>;
    if (!flight) return <p className="p-4">Flight not found.</p>;

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
            <h2 className="text-2xl font-bold mb-4">Flight Details</h2>
            <p><strong>From:</strong> {flight.from}</p>
            <p><strong>To:</strong> {flight.destination}</p>
            <p><strong>Date:</strong> {flight.flightDate}</p>
            <p><strong>Time:</strong> {flight.flightTime}</p>
            <p><strong>Duration:</strong> {flight.duration}</p>
            <p><strong>Layovers:</strong> {flight.layovers}</p>
            <p><strong>Airline:</strong> {flight.airline}</p>
            <p><strong>Flight:</strong> {flight.flightName}</p>
            <p><strong>Price:</strong> ${flight.price}</p>

            <div className="mt-6 flex gap-4">
                <button
                    onClick={handleChooseSeats}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Choose Seats
                </button>
                <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default FlightDetails;
