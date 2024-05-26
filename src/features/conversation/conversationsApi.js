import {apiSlice} from "../api/apiSlice"

export const conversationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query({
            query: (_id) => `/api/message/${_id}`
        }),
        getLastConversation: builder.query({
            query: (_id) => `/api/message/lastmessage`,
        })
    })
})

export const {useGetConversationsQuery, useGetLastConversationQuery} = conversationApi;