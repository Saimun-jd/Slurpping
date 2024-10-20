import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "../features/auth/authApi";
import Error from "../components/ui/Error"
import { useDispatch } from "react-redux";
import { Loader } from "lucide-react";

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeTerm, setAgreeTerm] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [register, {data, isLoading, error: responseError}] = useRegisterMutation();
    useEffect(() => {
        if(responseError?.data){
            setErrorMessage(responseError.data.error);
        }
        if(data) {
            sessionStorage.setItem('registrationDone', 'true');
            navigate("/", {state: {message: 'Registration completed successfully, please verify your email to login.'}});
        }
    }, [data, responseError, navigate, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        if(agreeTerm){
            if(confirmPassword === password) {
                register({username: name, email, password, confirmPassword});
            } else {
                setErrorMessage("passwords do not match");
            }
        } else {
            setErrorMessage("Please agree to the term conditions");
        }
    }
    
    return (
        <div className="grid place-items-center h-screen bg-gradient-to-r from-slate-900 to-slate-700">
            <div className="min-h-full flex items-center justify-center py-2 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-4">
                    <div className="flex flex-col items-center justify-center">
                        <Link to="/">
                            <img
                                className="mx-auto h-18"
                                src="/chatify-logo.png"
                                alt="Chatify-chat without hesitation"
                            />
                        </Link>
                        <h2 className="text-center text-3xl font-extrabold text-blue-500">
                            Create your account
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="name" className="sr-only">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    name="Name"
                                    type="Name"
                                    autoComplete="Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="username"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email-address"
                                    className="sr-only"
                                >
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="sr-only"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="confirmPassword"
                                    autoComplete="current-confirmPassword"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="confirmPassword"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="agree"
                                    name="agree"
                                    type="checkbox"
                                    checked={agreeTerm}
                                    required
                                    onChange={(e) => setAgreeTerm(e.target.checked)}
                                    className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="accept-terms"
                                    className="ml-2 block text-sm text-blue-500"
                                >
                                    Agreed with the terms and condition
                                </label>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                disabled={isLoading || !name || !email || !password || !confirmPassword || !agreeTerm}
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                                {isLoading? <Loader className="animate-spin"/>: 'Sign Up'}
                            </button>
                        </div>
                        {
                        errorMessage !== '' &&
                        <Error message={errorMessage}/>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}
