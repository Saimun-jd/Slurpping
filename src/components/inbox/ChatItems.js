import ChatItem from "./ChatItem";
import { useGetLastConversationQuery } from "../../features/conversation/conversationsApi";
import Error from "../ui/Error";
import TimeAgo from "../TimeAgo";
import { useSelector } from "react-redux";

export default function ChatItems() {
	// const { userInfo } = useSelector((state) => state.auth) || {};
	// const _id = userInfo.user._id;
	const userInfo = JSON.parse(localStorage.getItem("userInfo"));
	const _id = userInfo.user._id;
	const {
		data: lastConversation = [],
		isLoading,
		isError,
		error,
	} = useGetLastConversationQuery(_id);

	let content = null;
	if (isLoading) {
		content = <li className="m-2 text-center">Loading...</li>;
	} else if (!isLoading && isError) {
		const errorMessage = typeof error?.data.error === 'string' ? error.data.error : 'An fucking error occurred';
		content = (
			<li className="m-2 text-center">
				<Error message={errorMessage} />
			</li>
		);
	} else if (!isLoading && !isError && lastConversation?.length === 0) {
		content = <li className="m-2 text-center">No Conversations found</li>;
	} else if (!isLoading && !isError && lastConversation?.length > 0) {
		content = lastConversation.map((conversation) => {
			const friendName = conversation.senderID === _id? conversation.receiver: conversation.sender
			const friendID = conversation.senderID === _id? conversation.receiverID: conversation.senderID
			return (
				<li key={conversation._id}>
					<ChatItem		
						avatar="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
						name={friendName}
						lastMessage={conversation.message}
						lastTime={<TimeAgo timestamp={conversation.createdAt}/>}
						userID={friendID}
					/>
				</li>
			);
		});
	}
	return <ul>{content}</ul>;
}