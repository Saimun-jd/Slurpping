import { apiSlice } from "../api/apiSlice"
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation({
			query: (data) => ({
				url: "/api/auth/signup",
				method: "POST",
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const result = await queryFulfilled;
					localStorage.setItem(
						"userInfo",
						JSON.stringify({ user: result.data?.user })
					);
					localStorage.setItem(
						"accessToken",
						JSON.stringify(
							result.data?.accessToken,
						)
					);
					// dispatch(
					// 	userLoggedIn({
					// 		userInfo: result.data.user,
					// 		accessToken: result.data.accessToken,
					// 	})
					// );
				} catch (error) {
					// do nothing
					console.log(error);
				}
			},
		}),
		login: builder.mutation({
			query: (data) => ({
				url: "/api/auth/login",
				method: "POST",
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const result = await queryFulfilled;
					localStorage.setItem(
						"userInfo",
						JSON.stringify({user: result.data?.user })
					);
					localStorage.setItem(
						"accessToken",
						JSON.stringify(
							result.data?.accessToken,
						)
					);
					dispatch(
						userLoggedIn({
							userInfo: {user: result.data?.user},
							accessToken: result.data?.accessToken,
						})
					);
				} catch (error) {
					console.log(error);
				}
			},
		}),
		logout: builder.mutation({
			query: () => ({
				url: "/api/auth/logout",
				method: "POST",
			}),
		}),
		VerifyEmail: builder.query({
			query: (token) => `/api/auth/verify-email?token=${token}`
		}),
		findUser: builder.query({
			query: (username) => `/api/auth/finduser?username=${username}`
		})
	}),
});

export const {useLoginMutation, useRegisterMutation, useVerifyEmailQuery, useFindUserQuery} = authApi;