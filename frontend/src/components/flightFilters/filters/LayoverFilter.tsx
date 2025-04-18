import { useFlightFilters } from '../../../context/FlightFiltersContext';


const LayoversFilter = () => {
    const { filters, setUiFilters } = useFlightFilters();
    const currentValue = filters.ui.layovers;
    const options = [0, 1, 2];

    return (
        <div className="mb-4">
            <p className="text-m font-medium text-gray-600 mb-2">Max Layovers: {currentValue}</p>
            <div className="flex space-x-0">
                {options.map((option) => (
                    <button
                        key={option}
                        onClick={() => setUiFilters({ layovers: option })}
                        className={`px-3 py-1 border rounded cursor-pointer transition-colors ${
                            currentValue === option
                                ? "bg-royal-blue text-white border-blue-500"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LayoversFilter;
