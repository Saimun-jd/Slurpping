import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { userLoggedIn } from './authSlice';

const GoogleAuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchGoogleAuthInfo = async () => {
      try {
        // a small delay
        // await new Promise(resolve => setTimeout(resolve, 1000));
        const param = new URLSearchParams(location.search);
        const id = param.get('id');
        if(!id) {
          console.log("id not found from param");
        }

        console.log('Attempting to fetch Google auth info...');
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/mongo-auth-info?id=${id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        
        // console.log('Response status:', response.status);
        // console.log('Response headers:', response.headers);

        // if (!response.ok) {
        //   const errorText = await response.text();
        //   throw new Error(`Failed to fetch Google auth info: ${response.status} ${errorText}`);
        // }
        
        const data = await response.json();
        console.log('Received data:', data);
        
        if (!data.user || !data.accessToken) {
          throw new Error('Invalid data received from server');
        }

        localStorage.setItem("userInfo", JSON.stringify({user: data.user}));
        localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
        dispatch(userLoggedIn({
          userInfo: {user: data.user},
          accessToken: data.accessToken,
        }));
        
        navigate('/inbox');
      } catch (error) {
        console.error('Error in GoogleAuthSuccess:', error);
        setError(error.message);
      }
    };

    fetchGoogleAuthInfo();
  }, [dispatch, navigate, location]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div>Completing Google login...</div>;
};

export default GoogleAuthSuccess;