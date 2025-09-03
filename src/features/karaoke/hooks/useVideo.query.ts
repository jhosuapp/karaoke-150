import { useMutation, useQuery } from "@tanstack/react-query";
import { PostVideoBodyInterface } from "../interfaces";
import { getVideoAction, postVideoAction } from "../actions";

const useVideoMutation = () => {
    const videoMutation = useMutation({
        mutationFn: (body: PostVideoBodyInterface) => postVideoAction(body),
    });
  
    const videoQuery = useQuery({
        queryKey: ["renderStatus", videoMutation.data?.response?.id],
        queryFn: () => getVideoAction(videoMutation.data!.response.id),
        refetchInterval: (data) => {
            if (data?.state?.data?.response?.status  === "done" || data?.state?.data?.response?.status === "failed") {
                return false;
            }
            return 5000;
        },
        enabled: videoMutation.isSuccess && !!videoMutation.data?.response?.id,
        refetchOnWindowFocus: false,
    });
  
    return {
        videoMutation,
        videoQuery,
    };
};
  
  export { useVideoMutation };