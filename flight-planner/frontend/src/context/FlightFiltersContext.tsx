import { createContext, useContext, useState, ReactNode } from "react";

// This file used help from gpt 4-0
interface SearchFilters {
    from?: string;
    destination?: string;
    flightDate?: string;
}

interface UiFilters {
    priceRange: [number, number];
    flightDuration: number;
    layovers: number;
    flightTime: string;
}

interface FlightFilters {
    search: SearchFilters;
    ui: UiFilters;
}

interface FlightFiltersContextType {
    filters: FlightFilters;
    setSearchFilters: (search: Partial<SearchFilters>) => void;
    setUiFilters: (ui: Partial<UiFilters> | ((prev: UiFilters) => UiFilters)) => void;
    resetFilters: () => void;
}

const defaultFilters: FlightFilters = {
    search: {},
    ui: {
        priceRange: [0, 1000],
        flightDuration: 600,
        layovers: 2,
        flightTime: "Any",
    },
};

const FlightFiltersContext = createContext<FlightFiltersContextType | undefined>(undefined);

export const FlightFiltersProvider = ({ children }: { children: ReactNode }) => {
    const [filters, setFilters] = useState<FlightFilters>(defaultFilters);

    const setSearchFilters = (search: Partial<SearchFilters>) => {
        setFilters((prev) => ({ ...prev, search: { ...prev.search, ...search } }));
    };

    const setUiFilters = (ui: Partial<UiFilters> | ((prev: UiFilters) => UiFilters)) => {
        setFilters((prev) => ({
            ...prev,
            ui: typeof ui === "function" ? ui(prev.ui) : { ...prev.ui, ...ui },
        }));
    };

    const resetFilters = () => setFilters(defaultFilters);

    return (
        <FlightFiltersContext.Provider value={{ filters, setSearchFilters, setUiFilters, resetFilters }}>
            {children}
        </FlightFiltersContext.Provider>
    );
};

export const useFlightFilters = (): FlightFiltersContextType => {
    const context = useContext(FlightFiltersContext);
    if (!context) {
        throw new Error("useFlightFilters must be used within a FlightFiltersProvider");
    }
    return context;
};
