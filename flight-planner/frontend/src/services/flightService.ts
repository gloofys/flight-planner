const API_URL = "http://localhost:8080/api/flights";

export async function getFlights(){
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Failed to fetch flights")
    }
    return response.json();
}