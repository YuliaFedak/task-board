import {IList} from "../../models/IList";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ListState {
    lists: IList[];
    isLoading: boolean;
    error: string;
    count: number;
}

const initialState: ListState = {
    lists: [],
    isLoading: false,
    error: '',
    count: 0
}

export const listSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        listsFetching(state) {
            state.isLoading = true;
        },
        listsFetchingSuccess(state, action: PayloadAction<IList[]>) {
            state.isLoading =false;
            state.error = '';
            state.lists = action.payload
        },
        listsFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload
        },
        deleteList(state, action: PayloadAction<number>) {
            state.lists = state.lists.filter((list) => list.id !== action.payload);
        },
        deleteListError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
        createListStart: state => {
            state.isLoading = true;
            state.error = '';
        },
        createListSuccess: (state, action: PayloadAction<IList[]>) => {
            state.isLoading = false;
            state.lists = state.lists.concat(action.payload);
        },
        createListFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export default listSlice.reducer;