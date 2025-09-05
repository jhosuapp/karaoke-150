import { drupalApi } from "../../../shared/api";
import { PostVideoResponseInterface } from "../interfaces";

const postVideoDrupalAction = async (file: File): Promise<PostVideoResponseInterface> => {
    const formData = new FormData();
    formData.append("video", file);

    const { data } = await drupalApi.post<PostVideoResponseInterface>("/video-upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return data;
};

export { postVideoDrupalAction };