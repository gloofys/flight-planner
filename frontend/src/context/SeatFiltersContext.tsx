// this was done with help of AI
import { createContext, useContext, useState, } from "react";

export interface SeatFilters {
    window: boolean;
    extraLegroom: boolean;
    nearExit: boolean;
    adjacentCount: number | null;
}

export interface SeatFiltersContextType {
    filters: SeatFilters;
    setFilters: (newFilters: Partial<SeatFilters>) => void;
}

const defaultFilters: SeatFilters = {
    window: false,
    extraLegroom: false,
    nearExit: false,
    adjacentCount: null,
};

const SeatFiltersContext = createContext<SeatFiltersContextType | undefined>(undefined);

export const SeatFiltersProvider = ({ children }: { children: React.ReactNode }) => {
    const [filters, setFiltersState] = useState<SeatFilters>(defaultFilters);
    const setFilters = (newFilters: Partial<SeatFilters>) => {
        setFiltersState((prev) => ({ ...prev, ...newFilters }));
    };

    return (
        <SeatFiltersContext.Provider value={{ filters, setFilters }}>
            {children}
        </SeatFiltersContext.Provider>
    );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useSeatFilters = () => {
    const context = useContext(SeatFiltersContext);
    if (!context) throw new Error("useSeatFilters must be used within a SeatFiltersProvider");
    return context;
};
