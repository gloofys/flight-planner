// components/FlightFilters/filters/PriceFilter.tsx
import { Slider } from "@base-ui-components/react/slider";
import { useFlightFilters } from "../../../context/FlightFiltersContext.tsx";

const PriceFilter = ({ min, max }: { min: number; max: number }) => {
    const { filters, setUiFilters } = useFlightFilters();
    const value = filters.ui.priceRange;

    return (
        <div className="mb-4">
            <p className="text-sm mb-2 text-gray-600">{value[0]}€ – {value[1]}€</p>
            <Slider.Root
                value={value}
                onValueChange={(v) => setUiFilters({ priceRange: v as [number, number] })}
                min={min}
                max={max}
                step={10}
            >
                <Slider.Control className="flex items-center py-3">
                    <Slider.Track className="h-1 w-full bg-gray-200 relative">
                        <Slider.Indicator className="absolute h-full bg-red-500 rounded" />
                        <Slider.Thumb className="size-4 bg-white border shadow-md rounded-full" />
                        <Slider.Thumb className="size-4 bg-white border shadow-md rounded-full" />
                    </Slider.Track>
                </Slider.Control>
            </Slider.Root>
        </div>
    );
};

export default PriceFilter;
