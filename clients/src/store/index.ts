import {combineReducers, configureStore} from "@reduxjs/toolkit";
import listReducer from "./reducers/ListSlice"
import {listAPI} from "../services/ListService";



const rootReducer = combineReducers({
    listReducer,
    [listAPI.reducerPath] :listAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(listAPI.middleware)
    });
};

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']