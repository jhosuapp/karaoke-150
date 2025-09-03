import { videoApi } from "../../../shared/api";
import { PostVideoBodyInterface } from "../interfaces";

const postVideoAction = async (body: PostVideoBodyInterface):Promise<any> => {
    // const { data } = await videoApi.post('/edit/v1/templates/render', body);
    const { data } = await videoApi.post('/edit/stage/templates/render', body);

    return data;
}

export { postVideoAction }