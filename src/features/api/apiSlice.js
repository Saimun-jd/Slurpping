import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NODE_ENV === "development"? 'http://localhost:9000': process.env.REACT_APP_API_URL,
        prepareHeaders: async (headers, {getState, endpoint}) => {
            const token = getState()?.auth?.accessToken;
            
            if(token) {
                headers.set('Authorization', `Bearer ${token}`);
            } 
            return headers;
        },
    }),
    tagTypes: ['Message', 'User'],
    endpoints: (builder) => ({})
})