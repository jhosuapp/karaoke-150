import { videoApi } from "../../../shared/api";
import { GetVideoResponseInterface } from "../interfaces";

const getVideoShotstackAction = async (id: string):Promise<GetVideoResponseInterface> => {
    // const { data } = await videoApi.get<GetVideoResponseInterface>(`/v1/render/${id}`); // prod
    const { data } = await videoApi.get<GetVideoResponseInterface>(`/stage/render/${id}`); // dev

    return data;
}

export { getVideoShotstackAction }