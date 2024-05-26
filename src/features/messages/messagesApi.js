
import {apiSlice} from "../api/apiSlice"

export const messagesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (id) => `/api/message/${id}`
        }),
    })
})

export const {useGetMessagesQuery} = messagesApi;