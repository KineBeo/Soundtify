import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { use } from "react";
import { LoginResponse } from "./authSlice";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl:
            'http://localhost:8000/'
    }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, { email: string, password: string }>({
            query: ({ email, password }) => ({
                url: '/authentication/login',
                method: 'POST',
                body: {
                    email,
                    password,
                },
            }),
        }),

        getAuthData: builder.query<LoginResponse, { token: string }>({
            query: ({ token }) => ({
                url: '/authentication/all-users',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        })
    }),
});

export const { useLoginMutation } = authApi;