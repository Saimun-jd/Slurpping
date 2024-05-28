import {apiSlice} from "../api/apiSlice"

export const conversationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query({
            query: (_id) => `/api/message/${_id}`,
            providesTags: ["Message"]
        },
    ),
        getLastConversation: builder.query({
            query: (_id) => `/api/message/lastmessage`,
            providesTags: ["Message"]
        })
    })
})

export const {useGetConversationsQuery, useGetLastConversationQuery} = conversationApi;