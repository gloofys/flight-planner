import { useFlightFilters } from "../../../context/FlightFiltersContext";

const TimeFilter = () => {
    const { filters, setUiFilters } = useFlightFilters();
    const { flightTime } = filters.ui;

    const options = ["Any", "Morning", "Afternoon", "Evening"];

    return (
        <div className="mb-4">
            <p className="text-sm mb-2 text-gray-600">Departure Time: {flightTime}</p>
            <div className="flex flex-col">
                {options.map((option) => (
                    <button
                        key={option}
                        onClick={() => setUiFilters({ flightTime: option })}
                        className={`px-3 py-1 border rounded ${flightTime === option ? 'bg-blue-500 text-white' : 'bg-white'}`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TimeFilter;
