import { configureStore } from "@reduxjs/toolkit";
import voteReducer from "features/votes/vote-slice/vote.slice";

export const store = configureStore({
  reducer: {
    vote: voteReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;