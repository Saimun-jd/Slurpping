import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function ChatItem({ avatar, name, lastMessage, lastTime, userID, activeChat }) {
    
    return (
        <Link
            className={`flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out bg-[#34495E] border-b border-gray-300 cursor-pointer hover:bg-[#445566] focus:outline-none ${activeChat === userID? 'bg-[#2980B9]': ''}`}
            to={`/inbox/${userID}`}
        >
            <img
                className="object-cover w-10 h-10 rounded-full"
                src={avatar}
                alt={name}
            />
            <div className="w-full pb-2 hidden md:block">
                <div className="flex justify-between">
                    <span className="block ml-2 font-semibold text-white">
                        {name}
                    </span>
                    <span className="block ml-2 text-sm text-white">
                        {lastTime}
                    </span>
                </div>
                <span className="block ml-2 text-sm text-white">
                    {lastMessage}
                </span>
            </div>
        </Link>
    );
}
