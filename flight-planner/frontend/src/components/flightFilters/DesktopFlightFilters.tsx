import PriceFilter from "./filters/PriceFilter.tsx";

interface DesktopFlightFiltersProps {
    priceMin: number;
    priceMax: number;
}

const DesktopFlightFilters = ({ priceMin, priceMax } :DesktopFlightFiltersProps) => {
    return (
        <aside className="hidden md:block w-64 p-4 bg-white border-r">
            <h3 className="text-lg font-semibold mb-2">Filters</h3>
            <PriceFilter min={priceMin} max={priceMax} />
        </aside>
    );
};

export default DesktopFlightFilters;
