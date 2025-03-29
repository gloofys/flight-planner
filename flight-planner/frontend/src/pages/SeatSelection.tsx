import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SeatRow from "../components/seats/SeatRow";
import DesktopSeatFilters from "../components/seatFilters/DesktopSeatFilters";
import MobileSeatFilters from "../components/seatFilters/MobileSeatFilters";
import { SeatFiltersProvider } from "../context/SeatFiltersContext";
import { useFlightFilters } from "../context/FlightFiltersContext";

interface Seat {
    id: number;
    rowIndex: number;
    columnIndex: number;
    seatNumber: string;
    occupied: boolean;
    hasExtraLegRoom: boolean;
    window: boolean;
    aisle: boolean;
    exitRow: boolean;
    nearExit: boolean;
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

const SeatSelectionContent = () => {
    const { state } = useLocation() as { state: { flight: Flight } };
    const flightInfo = state?.flight;

    const [seats, setSeats] = useState<Seat[]>([]);
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
    const navigate = useNavigate();
    const { filters } = useFlightFilters();

    useEffect(() => {
        fetch("http://localhost:8080/api/seats")
            .then((res) => res.json())
            .then(setSeats)
            .catch((err) => console.error("Failed to fetch seats", err));
    }, []);

    const seatsByRow = seats.reduce((acc: Record<number, Seat[]>, seat) => {
        acc[seat.rowIndex] = acc[seat.rowIndex] || [];
        acc[seat.rowIndex].push(seat);
        return acc;
    }, {});

    const sortedRows = Object.keys(seatsByRow)
        .map(Number)
        .sort((a, b) => a - b);

    const handleSelect = (seat: Seat) => {
        setSelectedSeats((prev) => {
            if (prev.find((s) => s.id === seat.id)) {
                return prev.filter((s) => s.id !== seat.id);
            } else {
                return [...prev, seat];
            }
        });
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Select Your Seat</h2>
            <p className="mb-4 text-sm text-gray-600">
                Please select exactly {filters.search.passengers || 1} seat
                {(filters.search.passengers || 1) > 1 ? "s" : ""}.
            </p>
            <div className="space-y-3">
                {sortedRows.map((row) => (
                    <SeatRow
                        key={row}
                        row={row}
                        seats={seatsByRow[row]}
                        selectedSeatIds={selectedSeats.map((s) => s.id)}
                        onSelect={(seat) => handleSelect(seat)}
                    />
                ))}
            </div>
            <div className="mt-6">
                <button
                    disabled={selectedSeats.length !== (filters.search.passengers || 1)}
                    onClick={() => {
                        if (flightInfo) {
                            navigate(`/ticket/${flightInfo.id}`, {state: {selectedSeats, flight: flightInfo}});
                        } else {
                            navigate("/ticket");
                        }
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Confirm Seat
                </button>
                <button
                    onClick={() => navigate(-1)}
                    className="ml-4 bg-gray-200 px-4 py-2 rounded"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

const SeatSelection = () => {
    return (
        <SeatFiltersProvider>
            <MobileSeatFilters/>
            <div className="flex">
                <DesktopSeatFilters/>
                <SeatSelectionContent/>
            </div>
        </SeatFiltersProvider>
    );
};

export default SeatSelection;
