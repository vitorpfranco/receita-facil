import { useQuery } from "@tanstack/react-query";
import { fetchDrugs } from "../lib/drugsApi";



export const useDrugs = () => {
    return useQuery({
        queryKey: ["drugs"],
        queryFn: () => fetchDrugs(),
        staleTime: 1000 * 60 * 50,
    });
};
