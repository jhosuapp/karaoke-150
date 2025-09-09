import { useMutation } from "@tanstack/react-query";
import { postEnterCodeAction } from "../actions";
import { EnterCodeInterface } from "../validations";

const useEnterCodeMutation = () => {
    const mutation = useMutation({
        mutationFn: (body: EnterCodeInterface) => postEnterCodeAction(body),
    });


    return mutation;
}

export { useEnterCodeMutation }