const API_URL = "http://localhost:8080/api/flights";

export async function getFlights(filters: Record<string, any> = {}) {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_URL}?${query}`);
    if (!response.ok) {
        throw new Error("Failed to fetch flights");
    }
    return response.json();
}

export async function getFlightsMetadata(search: Record<string, any> = {}) {
    const query = new URLSearchParams(search).toString();
    const res = await fetch(`http://localhost:8080/api/flights/metadata?${query}`);
    if (!res.ok) throw new Error("Failed to fetch metadata");
    return res.json();
}