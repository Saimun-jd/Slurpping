// import Blank from "./Blank";
import { useParams } from "react-router-dom";
import ChatHead from "./ChatHead";
import Messages from "./Messages";
import Options from "./Options";
import { useGetMessagesQuery } from "../../../features/messages/messagesApi";
import Error from "../../ui/Error";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSocket } from "../../../socket/socket";

var selectedChatCompare;

export default function ChatBody() {
	const { id } = useParams();
	const {
		data: messages,
		isLoading,
		isError,
		error,
	} = useGetMessagesQuery(id);
	const [allMsg, setAllMsg] = useState([]);
	const auth = useSelector((state) => state.auth);
	const myid = auth.userInfo.user._id;
	const socket = useSocket();

    const handleNewMessage = useCallback((newMsg) => {
        if (newMsg.sender._id === id || newMsg.receiver._id === id) {
            setAllMsg((prev) => {
                if (!prev.some(msg => msg._id === newMsg._id)) {
                    return [...prev, newMsg];
                }
                return prev;
            });
        }
    }, [id]);

    useEffect(() => {
        if (socket) {
            socket.emit('setup', { _id: myid });
            socket.on("message received", handleNewMessage);

            return () => {
                socket.off("message received", handleNewMessage);
            };
        }
    }, [socket, handleNewMessage, myid]);

    useEffect(() => {
        if (messages) {
            setAllMsg(messages);
        }
    }, [messages]);

    const combinedMessages = useMemo(() => {
        return allMsg.filter((msg, index, self) =>
            index === self.findIndex((t) => t._id === msg._id)
        );
    }, [allMsg]);

	let content = null;

	if (isLoading) {
		content = <div>Loading....</div>;
	} else if (!isLoading && isError) {
		content = <Error message={error} />;
	} else if (!isLoading && !isError && messages.length === 0) {
		content = <div>No message found</div>;
	} else if (!isLoading && !isError && messages.length > 0) {
		const a_message = messages[0];

		// console.log(a_message);
		// const {senderID, receiverID} = a_message;
		const friendName =
			myid === a_message.sender._id
				? a_message.receiver.username
				: a_message.sender.username;
		// const friendID =
		// 	myid === a_message.sender._id
		// 		? a_message.receiver._id
		// 		: a_message.sender._id;
		// socket.emit("join chat", friendID);
		// console.log("all messge is ", allMsg);

		content = (
			<>
				<ChatHead
					avatar="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
					name={friendName}
				/>
				<Messages messages={combinedMessages} />
				<Options />
			</>
		);
	}

	return (
		<div className="w-full lg:col-span-2 lg:block">
			<div className="w-full grid conversation-row-grid bg-[#F5F7FA]">
				{content}
			</div>
		</div>
	);
}
