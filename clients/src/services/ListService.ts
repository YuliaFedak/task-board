import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {CreateList, IList, UpdateList} from "../models/IList";
import {CreateTask, ITasks, UpdateTask} from "../models/ITasks";
import {IHistory} from "../models/IHistory";

export const listAPI = createApi({
    reducerPath: 'listAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/'
    }),
    tagTypes: ['List', "History"],
    endpoints: (build) => ({
        //List
        fetchAllLists: build.query<IList[], void>({
            query: () => ({
                url: `/list`
            }),
            providesTags: result => ['List']
        }),
        createList: build.mutation<CreateList, CreateList>({
            query: (list) => ({
                url: `/list`,
                method: `POST`,
                body: list
            }),
            invalidatesTags: ['List', "History"]
        }),
        updateList: build.mutation<UpdateList, UpdateList>({
            query: (list) => ({
                url: `/list/${list.id}`,
                method: `PATCH`,
                body: list
            }),
            invalidatesTags: ['List', "History"]
        }),
        deleteList: build.mutation<IList, IList>({
            query: (list) => ({
                url: `/list/${list.id}`,
                method: `DELETE`
            }),
            invalidatesTags: ['List', 'History']
        }),

        // Task
        createTask: build.mutation<CreateTask, CreateTask>({
            query: (task) => ({
                url: `tasks`,
                method: `POST`,
                body: task
            }),
            invalidatesTags: ['List', "History"]
        }),
        updateTask: build.mutation<UpdateTask, UpdateTask>({
            query: (task) => ({
                url: `tasks/${task.id}`,
                method: 'PATCH',
                body: task
            }),
            invalidatesTags: ['List', "History"]
        }),
        updateTaskListId: build.mutation<{ id: number, listId: number }, { id: number, listId: number }>({
            query: ({id, listId}) => ({
                url: `tasks/listId/${id}`,
                method: 'PATCH',
                body: {listId}
            }),
            invalidatesTags: ['List', "History"]
        }),
        deleteTask: build.mutation<ITasks, ITasks>({
            query: (task) => ({
                url: `tasks/${task.id}`,
                method: `DELETE`,
            }),
            invalidatesTags: ['List', "History"]
        }),
        fetchAllHistory: build.query<IHistory[], void>({
            query: () => ({
                url: 'history'
            }),
            providesTags: ["History"]
        })
    })
});

export const {
    useFetchAllListsQuery,
    useCreateListMutation,
    useUpdateListMutation,
    useDeleteListMutation,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useUpdateTaskListIdMutation,
    useDeleteTaskMutation,
    useFetchAllHistoryQuery
} = listAPI;