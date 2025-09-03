import { useMutation, useQuery } from "@tanstack/react-query";
import { PostVideoBodyInterface } from "../interfaces";
import { getVideoShotstackAction, postVideoShotstackAction } from "../actions";

const useVideoAndAudioProcessing = () => {
    // const processAudioMutation = useMutation({
    //     mutationFn: (body: PostVideoBodyInterface) => postVideoShotstackAction(body),
    // });

    const processVideoShotstackMutation = useMutation({
        mutationFn: (body: PostVideoBodyInterface) => postVideoShotstackAction(body),
    });
  
    const processStatusVideoQuery = useQuery({
        queryKey: ["renderStatus", processVideoShotstackMutation.data?.response?.id],
        queryFn: () => getVideoShotstackAction(processVideoShotstackMutation.data!.response.id),
        refetchInterval: (data) => {
            if (data?.state?.data?.response?.status  === "done" || data?.state?.data?.response?.status === "failed") {
                return false;
            }
            return 5000;
        },
        enabled: processVideoShotstackMutation.isSuccess && !!processVideoShotstackMutation.data?.response?.id,
        refetchOnWindowFocus: false,
    });
  
    return {
        processVideoShotstackMutation,
        processStatusVideoQuery,
        // processAudioMutation
    };
};
  
  export { useVideoAndAudioProcessing };