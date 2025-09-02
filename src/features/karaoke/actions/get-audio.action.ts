import { audioApi } from "../../../shared/api";

const getAudioAction = async ( ):Promise<any> => {
    const { data } = await audioApi.get<any>('/song-info/');

    return data;
}

export { getAudioAction }