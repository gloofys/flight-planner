
import SeatBox from "./SeatBox";
import { useSeatFilters} from "../../context/SeatFiltersContext.tsx";

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

interface SeatRowProps {
    row: number;
    seats: Seat[];
    selectedSeatId: number | null;
    onSelect: (id: number) => void;
}

const SeatRow = ({ row, seats, selectedSeatId, onSelect }: SeatRowProps) => {
    const { filters } = useSeatFilters();

    const matchesFilter = (seat: Seat) => {
        if (filters.window && !seat.window) return false;
        if (filters.extraLegroom && !seat.hasExtraLegRoom) return false;
        if (filters.nearExit && !seat.nearExit) return false;
        return true;
    };

    const leftSeats = seats
        .filter((s) => s.columnIndex < 2)
        .sort((a, b) => a.columnIndex - b.columnIndex);
    const rightSeats = seats
        .filter((s) => s.columnIndex >= 2)
        .sort((a, b) => a.columnIndex - b.columnIndex);

    return (
        <div>
            {row === 14 && (
                <div className="my-2 py-2 bg-yellow-100 text-center font-semibold">
                    EXIT ROW AREA
                </div>
            )}
            <div className="grid grid-cols-6 gap-x-0 items-center justify-items-center">
                {leftSeats.map((seat) => (
                    <SeatBox
                        key={seat.id}
                        seat={seat}
                        isSelected={selectedSeatId === seat.id}
                        matchesFilter={matchesFilter(seat)}
                        onSelect={() => onSelect(seat.id)}
                    />
                ))}
                <div className="text-center font-semibold text-gray-500">{row}</div>
                {rightSeats.map((seat) => (
                    <SeatBox
                        key={seat.id}
                        seat={seat}
                        isSelected={selectedSeatId === seat.id}
                        matchesFilter={matchesFilter(seat)}
                        onSelect={() => onSelect(seat.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default SeatRow;
