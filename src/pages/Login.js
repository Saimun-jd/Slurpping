import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Error from "../components/ui/Error";
import { useLoginMutation } from "../features/auth/authApi";
import { useDispatch} from "react-redux";
import Success from "../components/ui/Success";
import { Loader } from "lucide-react";

export default function Login() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [registrationStatus, setRegistrationStatus] = useState('');
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [login, {data, isLoading, error: responseError}] = useLoginMutation();
    
    useEffect(() => {
        if(responseError?.data){
            setErrorMessage(responseError.data.error);
            setRegistrationStatus('');
        }
        else if(data?.accessToken && data?.user) {
            // localStorage.getItem("accessToken")? console.log("yesss"): console.log("NOOO");
            console.log("setting auth state")
            // localStorage.setItem(
			// 			"userInfo",
			// 			JSON.stringify({user: data?.user })
			// 		);
			// 		localStorage.setItem(
			// 			"accessToken",
			// 			JSON.stringify({
			// 				accessToken: data?.accessToken,
			// 			})
			// 		);
            // dispatch(userLoggedIn({userInfo: data.user, accessToken: data.accessToken}));
			navigate("/inbox");
        }
    }, [data, responseError, navigate, dispatch]);

    useEffect(() => {
        // console.log("location from inbox ", location.state.message);
        const regiDone = sessionStorage.getItem('registrationDone');
        if(regiDone){
            setRegistrationStatus("Registration completed successfully, please check your email and verify to login.");
        }
        sessionStorage.removeItem('registrationDone');
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        if(username && password) {
            login({username, password});
        }
    }

    // console.log(registrationStatus);

    return (
        <div className="grid place-items-center h-screen bg-gradient-to-r from-slate-900 to-slate-700">
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <Link to="/">
                            <img
                                className="mx-auto h-22 w-auto"
                                src="/chatify-logo.png"
                                alt="Chatify- chat without hesitation"
                            />
                        </Link>
                        <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent">
                            Sign in to your account
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label
                                    htmlFor="email-address"
                                    className="sr-only"
                                >
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="username"
                                    autoComplete="username"
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Username"
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <div className="text-sm">
                                <Link
                                    to="/register"
                                    className="font-medium text-blue-600 hover:text-blue-500"
                                >
                                    Register
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                disabled={isLoading}
                            >
                                {isLoading? <Loader className="animate-spin"/>: 'Sign In'}
                            </button>
                        </div>
                        {
                        errorMessage !== '' &&
                        <Error message={errorMessage}/>
                        }
                        {
                            (registrationStatus !== '') && <Success message={registrationStatus}/>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}
