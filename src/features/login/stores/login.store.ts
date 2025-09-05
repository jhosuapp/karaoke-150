import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { LoginInterface } from "../validations/login.validation";

interface LoginState {
    loginData: LoginInterface | null;
    isSendLoginForm: boolean;
}

interface Actions {
    setLoginData: (value: LoginInterface) => void;
    setIsSendLoginForm: (value: boolean) => void;
}

const storeAPI: StateCreator<LoginState & Actions, [["zustand/devtools", never]]> = (set) =>({
    loginData: null,
    isSendLoginForm: false,

    setLoginData: (value) => set(({
        loginData: value
    }), false, 'setLoginData' ),
    setIsSendLoginForm: (value) => set(({
        isSendLoginForm: value
    }), false, 'setIsSendLoginForm' ),
});

export const useLoginStore = create<LoginState & Actions>()(
    persist(
        devtools(storeAPI, { name: "login-store" }),
        {
            name: "login-store",
            partialize: (state) => ({
                loginData: state.loginData,
            }),
        }
    )
);