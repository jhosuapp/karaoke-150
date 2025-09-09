import { drupalApi } from "../api";
import { EnterCodeInterface } from "../validations";

const postEnterCodeAction = async (body:EnterCodeInterface): Promise<any> => {
    const { data } = await drupalApi.post<any>("/api/karaoke/send-code/", body);

    return data;
};

export { postEnterCodeAction };