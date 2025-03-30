
import React, { useState, useEffect } from "react";
import { useFlightFilters } from "../../context/FlightFiltersContext";
import { Slider } from "@base-ui-components/react/slider";

interface DurationDialogProps {
    onClose: () => void;
    max: number;
}

const DurationDialog: React.FC<DurationDialogProps> = ({ onClose, max }) => {
    const { filters, setUiFilters } = useFlightFilters();
    const [localValue, setLocalValue] = useState<number>(filters.ui.flightDuration);

    const min = 30;

    useEffect(() => {
        setLocalValue(filters.ui.flightDuration);
    }, [filters.ui.flightDuration]);

    const handleApply = () => {
        setUiFilters({ flightDuration: localValue });
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50">
            <div className="bg-white w-11/12 max-w-md p-4 rounded shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Duration Filter</h3>
                    <button onClick={onClose} className="text-gray-600">
                        Close
                    </button>
                </div>
                <div>
                    <p className="text-sm mb-2 text-gray-600">{localValue} min</p>
                    <Slider.Root
                        value={[localValue]}
                        onValueChange={(v) => setLocalValue((v as number[])[0])}
                        min={min}
                        max={max}
                        step={10}
                    >
                        <Slider.Control className="flex items-center py-3">
                            <Slider.Track className="h-1 w-full bg-gray-200 relative">
                                <Slider.Indicator className="absolute h-full bg-royal-blue rounded" />
                                <Slider.Thumb className="size-4 bg-white border shadow-md rounded-full" />
                            </Slider.Track>
                        </Slider.Control>
                    </Slider.Root>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleApply}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DurationDialog;
