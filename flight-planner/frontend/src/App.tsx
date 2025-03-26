import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlightList from "./components/FlightList.tsx";
import FlightDetails from "./pages/FlightDetails.tsx";
import { FlightFiltersProvider } from "./context/FlightFiltersContext.tsx";

function App() {
  return (
      <Router>
        <FlightFiltersProvider>
          <Routes>
            <Route path="/" element={<FlightList />} />
            <Route path="/flights/:id" element={<FlightDetails />} />
          </Routes>
        </FlightFiltersProvider>
      </Router>
  );
}

export default App;
