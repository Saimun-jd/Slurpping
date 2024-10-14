import { apiSlice } from "../api/apiSlice";
import io from "socket.io-client";

export const conversationApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getConversations: builder.query({
			query: (_id) => `/api/message/${_id}`,
			providesTags: ["Message"],
		}),
		getLastConversation: builder.query({
			query: (_id) => `/api/message/lastmessage`,
			providesTags: ["Message"],
			async onCacheEntryAdded(
				arg,
				{ updateCachedData, cacheDataLoaded, cacheEntryRemoved }
			) {
				//create socket
				const socket = io(process.env.REACT_DEV_ENV === "development"? 'http://localhost:9000': process.env.REACT_APP_API_URL, {
					reconnectionDelay: 1000,
					reconnection: true,
					reconnectionAttempts: 10,
					transports: ["websocket"],
					agent: false,
					upgrade: false,
					rejectUnauthorized: false,
				});
                console.log("arg is ", arg);
				try {
					await cacheDataLoaded;
                    console.log("cache data loaded");
                    
                    // existing user
					socket.on("new message", (newMessage) => {
                        // console.log("new messsage ", newMessage);
                        const newMsg = newMessage.data.newMessage;
						updateCachedData((draft) => {
                            
							const conv = draft.find(
								(conv) =>
									(conv.senderID ===
										newMsg.senderID._id &&
										conv.receiverID ===
											newMsg.receiverID._id) ||
									(conv.senderID ===
										newMsg.receiverID._id &&
										conv.receiverID ===
											newMsg.senderID._id)
							);
                            
                            if(conv) {
                                conv.message = newMsg.message;
                                conv._id = newMsg._id;
                                conv.senderID = newMsg.senderID._id;
                                conv.receiverID = newMsg.receiverID._id;
                                conv.sender = newMsg.senderID.username;
                                conv.receiver = newMsg.receiverID.username;
                                conv.createdAt = newMsg.createdAt;
                                conv.updatedAt = newMsg.updatedAt;
								
                            } else{
                                // do nothing
                            }
							draft.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                            
						});
					});
                    // new friend
                    socket.on("new conversation", (newMessage) => {
                        
                        const newMsg = newMessage.data.newMessage;
						updateCachedData((draft) => {
                            
							const conv = draft.find(
								(conv) =>
									(conv.senderID ===
										newMsg.senderID._id &&
										conv.receiverID ===
											newMsg.receiverID._id) ||
									(conv.senderID ===
										newMsg.receiverID._id &&
										conv.receiverID ===
											newMsg.senderID._id)
							);
                            if(conv) {
                                console.log("yuhu username", newMsg.senderID?.username);
                                conv.message = newMsg.message;
                                conv._id = newMsg._id;
                                conv.senderID = newMsg.senderID._id;
                                conv.receiverID = newMsg.receiverID._id;
                                conv.sender = newMsg.senderID.username;
                                conv.receiver = newMsg.receiverID.username;
                                conv.createdAt = newMsg.createdAt;
                                conv.updatedAt = newMsg.updatedAt;
                            } else if(!conv && arg === newMsg.receiverID._id) {
                                // console.log("new msg from empty draft ", draft);
                                draft.push({
                                    _id: newMsg._id,
                                    message: newMsg.message,
                                    
                                    senderID: newMsg.senderID._id,
                                    receiverID: newMsg.receiverID._id,
                                    sender: newMsg.senderID.username,
                                    receiver: newMsg.receiverID.username,
                                    createdAt: newMsg.createdAt,
                                    updatedAt: newMsg.updatedAt
                                })
								
                            } else {
                                console.log("some thing else");
                            }
							draft.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
						});
					});

				} catch (err) {
					console.log(err?.message);
				}
				await cacheEntryRemoved;
				socket.close();
			},
		}),
	}),
});

export const { useGetConversationsQuery, useGetLastConversationQuery } =
	conversationApi;
