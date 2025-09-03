import { audioApi } from "../../../shared/api";
import { PostResponseAudioInterface } from "../interfaces";

const postAudioPythonAction = async (file: File): Promise<PostResponseAudioInterface> => {
    const formData = new FormData();
    formData.append("audio", file);

    const { data } = await audioApi.post<PostResponseAudioInterface>("/process-audio/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return data;
};

export { postAudioPythonAction };