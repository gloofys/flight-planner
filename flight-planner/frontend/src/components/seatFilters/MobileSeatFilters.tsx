
import { useSeatFilters} from "../../context/SeatFiltersContext.tsx";

const MobileSeatFilters = () => {
    const { filters, setFilters } = useSeatFilters();

    return (
        <div className="md:hidden p-3 bg-gray-50 border-b flex space-x-4">
            <label className="flex items-center">
                <input
                    type="checkbox"
                    checked={filters.window || false}
                    onChange={(e) => setFilters({ window: e.target.checked })}
                    className="mr-1"
                />
                Window
            </label>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    checked={filters.extraLegroom || false}
                    onChange={(e) => setFilters({ extraLegroom: e.target.checked })}
                    className="mr-1"
                />
                Legroom
            </label>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    checked={filters.nearExit || false}
                    onChange={(e) => setFilters({ nearExit: e.target.checked })}
                    className="mr-1"
                />
                Exit
            </label>
        </div>
    );
};

export default MobileSeatFilters;
