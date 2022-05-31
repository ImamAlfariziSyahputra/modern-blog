import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { postApi } from '../apis/postApi';
import { commentApi } from '../apis/commentApi';

const middlewares = [];

export const makeStore = () =>
  configureStore({
    reducer: {
      [postApi.reducerPath]: postApi.reducer,
      [commentApi.reducerPath]: commentApi.reducer,
    },
    middleware: (gDM) =>
      gDM().concat(...middlewares, postApi.middleware, commentApi.middleware),
  });

export const wrapper = createWrapper(makeStore);
