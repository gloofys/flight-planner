const API_URL = import.meta.env.VITE_API_URL;

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
    const res = await fetch(`${API_URL}/api/flights/metadata?${query}`);
    if (!res.ok) throw new Error("Failed to fetch metadata");
    return res.json();
}
