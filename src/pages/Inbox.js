import { useEffect, useState } from "react";
import ChatBody from "../components/inbox/chatbody/ChatBody";
import Navigation from "../components/inbox/Navigation";
import Sidebar from "../components/inbox/Sidebar";
import { useSocket } from "../socket/socket";
import { useSelector } from "react-redux";

export default function Inbox() {
    const socket = useSocket();
     const [socketConnected, setSocketConnected] = useState(false);
     const auth = useSelector(state => state.auth);
    const myid = auth.userInfo.user._id;
    useEffect(() => {
        if(socket) {
            socket.emit('setup', auth.userInfo.user);
            socket.on('connection', () =>  {
                setSocketConnected(true);
            })
        }
	}, []);
    return (
        <div>
            <Navigation />
            <div className="max-w-9xl mx-auto">
                <div className="min-w-full border rounded flex lg:grid lg:grid-cols-3">
                    <Sidebar />
                    <ChatBody />
                </div>
            </div>
        </div>
    );
}
