import { createModel } from "@rematch/core";
import api from "../../helpers/api";
import { RootModel } from ".";

export interface signinOption {
    userName: string;
    password: string;
}

export const Auth = createModel<RootModel>()({
    state: {
        test: 1
    },
    reducers: {
        reset: () => { }
    },
    effects: () => ({
        async signin(options: signinOption) {
            const signinResult = await api.post("/user/signin", { ...options })

            return true
        }
    })
})