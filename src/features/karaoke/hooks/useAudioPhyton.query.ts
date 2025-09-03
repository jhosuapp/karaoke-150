import { useQuery } from "@tanstack/react-query"

import { getAudioPythonAction } from "../actions";

const useAudioPhytonQuery = () => {
    const audioQuery = useQuery({
        queryKey: ['audioDetail'],
        queryFn:  ()=> getAudioPythonAction(),
        staleTime: 60 * 1000 * 1000,
        refetchOnWindowFocus: false,
        retry: false
    });

    return audioQuery;
}

export { useAudioPhytonQuery }