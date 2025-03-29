import { useState, useEffect } from "react";
import { Autocomplete, TextField, MenuItem, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useFlightFilters } from "../../context/FlightFiltersContext";

const FlightSearchBar = () => {
    const { setSearchFilters } = useFlightFilters();
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [flightDate, setFlightDate] = useState("");
    const [passengers, setPassengers] = useState(1);
    const [error, setError] = useState("");
    const [airportOptionsFrom, setAirportOptionsFrom] = useState<string[]>([]);
    const [airportOptionsTo, setAirportOptionsTo] = useState<string[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/flights/options")
            .then((res) => res.json())
            .then((data) => {
                setAirportOptionsFrom(data.from);
            });
    }, []);

    useEffect(() => {
        if (from) {
            fetch(`http://localhost:8080/api/flights/destinations?from=${encodeURIComponent(from)}`)
                .then((res) => res.json())
                .then((data) => {
                    setAirportOptionsTo(data.to);
                })
                .catch((err) => console.error("Failed to fetch destination options", err));
        } else {

            setAirportOptionsTo([]);
        }
    }, [from]);

    const handleSearch = () => {
        if (!from || !to || !flightDate) {
            setError("Please fill in the From, To, and Date fields.");
            return;
        }
        setError("");
        setSearchFilters({
            from,
            destination: to,
            flightDate,
            passengers,
        });
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-3 mx-auto w-full md:max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
                <div className="flex-1 min-w-[120px]">
                    <Autocomplete
                        options={airportOptionsFrom}
                        value={from}
                        onChange={(e, newValue) => setFrom(newValue || "")}
                        renderInput={(params) => (
                            <TextField {...params} label="From" variant="outlined" size="small" fullWidth />
                        )}
                        freeSolo
                    />
                </div>
                <div className="flex-1 min-w-[120px]">
                    <Autocomplete
                        options={airportOptionsTo}
                        value={to}
                        onChange={(e, newValue) => setTo(newValue || "")}
                        renderInput={(params) => (
                            <TextField {...params} label="To" variant="outlined" size="small" fullWidth />
                        )}
                        freeSolo
                    />
                </div>
                <div className="flex-1 min-w-[120px]">
                    <TextField
                        type="date"
                        value={flightDate}
                        onChange={(e) => setFlightDate(e.target.value)}
                        label="Date"
                        variant="outlined"
                        size="small"
                        fullWidth
                        inputProps={{
                            min: new Date().toISOString().split("T")[0],
                            max: "31-12-2030",
                        }}
                        slotProps={{
                            inputLabel: { shrink: true }
                        }}
                    />
                </div>
                <div className="flex-1 min-w-[100px]">
                    <TextField
                        select
                        value={passengers}
                        onChange={(e) => setPassengers(Number(e.target.value))}
                        label="Passengers"
                        variant="outlined"
                        size="small"
                        fullWidth
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                    </TextField>
                </div>
                <div className="min-w-[40px]">
                    <IconButton onClick={handleSearch} color="primary" size="small">
                        <SearchIcon />
                    </IconButton>
                </div>
            </div>
            {error && (
                <p className="text-red-500 text-sm mt-1 text-center">{error}</p>
            )}
        </div>
    );
};

export default FlightSearchBar;
