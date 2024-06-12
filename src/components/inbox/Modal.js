import { useEffect, useState } from "react";
import { useSendNewMessageMutation } from "../../features/messages/messagesApi";
import Error from "../ui/Error";

export default function Modal({ open, control }) {
    const [username, setUser] = useState('');
    const [message, setMessage] = useState('');
    const [failed, setFailed] = useState(false);
    const [send, { isError, error, isSuccess, isLoading }] = useSendNewMessageMutation();

    useEffect(() => {
        if (isError) 
            setFailed(true);
    }, [isError]);

    useEffect(() => {
            if(isSuccess) {
                setUser('');
                setMessage('');
                // console.log("MOdal is closing");
                control();
            }
        
    }, [ control, isSuccess]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (username && message && message.trim() !== '') {
            await send({ username, message });
        }
    };

    return (
        open && (
            <>
                <div
                    onClick={control}
                    className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
                ></div>
                <div 
                    onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
                    className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
                >
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Send message
                    </h2>
                    <form className="mt-8 space-y-6" onSubmit={handleSend}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="to" className="sr-only">
                                    To
                                </label>
                                <input
                                    id="to"
                                    name="to"
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUser(e.target.value)}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Send to"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="sr-only">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Message"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                                disabled={isLoading}
                            >
                                Send Message
                            </button>
                        </div>

                        {failed && <Error message={error?.data?.error} />}
                    </form>
                </div>
            </>
        )
    );
}
