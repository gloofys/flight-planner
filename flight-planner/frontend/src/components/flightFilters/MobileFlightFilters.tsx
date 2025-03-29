import {useState} from "react";
import PriceDialog from "../dialogs/PriceDialog";
import DurationDialog from "../dialogs/DurationDialog";
import LayoverDialog from "../dialogs/LayoverDialog";
import {useFlightFilters} from "../../context/FlightFiltersContext";
import TimeOfDayDialog from "../dialogs/TimeOfDayDialog.tsx";


const MobileFlightFilters = () => {
    const {filters} = useFlightFilters();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState<string>("");

    const openFilter = (filterName: string) => {
        setActiveFilter(filterName);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setActiveFilter("");
    };

    return (
        <div className="md:hidden">
            <div className="overflow-x-auto flex space-x-4 p-2 bg-gray-100 justify-center">
                <button
                    onClick={() => openFilter("price")}
                    className="px-3 py-1 bg-blue-200 text-white rounded whitespace-nowrap"
                >
                    Price
                </button>
                <button
                    onClick={() => openFilter("duration")}
                    className="px-3 py-1 bg-blue-200 text-white rounded whitespace-nowrap"
                >
                    Duration
                </button>
                <button
                    onClick={() => openFilter("layover")}
                    className="px-3 py-1 bg-blue-200 text-white rounded whitespace-nowrap"
                >
                    Layover
                </button>
                <button
                    onClick={() => openFilter("time")}
                    className="px-3 py-1 bg-blue-200 text-white rounded whitespace-nowrap"
                >
                    Time
                </button>
            </div>

            {/* Render the appropriate dialog */}
            {isDialogOpen && activeFilter === "price" && (
                <PriceDialog onClose={closeDialog}/>
            )}
            {isDialogOpen && activeFilter === "duration" && (
                <DurationDialog onClose={closeDialog} max={filters.ui.flightDuration}/>
            )}
            {isDialogOpen && activeFilter === "layover" && (
                <LayoverDialog onClose={closeDialog}/>
            )}
            {isDialogOpen && activeFilter === "time" && (
                <TimeOfDayDialog onClose={closeDialog}/>
            )}
        </div>
    );
};

export default MobileFlightFilters;
