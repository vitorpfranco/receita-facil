import { SupportedIcons } from "../types/supportedIcons";
const apiUrl = import.meta.env.VITE_API_URL;
export async function fetchSupportedIcons(): Promise<SupportedIcons> {
    const response = await fetch(`${apiUrl}/supportIcons?version=V2`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}
