import { LoaderFunction } from "react-router-dom";

const anonymous = (): LoaderFunction => async () => {

    return {
        user: 'test',
    };
};
  
export { anonymous };