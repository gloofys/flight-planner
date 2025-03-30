import PriceFilter from "./filters/PriceFilter";
import DurationFilter from "./filters/DurationFilter";
import LayoverFilter from "./filters/LayoverFilter";
import TimeFilter from "./filters/TimeFilter";

interface DesktopFlightFiltersProps {
    priceMin: number;
    priceMax: number;
    durationMax: number;
    layoversMax: number;
}

const DesktopFlightFilters = ({ priceMin, priceMax, durationMax, }: DesktopFlightFiltersProps) => {
    return (
        <aside>
            <h3 className="text-lg font-semibold mb-2">Filter</h3>
            <PriceFilter min={priceMin} max={priceMax} />
            <DurationFilter max={durationMax} />
            <LayoverFilter />
            <TimeFilter />
        </aside>
    );
};

export default DesktopFlightFilters;
