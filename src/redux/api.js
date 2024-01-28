import { createApi } from "@reduxjs/toolkit/query/react";
import api from "./baseUrl";

export const NewyorkApi = createApi({
  reducerPath: "NewyorkApi",
  tagTypes: ["NewyorkApi"],
  baseQuery: api,
  endpoints: (builder) => ({
    getAllAlert: builder.query({
      query: () => `/newyork-stories`,
      providesTags: ["NewyorkApi"],
    }),
  }),
});
export const { useGetAllAlertQuery } = NewyorkApi;

export default NewyorkApi;
