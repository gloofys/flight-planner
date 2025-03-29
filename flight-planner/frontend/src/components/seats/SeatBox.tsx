
interface Seat {
    id: number;
    seatNumber: string;
    occupied: boolean;
    hasExtraLegRoom: boolean;
    window: boolean;
    aisle: boolean;
    exitRow: boolean;
    nearExit: boolean;
}

interface SeatBoxProps {
    seat: Seat;
    isSelected: boolean;
    matchesFilter: boolean;
    onSelect: () => void;
}

const SeatBox = ({ seat, isSelected, matchesFilter, onSelect }: SeatBoxProps) => {
    return (
        <div
            className={`w-14 h-14 text-xs text-center rounded cursor-pointer flex items-center justify-center transition-all 
        ${seat.occupied
                ? "bg-gray-300 text-white cursor-not-allowed"
                : isSelected
                    ? "bg-blue-600 text-white"
                    : "bg-green-200 hover:bg-green-300"} 
        ${seat.hasExtraLegRoom ? "border-2 border-yellow-500" : ""}
        ${!matchesFilter ? "filter blur-sm opacity-50" : ""}
      `}
            onClick={() => !seat.occupied && onSelect()}
        >
            {seat.seatNumber}
        </div>
    );
};

export default SeatBox;
