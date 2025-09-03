import { videoApi } from "../../../shared/api";
import { GetVideoResponseInterface } from "../interfaces";

const getVideoAction = async (id: string):Promise<GetVideoResponseInterface> => {
    const { data } = await videoApi.get<GetVideoResponseInterface>(`/stage/render/${id}`);

    return data;
}

export { getVideoAction }