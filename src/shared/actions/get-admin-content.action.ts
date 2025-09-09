import { drupalApi } from "../api";
import { ResponseAdminContentInterface } from "../interfaces";

const getAdminContentAction = async (): Promise<ResponseAdminContentInterface> => {
    const { data } = await drupalApi.get<ResponseAdminContentInterface>("/api/karaoke/landing");

    return data;
};

export { getAdminContentAction };