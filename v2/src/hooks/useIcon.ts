import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSupportedIcons } from "../lib/supportedIconsApi";
import { SupportedIcons } from "../types/supportedIcons";

const fetchIcon = async (iconUrl: string) => {
    const res = await fetch(iconUrl);
    if (!res.ok) throw new Error("Erro ao carregar SVG");
    return res.text();
};

export const prefetchImages = (iconUrls: string[]) => {
    iconUrls.forEach((iconUrl) => {
        const img = new Image();
        img.src = iconUrl;

        fetch(iconUrl, { mode: "no-cors" })
            .then(() => console.log(`Pré-carregado: ${iconUrl}`))
            .catch((err) => console.error(`Erro ao carregar ${iconUrl}:`, err));
    });
};


export const useIcon = (iconUrl: string) => {
    return useQuery({
        queryKey: ["icon", iconUrl],
        queryFn: () => fetchIcon(iconUrl),
        staleTime: 1000 * 60 * 50, 
    });
};

export const prefetchIcons = (iconUrls: string[], queryClient: ReturnType<typeof useQueryClient>) => {
    iconUrls.forEach((iconUrl) => {
        queryClient.prefetchQuery({
            queryKey: ["icon", iconUrl],
            queryFn: () => fetchIcon(iconUrl),
        });
    });
};

export const useSupportedIcons = () => {
    return useQuery<SupportedIcons>({
        queryKey: ["icons"],
        queryFn: () => fetchSupportedIcons(),
        staleTime: 1000 * 60 * 50,
    });
};

