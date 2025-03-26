const API_URL = "http://localhost:8080/api/flights";

export async function getFlights(filters: Record<string, any> = {}) {
    const query = new URLSearchParams(filters).toString();
    console.log("🔍 Fetching Flights:", `${API_URL}?${query}`);
    const response = await fetch(`${API_URL}?${query}`);
    if (!response.ok) {
        throw new Error("Failed to fetch flights");
    }
    return response.json();
}

export async function getFlightsMetadata() {
    const response = await fetch(`${API_URL}/metadata`);
    if (!response.ok) {
        throw new Error("Failed to fetch filter metadata");
    }
    return response.json();
}