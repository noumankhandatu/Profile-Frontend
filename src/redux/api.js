import { createApi } from "@reduxjs/toolkit/query/react";
import AppURL from "./baseUrl";

export const NewyorkApi = createApi({
  reducerPath: "NewyorkApi",
  tagTypes: ["NewyorkApi"],
  baseQuery: AppURL,
  endpoints: (builder) => ({
    getAllAlert: builder.query({
      query: () => `/newyork-stories`,
      providesTags: ["NewyorkApi"],
    }),
    postTesting: builder.mutation({
      query: () => ({
        url: "/testing-backend",
        method: "POST",
        body: { testing: "test" },
      }),
      invalidatesTags: ["NewyorkApi"],
    }),
  }),
});

export const { useGetAllAlertQuery, usePostTestingMutation } = NewyorkApi;

export default NewyorkApi;
