import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginResponse, RegisterResponse } from "./authSlice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://soundtify.onrender.com",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; password: string }>(
      {
        query: ({ email, password }) => ({
          url: "/authentication/login",
          method: "POST",
          body: {
            email,
            password,
          },
        }),
      }
    ),
    register: builder.mutation<
      RegisterResponse,
      { email: string; name: string; password: string }
    >({
      query: ({ email, name, password }) => ({
        url: "/authentication/register",
        method: "POST",
        body: {
          email,
          name,
          password,
        },
      }),
    }),

    logout: builder.mutation<{ message: string }, string>({
      query: (email) => ({
        url: "/authentication/logout",
        method: "POST",
        body: { email },
      }),
    }),

    getAuthData: builder.query<LoginResponse, { token: string }>({
      query: ({ token }) => ({
        url: "/authentication/all-users",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  authApi;
