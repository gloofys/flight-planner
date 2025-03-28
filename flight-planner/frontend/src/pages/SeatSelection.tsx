
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SeatRow from "../components/seats/SeatRow.tsx";
import DesktopSeatFilters from "../components/seatFilters/DesktopSeatFilters.tsx";
import MobileSeatFilters from "../components/seatFilters/MobileSeatFilters.tsx";
import { SeatFiltersProvider } from "../context/SeatFiltersContext";

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

const SeatSelectionContent = () => {
    const [seats, setSeats] = useState<Seat[]>([]);
    const [selectedSeatId, setSelectedSeatId] = useState<number | null>(null);
    const navigate = useNavigate();

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

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Select Your Seat</h2>
            <div className="space-y-3">
                {sortedRows.map((row) => (
                    <SeatRow
                        key={row}
                        row={row}
                        seats={seatsByRow[row]}
                        selectedSeatId={selectedSeatId}
                        onSelect={(id) => setSelectedSeatId(id)}
                    />
                ))}
            </div>
            <div className="mt-6">
                <button
                    disabled={!selectedSeatId}
                    onClick={() => alert(`Selected seat ID: ${selectedSeatId}`)}
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
            <MobileSeatFilters />
            <div className="flex">

                <DesktopSeatFilters />
                <SeatSelectionContent />
            </div>
        </SeatFiltersProvider>
    );
};

export default SeatSelection;
