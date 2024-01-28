import { configureStore } from "@reduxjs/toolkit";
import NewyorkApi from "./api";

export const store = configureStore({
  reducer: {
    [NewyorkApi.reducerPath]: NewyorkApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(NewyorkApi.middleware),
});

export default store;
