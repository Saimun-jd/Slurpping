import { useSelector } from "react-redux";
import Message from "./Message";

export default function Messages({messages = []}) {
    const auth = useSelector(state => state.auth);
    const myid = auth.userInfo.user._id;
    // console.log(messages);
    return (
        <div className="relative w-full h-[calc(100vh_-_197px)] p-6 overflow-y-auto flex flex-col-reverse">
            <ul className="space-y-2">
                {messages?.map((message) => {
                    const {message: msg, sender, receiver, _id} = message;
                    
                    const alignment = myid === sender._id ? "end": "start";
                    return (
                        <Message key={_id} justify={alignment} message={msg} />
                    )
                })}
            </ul>
        </div>
    );
}
