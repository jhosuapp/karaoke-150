import { audioApi } from "../../../shared/api";
import { ResponseAudio } from "../interfaces";

const getAudioAction = async ( ):Promise<ResponseAudio> => {
    const { data } = await audioApi.get<ResponseAudio>('/song-info/');

    return data;
}

export { getAudioAction }