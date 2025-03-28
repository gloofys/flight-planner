import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlightList from "./components/FlightList.tsx";
import FlightDetails from "./pages/FlightDetails.tsx";
import { FlightFiltersProvider } from "./context/FlightFiltersContext.tsx";
import SeatSelection from "./pages/SeatSelection.tsx";

function App() {
  return (
      <Router>
        <FlightFiltersProvider>
          <Routes>
            <Route path="/" element={<FlightList />} />
            <Route path="/flights/:id" element={<FlightDetails />} />
              <Route path="/flights/:id/seats" element={<SeatSelection />} />
          </Routes>
        </FlightFiltersProvider>
      </Router>
  );
}

export default App;
