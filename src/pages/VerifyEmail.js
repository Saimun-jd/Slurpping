import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useVerifyEmailQuery } from '../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../features/auth/authSlice';

function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading, error } = useVerifyEmailQuery(
    new URLSearchParams(location.search).get('token')
  );

  useEffect(() => {
    if (error) {
      console.log("verification error ", error?.message)
    }
  }, [error, navigate]);

  useEffect(() => {
		const localAuth = localStorage?.getItem("userInfo");
		const token = localStorage?.getItem("accessToken");
		if (localAuth?.userInfo && token?.accessToken) {
			dispatch(
				userLoggedIn({
					userInfo: JSON.parse(localAuth.userInfo),
					accessToken: JSON.parse(token.accessToken),
				})
			);
		}
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Verifying Email...</h1>

        {isLoading ? (
          <p className="text-gray-600 text-center">Verifying your email. Please wait...</p>
        ) : error ? (
          <p className="text-red-500 text-center">
            Verification failed: {error.data?.error || 'Unknown error'}
          </p>
        ) : data?.message ? (
          <div className="text-center">
            <p className="text-green-500 mb-4">{data.message}</p>
            <button 
              onClick={() => navigate('/inbox')} 
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
            >
              Go to Inbox
            </button>
          </div>
        ) : (
          <p className="text-gray-600 text-center">An unexpected error occurred.</p>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;

