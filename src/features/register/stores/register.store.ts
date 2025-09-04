import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { RegisterInterface } from "../validations/register.validation";

interface RegisterState {
    registerData: RegisterInterface | null;
    isSendRegisterForm: boolean;
}

interface Actions {
    setRegisterData: (value: RegisterInterface) => void;
    setIsSendRegisterForm: (value: boolean) => void;
}

const storeAPI: StateCreator<RegisterState & Actions, [["zustand/devtools", never]]> = (set) =>({
    registerData: null,
    isSendRegisterForm: false,

    setRegisterData: (value) => set(({
        registerData: value
    }), false, 'setRegisterData' ),
    setIsSendRegisterForm: (value) => set(({
        isSendRegisterForm: value
    }), false, 'setIsSendRegisterForm' ),
});

export const useRegisterStore = create<RegisterState & Actions>()(
    persist(
        devtools(storeAPI, { name: "register-store" }),
        {
            name: "register-store",
            partialize: (state) => ({
                registerData: state.registerData,
            }),
        }
    )
);