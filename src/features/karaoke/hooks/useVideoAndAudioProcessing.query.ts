import { useMutation, useQuery } from "@tanstack/react-query";
import { PostVideoBodyInterface } from "../interfaces";
import { getVideoShotstackAction, postAudioPythonAction, postVideoShotstackAction } from "../actions";

const useVideoAndAudioProcessing = () => {
    const processVideoShotstackMutation = useMutation({
        mutationFn: (body: PostVideoBodyInterface) => postVideoShotstackAction(body),
    });

    const processAudioPython = useMutation({
        mutationFn: (file: File) => postAudioPythonAction(file),
        onSuccess: (audioResponse) => {
            if (audioResponse) {
                processVideoShotstackMutation.mutate({
                    id: "93716852-d463-4886-a279-386202a9c7c3",
                    merge: [
                        {
                            find: "MY_VIDEO",
                            replace: 'https://shotstack-ingest-api-stage-sources.s3.ap-southeast-2.amazonaws.com/oyzkyyfsci/zzz01k48-3n3xr-rekat-a1wn0-y8m6y4/source.mp4'
                        }
                    ]
                });
            }
        },
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
        processAudioPython
    };
};
  
export { useVideoAndAudioProcessing };