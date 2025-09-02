import { useQuery } from "@tanstack/react-query"

import { getAudioAction } from "../actions";

const useAudioQuery = () => {
    const audioQuery = useQuery({
        queryKey: ['audioDetail'],
        queryFn:  ()=> getAudioAction(),
        staleTime: 60 * 1000 * 1000,
        refetchOnWindowFocus: false,
        retry: false
    });

    return audioQuery;
}

export { useAudioQuery }