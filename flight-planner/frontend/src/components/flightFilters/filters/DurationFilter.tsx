import { Slider } from "@base-ui-components/react/slider";
import { useFlightFilters } from "../../../context/FlightFiltersContext";
import { useEffect } from "react";

const DurationFilter = ({ max }: { max: number }) => {
    const { filters, setUiFilters } = useFlightFilters();
    const value = filters.ui.flightDuration;

    useEffect(() => {
        console.log("DurationFilter: context flightDuration =", value, "max =", max);
        if (value > max) {
            setUiFilters({ flightDuration: max });
        }
    }, [max, value, setUiFilters]);

    return (
        <div className="mb-4">
            <p className="text-sm mb-2 text-gray-600">Max Duration: {value} min</p>
            <Slider.Root
                value={[value]}
                onValueChange={(v) => {
                    const newVal = v[0];
                    console.log("Slider onValueChange new value =", newVal);
                    setUiFilters({ flightDuration: newVal });
                }}
                min={30}
                max={max}
                step={10}
            >
                <Slider.Control className="flex items-center py-3">
                    <Slider.Track className="h-1 w-full bg-gray-200 relative">
                        <Slider.Indicator className="absolute h-full bg-blue-500 rounded" />
                        <Slider.Thumb className="size-4 bg-white border shadow-md rounded-full" />
                    </Slider.Track>
                </Slider.Control>
            </Slider.Root>
        </div>
    );
};

export default DurationFilter;