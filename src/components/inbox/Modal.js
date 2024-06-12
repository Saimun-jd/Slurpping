import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { useSendNewMessageMutation } from "../../features/messages/messagesApi";
import { useFindUserQuery } from "../../features/auth/authApi";
import Error from "../ui/Error";
import "./style.css";

export default function Modal({ open, control }) {
	const [username, setUser] = useState("");
	const [message, setMessage] = useState("");
	const [failed, setFailed] = useState(false);
	const [userCheck, setUserChecked] = useState(false);
	const [debounceUser, setDebounceUser] = useState("");

	const [send, { isError, error, isSuccess, isLoading }] =
		useSendNewMessageMutation();
	const {
		data,
		isError: findError,
		isLoading: findLoading,
	} = useFindUserQuery(debounceUser, { skip: !userCheck });

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedCheckUserExistence = useCallback(
		debounce((value) => {
			setDebounceUser(value);
			setUserChecked(!!value);
		}, 1000),
		[]
	);

	const handleChange = (e) => {
		const value = e.target.value;
		setUser(value);
		debouncedCheckUserExistence(value);
	};

	useEffect(() => {
		if (isError) setFailed(true);
	}, [isError]);

	useEffect(() => {
		if (isSuccess) {
			setUser("");
			setMessage("");
			setFailed(false);
			control();
		}
	}, [isSuccess, control]);

	useEffect(() => {
		if(userCheck) setFailed(false);
	}, [userCheck])

	const handleSend = async (e) => {
		e.preventDefault();
		if (username && message && message.trim() !== "") {
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
							<div className="flex items-center relative">
								<label htmlFor="to" className="sr-only">
									To
								</label>
								<input
									id="to"
									name="to"
									type="text"
									required
									value={username}
									onChange={handleChange}
									className="appearance-none rounded-none py-2 px-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm w-full pr-10"
									placeholder="Send to"
								/>
								{/* Icon container positioned absolutely within the input with reduced margin */}
								<div className="absolute inset-y-0 right-1 flex items-center">
									{username.trim() !== "" && findLoading && (
										<div className="loading-spinner mr-1"></div>
									)}
									{username.trim() !== "" &&
										!findLoading &&
										findError && (
											<span className="text-red-500 mr-1">
												❌
											</span>
										)}
									{username.trim() !== "" &&
										!findLoading &&
										data &&
										!findError && (
											<span className="text-green-500">
												✅
											</span>
										)}
								</div>
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
