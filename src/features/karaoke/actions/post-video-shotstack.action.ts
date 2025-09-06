import { videoApi } from "../../../shared/api";
import { PostVideoBodyInterface } from "../interfaces";

const postVideoShotstackAction = async (body: PostVideoBodyInterface):Promise<any> => {
    // const { data } = await videoApi.post('/edit/v1/templates/render', body); // prod
    const { data } = await videoApi.post('/edit/stage/templates/render', body); // dev

    return data;
}

export { postVideoShotstackAction }