// import Blank from "./Blank";
import { useParams } from "react-router-dom";
import ChatHead from "./ChatHead";
import Messages from "./Messages";
import Options from "./Options";
import { useGetMessagesQuery } from "../../../features/messages/messagesApi";
import Error from "../../ui/Error"
import { useSelector } from "react-redux";

export default function ChatBody() {
    const {id} = useParams();
    const {data: messages, isLoading, isError, error} = useGetMessagesQuery(id);
    const auth = useSelector(state => state.auth);
    const myid = auth.userInfo.user._id;

    let content = null;

    if(isLoading) {
        content = (
            <div>Loading....</div>
        )
    } else if(!isLoading && isError) {
        content = <Error message = {error}/>
    } else if(!isLoading && !isError && messages.length === 0) {
        content = <div>No message found</div>
    } else if(!isLoading && !isError && messages.length > 0) {
        const a_message = messages[0];
        const {senderID, receiverID} = a_message;
        const friendName = myid === senderID._id? receiverID.username: senderID.username;
        content = (
            <>
                <ChatHead
                    avatar="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
                    name={friendName}
                />
                <Messages messages={messages}/>
                <Options />
            </>
        );
    }

    return (
        <div className="w-full lg:col-span-2 lg:block">
            <div className="w-full grid conversation-row-grid">
                {content}
            </div>
        </div>
    );
}
