import { Drug } from "../types/drug";
const apiUrl = import.meta.env.VITE_API_URL;
export async function fetchDrugs(): Promise<Drug[]> {
    const response = await fetch(`${apiUrl}/drugs`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}
