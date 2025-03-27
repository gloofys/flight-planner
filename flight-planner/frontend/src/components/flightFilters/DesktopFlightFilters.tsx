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

const DesktopFlightFilters = ({ priceMin, priceMax, durationMax, layoversMax }: DesktopFlightFiltersProps) => {
    return (
        <aside>
            <h3 className="text-lg font-semibold mb-2">Filters</h3>
            <PriceFilter min={priceMin} max={priceMax} />
            <DurationFilter max={durationMax} />
            <LayoverFilter max={layoversMax} />
            <TimeFilter />
        </aside>
    );
};

export default DesktopFlightFilters;
