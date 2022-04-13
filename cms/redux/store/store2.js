import { configureStore } from '@reduxjs/toolkit';
import { postApi } from '../apis/postApi';

const middlewares = [];

const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...middlewares, postApi.middleware),
});

export default store;
