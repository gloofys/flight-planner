import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

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
    const {id} = useParams();
    const navigate = useNavigate();
    const [flight, setFlight] = useState<Flight | null>(null);
    const [loading, setLoading] = useState(true);

    const handleChooseSeats = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/seats/reset", {
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
        fetch(`http://localhost:8080/api/flights/${id}`)
            .then(res => res.json())
            .then(setFlight)
            .catch(err => console.error("Failed to fetch flight", err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p className="p-4">Loading flight details...</p>;
    if (!flight) return <p className="p-4">Flight not found.</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-ebb px-4 py-8">
            <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl bg-white shadow-md rounded p-6">
                <h2 className="text-2xl font-bold mb-4">Flight Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-gray-800 text-base md:text-lg">
                    <div className="space-y-2">
                        <p><strong>From:</strong> {flight.from}</p>
                        <p><strong>To:</strong> {flight.destination}</p>
                        <p><strong>Date:</strong> {flight.flightDate}</p>
                        <p><strong>Time:</strong> {flight.flightTime}</p>
                    </div>
                    <div className="space-y-2">
                        <p><strong>Duration:</strong> {flight.duration}</p>
                        <p><strong>Layovers:</strong> {flight.layovers}</p>
                        <p><strong>Airline:</strong> {flight.airline}</p>
                        <p><strong>Flight:</strong> {flight.flightName}</p>
                    </div>
                </div>

                <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-2xl md:text-3xl font-bold text-royal-blue">
                        €{flight.price.toFixed(2)}
                        <span className="text-sm md:text-base text-gray-500 font-normal">(per person)</span>
                    </p>

                    <div className="flex gap-4">
                        <button
                            onClick={handleChooseSeats}
                            className="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
                        >
                            Choose Seats
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="px-6 py-2 bg-gray-200 text-gray-800 rounded shadow hover:bg-gray-300 transition"
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlightDetails;
