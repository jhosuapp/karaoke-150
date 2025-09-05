import { drupalApi } from "../../../shared/api";

const postVideoDrupalAction = async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append("video", file);

    const { data } = await drupalApi.post<any>("/video-upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return data;
};

export { postVideoDrupalAction };