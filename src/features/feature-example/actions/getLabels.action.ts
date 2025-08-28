
import { githubApi } from "../../../shared/api";
import { LabelInterface } from "../interfaces";

const getLabels = async():Promise<LabelInterface[]> => {
    const { data } = await githubApi.get<LabelInterface[]>('/labels');
  
    return data;
}


export { getLabels }