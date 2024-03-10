import { configureStore } from "@reduxjs/toolkit";
import albumPage from "./albumPage";

export const store = configureStore({
  reducer: {
    albumPage: albumPage,
  },
});
