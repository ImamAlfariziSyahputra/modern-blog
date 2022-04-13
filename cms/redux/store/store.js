import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { postApi } from '../apis/postApi';

const middlewares = [];

export const makeStore = () =>
  configureStore({
    reducer: {
      [postApi.reducerPath]: postApi.reducer,
    },
    middleware: (gDM) => gDM().concat(...middlewares, postApi.middleware),
  });

export const wrapper = createWrapper(makeStore);
