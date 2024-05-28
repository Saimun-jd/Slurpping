
import {apiSlice} from "../api/apiSlice"

export const messagesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (id) => `/api/message/${id}`,
            providesTags: ['Message']
        }),
        sendMessage: builder.mutation({
            query: ({id, ...data}) => ({
				url: `/api/message/send/${id}`,
				method: "POST",
				body: data,
			}),
            invalidatesTags: (result, error) => error? []: ['Message']
        }),
        sendNewMessage: builder.mutation({
            query: (data) => ({
                url: `/api/message/send`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: (result, error) => error? []: ['Message', 'User']
        })
    })
})

export const {useGetMessagesQuery, useSendMessageMutation, useSendNewMessageMutation} = messagesApi;