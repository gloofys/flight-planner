import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import SeatRow from "../components/seats/SeatRow";
import DesktopSeatFilters from "../components/seatFilters/DesktopSeatFilters";
import MobileSeatFilters from "../components/seatFilters/MobileSeatFilters";
import {SeatFiltersProvider} from "../context/SeatFiltersContext";
import {useFlightFilters} from "../context/FlightFiltersContext";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MobileSeatLegend from "../components/legends/MobileSeatLegend.tsx";
import DesktopSeatLegend from "../components/legends/DesktopSeatLegend.tsx";

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
    const {state} = useLocation() as { state: { flight: Flight } };
    const flightInfo = state?.flight;

    const [seats, setSeats] = useState<Seat[]>([]);
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
    const navigate = useNavigate();
    const {filters} = useFlightFilters();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState("");

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
        const maxSeats = filters.search.passengers || 1;
        if (selectedSeats.find((s) => s.id === seat.id)) {
            setSelectedSeats((prev) => prev.filter((s) => s.id !== seat.id));
        } else {
            if (selectedSeats.length < maxSeats) {
                setSelectedSeats((prev) => [...prev, seat]);
            } else {
                setSnackbarMsg(`You can only select ${maxSeats} seat${maxSeats > 1 ? "s" : ""}.`);
                setSnackbarOpen(true);
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded  p-0 md:p-6 mt-0 md:mt-6 mb-10">
            <h2 className="text-2xl font-bold mb-6">
                Select Your Seat{(filters.search.passengers || 1) > 1 ? "s" : ""}
            </h2>
            <p className="mb-4 text-sm text-gray-600">
                Please select {filters.search.passengers || 1} seat
                {(filters.search.passengers || 1) > 1 ? "s" : ""} and confirm your selection below.
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
            <div className="mt-6 flex gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="flex-1 bg-gray-200 py-2 rounded text-center hover:bg-gray-300 transition"
                >
                    Back
                </button>
                <div className="relative group flex-1">
                    <button
                        disabled={selectedSeats.length !== (filters.search.passengers || 1)}
                        onClick={() => {
                            if (flightInfo) {
                                navigate(`/ticket/${flightInfo.id}`, {
                                    state: {selectedSeats, flight: flightInfo},
                                });
                            }
                        }}
                        className={`w-full py-2 rounded text-white transition
                            ${selectedSeats.length === (filters.search.passengers || 1)
                            ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                            : "bg-blue-300 cursor-not-allowed"}`}
                    >
                        Confirm
                    </button>
                    {selectedSeats.length !== (filters.search.passengers || 1) && (
                        <div
                            className="absolute -bottom-10 right-0 text-sm text-gray-700 bg-white border px-3 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                            Select all seats to continue
                        </div>
                    )}
                </div>
            </div>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity="warning"
                    variant="filled"
                    sx={{width: "100%"}}
                >
                    {snackbarMsg}
                </Alert>
            </Snackbar>
        </div>
    );
};

const SeatSelection = () => {
    return (
        <SeatFiltersProvider>
            <MobileSeatFilters/>
            <MobileSeatLegend/>
            <div className="flex flex-1 bg-white md:bg-ebb">
                <DesktopSeatFilters/>
                <SeatSelectionContent/>
                <DesktopSeatLegend/>
            </div>

        </SeatFiltersProvider>
    );
};

export default SeatSelection;
