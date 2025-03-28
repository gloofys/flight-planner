
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
    selectedSeatIds: number[];
    onSelect: (seat: Seat) => void;
}

const SeatRow = ({ row, seats, selectedSeatIds, onSelect }: SeatRowProps) => {
    const { filters } = useSeatFilters();

    const computeValidSeatIds = (seatArray: Seat[]): Set<number> => {
        const validSeatIds = new Set<number>();
        const groupSize = filters.adjacentCount || 1; // if adjacentCount is not set, groupSize defaults to 1.
        let currentGroup: Seat[] = [];

        for (const seat of seatArray) {
            if (!seat.occupied) {
                if (currentGroup.length === 0) {
                    currentGroup.push(seat);
                } else {
                    if (seat.columnIndex === currentGroup[currentGroup.length - 1].columnIndex + 1) {
                        currentGroup.push(seat);
                    } else {
                        if (currentGroup.length >= groupSize) {
                            currentGroup.forEach((s) => validSeatIds.add(s.id));
                        }
                        currentGroup = [seat];
                    }
                }
            } else {
                if (currentGroup.length >= groupSize) {
                    currentGroup.forEach((s) => validSeatIds.add(s.id));
                }
                currentGroup = [];
            }
        }
        if (currentGroup.length >= groupSize) {
            currentGroup.forEach((s) => validSeatIds.add(s.id));
        }
        return validSeatIds;
    };

    const leftSeats = seats.filter((s) => s.columnIndex < 2).sort((a, b) => a.columnIndex - b.columnIndex);
    const rightSeats = seats.filter((s) => s.columnIndex >= 2).sort((a, b) => a.columnIndex - b.columnIndex);

    let validLeftSeatIds = new Set<number>();
    let validRightSeatIds = new Set<number>();

    if (filters.adjacentCount !== null) {
        validLeftSeatIds = computeValidSeatIds(leftSeats);
        validRightSeatIds = computeValidSeatIds(rightSeats);
    }

    const matchesFilter = (seat: Seat) => {
        if (filters.window && !seat.window) return false;
        if (filters.extraLegroom && !seat.hasExtraLegRoom) return false;
        if (filters.nearExit && !seat.nearExit) return false;
        if (filters.adjacentCount !== null) {
            if (seat.columnIndex < 2) {
                return validLeftSeatIds.has(seat.id);
            } else {
                return validRightSeatIds.has(seat.id);
            }
        }
        return true;
    };

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
                        isSelected={selectedSeatIds.includes(seat.id)}
                        matchesFilter={matchesFilter(seat)}
                        onSelect={() => onSelect(seat)}
                    />
                ))}
                <div className="text-center font-semibold text-gray-500">{row}</div>
                {rightSeats.map((seat) => (
                    <SeatBox
                        key={seat.id}
                        seat={seat}
                        isSelected={selectedSeatIds.includes(seat.id)}
                        matchesFilter={matchesFilter(seat)}
                        onSelect={() => onSelect(seat)}
                    />
                ))}
            </div>
        </div>
    );
};

export default SeatRow;
