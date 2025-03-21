import {useState} from 'react'

interface FlightSearchBarProps {
    onSearch: (filters: Record<string, any>) => void;
}

const FlightSearchBar = ({onSearch} :FlightSearchBarProps) => {
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [flightDate, setFlightDate] = useState('')
    const [passengers, setPassengers] = useState(1)

    const handleSearch = () => {
       const filters: Record<string, any> = {}
        if(from) filters.from = from
        if (to) filters.destination = to;
        if(flightDate) filters.flightDate = flightDate;

        onSearch(filters)

        console.log("Searching flights from:", from, "to:", to);
        console.log("date:", flightDate);
        console.log("Passengers:", passengers);
    }
    return (
        <div className="flex items-center space-x-2 bg-white p-3 rounded-full shadow-md border border-gray-200 w-full max-w-3xl mx-auto">
            <input
                type="text"
                placeholder="From"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="px-3 py-2 border rounded-md w-1/4"
            />

            <span className="text-xl">↔️</span>

            <input
                type="text"
                placeholder="To?"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="px-3 py-2 border rounded-md w-1/4"
            />

            <input
                type="date"
                value={flightDate}
                onChange={(e) => setFlightDate(e.target.value)}
                className="px-3 py-2 border rounded-md w-1/4"
            />

            <select
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="px-3 py-2 border rounded-md w-1/4"
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>

            <button onClick={handleSearch} className="bg-red-500 text-white px-4 py-2 rounded-md">🔍</button>
        </div>
    )
}
export default FlightSearchBar