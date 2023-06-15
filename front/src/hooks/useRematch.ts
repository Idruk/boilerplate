/* eslint-disable */
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { IRootState, Dispatch } from "../stores/rematch";
import { RootModel } from "../stores/models"


const useModel = <M extends keyof RootModel = keyof RootModel>(model: M) => <MD>(
    selector: (state: IRootState[M], dispatch: Dispatch[M]) => MD,
) => {
    const dispatch = useDispatch<Dispatch>();

    return useSelector(
        (state: IRootState) => selector(state[model], dispatch[model]),
        shallowEqual,
    );
};

export const useAuth = useModel("Auth")