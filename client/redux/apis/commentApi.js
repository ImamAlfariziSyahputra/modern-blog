import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../config';

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Comment'],
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => '/get/comment',
      providesTags: ['Comment'],
    }),
    getCommentsByPost: builder.query({
      query: (slug) => `/get/comment-by-slug/${slug}`,
      providesTags: ['Comment'],
    }),
    getComment: builder.query({
      query: (id) => `/get/comment/${id}`,
      providesTags: ['Comment'],
    }),
    addComment: builder.mutation({
      query: ({ data, slug }) => ({
        url: `/create/comment/${slug}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Comment'],
    }),
    updateComment: builder.mutation({
      query: ({ data, id }) => ({
        url: `/update/comment/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Comment'],
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/delete/comment/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetCommentsQuery,
  useGetCommentsByPostQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
