import { useMutation, useQuery } from "@tanstack/react-query";
import { PostVideoBodyInterface } from "../interfaces";
import { getVideoShotstackAction, postAudioPythonAction, postVideoDrupalAction, postVideoShotstackAction } from "../actions";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { defaultPropsSwalUnexpected } from "../../../shared/constants";

const useVideoAndAudioProcessing = () => {
    // 1. upload video to drupal
    const processVideoDrupalMutation = useMutation({
        mutationFn: (file: File) => postVideoDrupalAction(file),
        onError: ()=>{
            Swal.fire({
                ...defaultPropsSwalUnexpected,
                title: 'Error al subir el video',
                text: 'Tu código sigue siendo válido. Intenta nuevamente más tarde.',
            }).then(()=>{
                window.location.reload();
            });
        }
    });

    // 2. process audio in python
    const processAudioPython = useMutation({
        mutationFn: (file: File) => postAudioPythonAction(file),
        onError: ()=>{
            Swal.fire({
                ...defaultPropsSwalUnexpected,
                title: 'Error al procesar el audio',
                text: 'Tu código sigue siendo válido. Intenta nuevamente más tarde.',
            }).then(()=>{
                window.location.reload();
            });
        }
    });

    // 3. process video in shotstack
    const processVideoShotstackMutation = useMutation({
        mutationFn: (body: PostVideoBodyInterface) => postVideoShotstackAction(body),
        onError: ()=>{
            Swal.fire({
                ...defaultPropsSwalUnexpected,
                title: 'Error al procesar el video',
                text: 'Tu código sigue siendo válido. Intenta nuevamente más tarde.',
            }).then(()=>{
                window.location.reload();
            });
        }
    });

    // 4. video status consultation
    const processStatusVideoQuery = useQuery({
        queryKey: ["renderStatus", processVideoShotstackMutation.data?.response?.id],
        queryFn: () => getVideoShotstackAction(processVideoShotstackMutation.data!.response.id),
        refetchInterval: (data) => {
            if (data?.state?.data?.response?.status === "done" || data?.state?.data?.response?.status === "failed") {
                return false;
            }
            return 5000;
        },
        enabled: processVideoShotstackMutation.isSuccess && !!processVideoShotstackMutation.data?.response?.id,
        refetchOnWindowFocus: false,
    });

    // Init process video in shotstack 
    useEffect(() => {
        if (processAudioPython.isSuccess && processVideoDrupalMutation.data) {
            processVideoShotstackMutation.mutate({
                id: "93716852-d463-4886-a279-386202a9c7c3", //dev
                // id: "bcda1790-5d31-4f2f-8ba1-0b647775b2df", //prod
                merge: [
                    {
                        find: "MY_VIDEO",
                        replace: processVideoDrupalMutation.data.full_url 
                    }
                ]
            });
        }
    }, [processAudioPython.isSuccess, processVideoDrupalMutation.data]);

    // Start processing
    const startProcessing = async (videoFile: File, audioFile: File) => {
        try {
            // 1. upload video to drupal
            const drupalResponse = await processVideoDrupalMutation.mutateAsync(videoFile);
            
            // 2. audio proccesing
            const audioResponse = await processAudioPython.mutateAsync(audioFile);
            
            return { drupalResponse, audioResponse };
        } catch (error) {
            console.error("Error en el procesamiento:", error);
            alert(JSON.stringify(error));
            throw error;
        }
    };

    return {
        processVideoShotstackMutation,
        processStatusVideoQuery,
        processAudioPython,
        processVideoDrupalMutation,
        startProcessing
    };
};

export { useVideoAndAudioProcessing };