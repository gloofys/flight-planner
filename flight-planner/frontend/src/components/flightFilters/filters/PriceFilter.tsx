
import { Slider } from '@base-ui-components/react/slider';
import { useFlightFilters } from "../../../context/FlightFiltersContext.tsx";
import {useEffect} from "react";

const PriceFilter = ({ min, max }: { min: number; max: number }) => {
    const { filters, setUiFilters } = useFlightFilters();
    const value = filters.ui.priceRange;

    useEffect(() => {

        if (value[0] !== min || value[1] !== max) {
            setUiFilters({priceRange: [min, max]});
        }
    }, [min, max]);

    return (
        <div className="mb-4">
            <p className="text-m mb-2 font-medium text-gray-600">{value[0]}€ – {value[1]}€</p>
            <Slider.Root
                value={value}
                onValueChange={(v) => setUiFilters({priceRange: v as [number, number]})}
                min={min}
                max={max}
                step={10}
            >
                <Slider.Control className="flex items-center py-3">
                    <Slider.Track className="h-1 w-full bg-gray-500 relative">
                        <Slider.Indicator className="absolute h-full bg-royal-blue rounded" />
                        <Slider.Thumb className="size-4 bg-white border shadow-md rounded-full" />
                        <Slider.Thumb className="size-4 bg-white border shadow-md rounded-full" />
                    </Slider.Track>
                </Slider.Control>
            </Slider.Root>
        </div>
    );
};

export default PriceFilter;
