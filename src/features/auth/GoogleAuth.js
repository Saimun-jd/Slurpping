import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLoggedIn } from './authSlice';

const GoogleAuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoogleAuthInfo = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/auth/google-auth-info', {
          credentials: 'include' // Necessary for including cookies
        });
        if (!response.ok) {
          throw new Error('Failed to fetch Google auth info');
        }
        const data = await response.json();
        
        // Dispatch login success action
        localStorage.setItem(
						"userInfo",
						JSON.stringify({user: data?.user })
					);
					localStorage.setItem(
						"accessToken",
						JSON.stringify(
							data?.accessToken,
						)
					);
					dispatch(
						userLoggedIn({
							userInfo: {user: data?.user},
							accessToken: data?.accessToken,
						})
					);
        
        // Redirect to inbox
        navigate('/inbox');
      } catch (error) {
        console.error('Error fetching Google auth info:', error);
        // Handle error (e.g., show error message, redirect to login page)
        navigate('/login');
      }
    };

    fetchGoogleAuthInfo();
  }, [dispatch, navigate]);

  return <div>Completing Google login...</div>;
};

export default GoogleAuthSuccess;