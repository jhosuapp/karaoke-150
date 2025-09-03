import { audioApi } from "../../../shared/api";

const postProcessAudioAction = async ():Promise<any> => {
    const { data } = await audioApi.get<any>('/process-audio/');

    return data;
}

export { postProcessAudioAction }