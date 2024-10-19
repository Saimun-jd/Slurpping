import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Error from "../components/ui/Error";
import { useLoginMutation } from "../features/auth/authApi";
import { useDispatch} from "react-redux";
import Success from "../components/ui/Success";
import { Loader } from "lucide-react";
import {userLoggedIn} from '../features/auth/authSlice';

export default function Login() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [registrationStatus, setRegistrationStatus] = useState('');
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();

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

    // useEffect(() => {
    //     const fetchGoogleAuthInfo = async () => {
    //   try {
    //     // a small delay
    //     // await new Promise(resolve => setTimeout(resolve, 1000));

    //     console.log('Attempting to fetch Google auth info...');
    //     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/google/callback`, {
    //       method: 'GET',
    //       credentials: 'include',
    //       headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //       },
    //     });
        
    //     console.log('Response status:', response.status);
    //     console.log('Response headers:', response.headers);

    //     if (!response.ok) {
    //       const errorText = await response.text();
    //       throw new Error(`Failed to fetch Google auth info: ${response.status} ${errorText}`);
    //     }
        
    //     const data = await response.json();
    //     console.log("received data ", data);
    //     console.log('Received data:', data);
        
    //     if (!data.user || !data.accessToken) {
    //       throw new Error('Invalid data received from server');
    //     }

    //     localStorage.setItem("userInfo", JSON.stringify({user: data.user}));
    //     localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
    //     dispatch(userLoggedIn({
    //       userInfo: {user: data.user},
    //       accessToken: data.accessToken,
    //     }));
        
    //     navigate('/inbox');
    //   } catch (error) {
    //     console.error('Error in GoogleAuthSuccess:', error);
    //     // setError(error.message);
    //     navigate("/");
    //   }
    // };

    // fetchGoogleAuthInfo();
    // }, [dispatch, navigate])

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        console.log("url params ", urlParams);
    }, [location])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        if(username && password) {
            login({username, password});
        }
    }

    const handleGoogleLogin = () => {
        window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/google/callback`
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
                        <div>
                            <button
                                onClick={handleGoogleLogin}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <span className="absolute left-2">
                                    <svg width="20px" height="20px" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/></svg>
                                </span>
                                <span>
                                Sign in with google
                                </span>
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
