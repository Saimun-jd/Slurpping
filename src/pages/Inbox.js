import { useEffect, useState } from "react";
import ChatBody from "../components/inbox/chatbody/ChatBody";
import Navigation from "../components/inbox/Navigation";
import Sidebar from "../components/inbox/Sidebar";

export default function Inbox() {
    return (
        <div>
            <Navigation />
            <div className="max-w-9xl mx-auto">
                <div className="min-w-full border rounded flex lg:grid lg:grid-cols-3">
                    <Sidebar/>
                    <ChatBody />
                </div>
            </div>
        </div>
    );
}