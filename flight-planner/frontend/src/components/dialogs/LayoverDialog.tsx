import React, { useState, useEffect } from "react";
import { useFlightFilters } from "../../context/FlightFiltersContext";

interface LayoverDialogProps {
    onClose: () => void;
}

const LayoverDialog: React.FC<LayoverDialogProps> = ({ onClose }) => {
    const { filters, setUiFilters } = useFlightFilters();
    const [localValue, setLocalValue] = useState<number>(filters.ui.layovers);
    const options = [0, 1, 2];

    useEffect(() => {
        setLocalValue(filters.ui.layovers);
    }, [filters.ui.layovers]);

    const handleApply = () => {
        setUiFilters({ layovers: localValue });
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50">
            <div className="bg-white w-11/12 max-w-md p-4 rounded shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Layover Filter</h3>
                    <button onClick={onClose} className="text-gray-600">
                        Close
                    </button>
                </div>
                <div>
                    <p className="text-sm text-gray-600 mb-2">Max Layovers: {localValue}</p>
                    <div className="flex space-x-2">
                        {options.map((option) => (
                            <button
                                key={option}
                                onClick={() => setLocalValue(option)}
                                className={`px-3 py-1 border rounded transition-colors ${
                                    localValue === option
                                        ? "bg-blue-500 text-white border-blue-500"
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                                }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
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

export default LayoverDialog;
