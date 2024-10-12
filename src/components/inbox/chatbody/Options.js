import { useState } from "react";
import { useSendMessageMutation } from "../../../features/messages/messagesApi";
import { useParams } from "react-router-dom";

export default function Options() {
	const { id } = useParams();
	const [message, setMessage] = useState("");
	const [send] =
		useSendMessageMutation();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (message.trim() !== "") {
			await send({ id, message });
			setMessage("");
		}
	};
	return (
		<form onSubmit={handleSubmit}>
			<div className="flex items-center justify-between w-full p-3 border-t border-[#BDC3C7]">
				<input
					type="text"
					placeholder="Message"
					className="block w-full py-2 pl-4 mx-3 bg-gray-100 focus:ring focus:ring-violet-500 rounded-full outline-none focus:text-[#2C3E50]"
					name="message"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					required
				/>
				<button type="submit">
					<svg
						className="w-5 h-5 text-blue-500 origin-center transform rotate-90"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
					</svg>
				</button>
			</div>
		</form>
	);
}