import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { baseUrl } from '../config';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/get/post',
      providesTags: ['Post'],
    }),
    getPost: builder.query({
      query: (slug) => `/get/post/${slug}`,
      providesTags: ['Post'],
    }),
    addPost: builder.mutation({
      query: (data) => ({
        url: '/create/post',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Post'],
    }),
    updatePost: builder.mutation({
      query: ({ data, slug }) => ({
        url: `/update/post/${slug}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Post'],
    }),
    deletePost: builder.mutation({
      query: (slug) => ({
        url: `/delete/post/${slug}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  util: { getRunningOperationPromises },
} = postApi;

// export endpoints for use in SSR
export const { getPosts, getPost } = postApi.endpoints;
