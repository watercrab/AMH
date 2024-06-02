import { IUserDataProps } from "@/types/user/user.types";

import { apiSlice } from "../services/apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retrieveUser: builder.query<IUserDataProps, void>({
      query: () => ({ url: "/users/me/", withCredentials: true }),
    }),

    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/jwt/create/",
        method: "POST",
        body: { email, password },
        withCredentials: true,
      }),
    }),
    register: builder.mutation({
      query: ({
        firstName,
        lastName,
        email,
        phone,
        role,
        branch,
        totalHour,
        password,
        re_password,
      }) => ({
        url: "/users/",
        method: "POST",
        body: {
          firstName,
          lastName,
          email,
          phone,
          role,
          branch,
          totalHour,
          password,
          re_password,
        },
        withCredentials: true,
      }),
    }),
    verify: builder.mutation({
      query: () => ({
        url: "/jwt/verify/",
        method: "POST",
        withCredentials: true,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout/",
        method: "POST",
        withCredentials: true,
      }),
    }),
    resetPassword: builder.mutation({
      query: (email) => ({
        url: "/users/reset_password/",
        method: "POST",
        body: { email },
        withCredentials: true,
      }),
    }),
    resetPasswordConfirm: builder.mutation({
      query: ({ token, new_password, re_new_password }) => ({
        url: "/users/reset_password_confirm/",
        method: "POST",
        body: { token, new_password, re_new_password },
        withCredentials: true,
      }),
    }),
  }),
});

export const {
  useRetrieveUserQuery,
  useLoginMutation,
  useRegisterMutation,
  useVerifyMutation,
  useLogoutMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation,
} = authApiSlice;
