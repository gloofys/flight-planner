
import { useSeatFilters} from "../../context/SeatFiltersContext.tsx";

const MobileSeatFilters = () => {
    const { filters, setFilters } = useSeatFilters();

    return (
        <div className="md:hidden p-3 bg-gray-50 border-b flex space-x-4">
            <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={filters.window || false}
                        onChange={(e) => setFilters({window: e.target.checked})}
                        className="mr-1"
                    />
                    Window
                </label>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={filters.extraLegroom || false}
                        onChange={(e) => setFilters({extraLegroom: e.target.checked})}
                        className="mr-1"
                    />
                    Legroom
                </label>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={filters.nearExit || false}
                        onChange={(e) => setFilters({nearExit: e.target.checked})}
                        className="mr-1"
                    />
                    Exit
                </label>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold mb-1">Adjacent Seats</span>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setFilters({adjacentCount: 2})}
                            className={`px-2 py-1 text-xs border rounded transition-colors ${
                                filters.adjacentCount === 2
                                    ? "bg-blue-500 text-white border-blue-500"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                            }`}
                        >
                            2 Adjacent
                        </button>
                        <button
                            onClick={() => setFilters({adjacentCount: 3})}
                            className={`px-2 py-1 text-xs border rounded transition-colors ${
                                filters.adjacentCount === 3
                                    ? "bg-blue-500 text-white border-blue-500"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                            }`}
                        >
                            3 Adjacent
                        </button>
                        <button
                            onClick={() => setFilters({adjacentCount: null})}
                            className={`px-2 py-1 text-xs border rounded transition-colors ${
                                filters.adjacentCount === null
                                    ? "bg-blue-500 text-white border-blue-500"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                            }`}
                        >
                            Off
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileSeatFilters;
