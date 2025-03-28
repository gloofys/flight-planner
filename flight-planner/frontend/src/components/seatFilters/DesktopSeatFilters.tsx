
import { useSeatFilters} from "../../context/SeatFiltersContext.tsx";

const DesktopSeatFilters = () => {
    const { filters, setFilters } = useSeatFilters();

    return (
        <div className="hidden md:block p-4 bg-gray-50 border-r">
            <h3 className="text-lg font-semibold mb-3">Filters</h3>
            <div className="mb-2">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={filters.window || false}
                        onChange={(e) => setFilters({ window: e.target.checked })}
                        className="mr-2"
                    />
                    Window Seat
                </label>
            </div>
            <div className="mb-2">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={filters.extraLegroom || false}
                        onChange={(e) => setFilters({ extraLegroom: e.target.checked })}
                        className="mr-2"
                    />
                    Extra Legroom
                </label>
            </div>
            <div className="mb-2">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={filters.nearExit || false}
                        onChange={(e) => setFilters({ nearExit: e.target.checked })}
                        className="mr-2"
                    />
                    Near Exit
                </label>
            </div>
        </div>
    );
};

export default DesktopSeatFilters;
