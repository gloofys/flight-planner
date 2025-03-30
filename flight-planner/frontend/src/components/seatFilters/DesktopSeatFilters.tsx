import {useSeatFilters} from "../../context/SeatFiltersContext.tsx";
import FilterCheckbox from "../checkboxes/FilterCheckbox.tsx";

const DesktopSeatFilters = () => {
    const {filters, setFilters} = useSeatFilters();

    return (
        <div className="hidden md:block p-4 bg-ebb sticky top-4 self-start">
            <h3 className="text-lg font-semibold mb-3">Filter</h3>
            <div className="mb-2">
                <FilterCheckbox
                    label="Window Seat"
                    checked={filters.window || false}
                    onChange={(value) => setFilters({window: value})}
                />
            </div>
            <div className="mb-2">
                <FilterCheckbox
                    label="Extra Legroom"
                    checked={filters.extraLegroom || false}
                    onChange={(value) => setFilters({extraLegroom: value})}
                />
            </div>
            <div className="mb-2">
                <FilterCheckbox
                    label="Near Exit"
                    checked={filters.nearExit || false}
                    onChange={(value) => setFilters({ nearExit: value })}
                />
            </div>
            <div className="mb-2">
                <label className="block font-semibold text-gray-700 mb-1">
                    Adjacent Seats:
                </label>
                <div className="flex space-x-0">
                    <button
                        onClick={() => setFilters({adjacentCount: 2})}
                        className={`px-3 py-1 border rounded transition-colors ${
                            filters.adjacentCount === 2
                                ? "bg-royal-blue text-white border-blue-500"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                        }`}
                    >
                        2 Adjacent
                    </button>
                    <button
                        onClick={() => setFilters({adjacentCount: 3})}
                        className={`px-3 py-1 border rounded transition-colors ${
                            filters.adjacentCount === 3
                                ? "bg-royal-blue text-white border-blue-500"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                        }`}
                    >
                        3 Adjacent
                    </button>
                    <button
                        onClick={() => setFilters({adjacentCount: null})}
                        className={`px-3 py-1 border rounded transition-colors ${
                            filters.adjacentCount === null
                                ? "bg-royal-blue text-white border-blue-500"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                        }`}
                    >
                        Off
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DesktopSeatFilters;
