import { apiSlice } from "../api/apiSlice";
import io from "socket.io-client";

export const messagesApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getMessages: builder.query({
			query: (id) => `/api/message/${id}`,
			providesTags: ["Message"],
			async onCacheEntryAdded(
				arg,
				{ updateCachedData, cacheDataLoaded, cacheEntryRemoved }
			) {
				const socket = io("http://localhost:9000", {
					reconnectionDelay: 1000,
					reconnection: true,
					reconnectionAttempts: 10,
					transports: ["websocket"],
					agent: false,
					upgrade: false,
					rejectUnauthorized: false,
				});
				try {
					await cacheDataLoaded;
					socket.on("new message", (newMessage) => {
						const newMsg = newMessage.data.newMessage;
						// console.log("new messsage ", newMessage);
						updateCachedData((draft) => {
							if (
								(draft[0].sender._id === newMsg.senderID._id &&
									draft[0].receiver._id ===
										newMsg.receiverID._id) ||
								(draft[0].receiver._id === newMsg.senderID._id &&
									draft[0].sender._id === newMsg.receiverID._id)
							) {
								draft.push({
									_id: newMsg._id,
									sender: {
										_id: newMsg.senderID._id,
									},
									receiver: {
										_id: newMsg.receiverID._id,
									},
									message: newMsg.message,
									createdAt: newMsg.createdAt,
									updatedAt: newMsg.updatedAt,
								});
							}
						});
					});
				} catch (error) {
					console.log(error?.message);
				}
				await cacheEntryRemoved;
				socket.close();
			},
		}),
		sendMessage: builder.mutation({
			query: ({ id, ...data }) => ({
				url: `/api/message/send/${id}`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: (result, error) => (error ? [] : ["Message"]),
		}),
		sendNewMessage: builder.mutation({
			query: (data) => ({
				url: `/api/message/send`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: (result, error) =>
				error ? [] : ["Message", "User"],
		}),
	}),
});

export const {
	useGetMessagesQuery,
	useSendMessageMutation,
	useSendNewMessageMutation,
} = messagesApi;
