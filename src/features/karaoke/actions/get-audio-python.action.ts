import { audioApi } from "../../../shared/api";
import { GetResponseAudioInterface } from "../interfaces";

const getAudioPythonAction = async ( ):Promise<GetResponseAudioInterface> => {
    const { data } = await audioApi.get<GetResponseAudioInterface>('/song-info/');

    return data;
}

export { getAudioPythonAction }