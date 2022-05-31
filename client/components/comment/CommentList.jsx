import Image from 'next/image';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from '@/redux/apis/commentApi';
import CommentInput from './CommentInput';

const defaultValues = {
  body: '',
};

export default function Comment({
  comment,
  postSlug,
  replyComments,
  loggedInUserId,
  activeComment,
  setActiveComment,
  parentId = null,
}) {
  const methods = useForm({
    mode: 'all',
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  //! Reply only for Parent comment
  const canReply = Boolean(loggedInUserId); //? isAuthenticated?
  const canEdit = loggedInUserId === parseInt(comment.userId);
  const canDelete = loggedInUserId === parseInt(comment.userId);
  const isReplying =
    activeComment &&
    activeComment.type === 'replying' &&
    activeComment.id === parseInt(comment.id);
  const isEditing =
    activeComment &&
    activeComment.type === 'editing' &&
    activeComment.id === parseInt(comment.id);

  //! reply di parent pake "id" nya parent
  //! reply di child pake "parentId" nya child
  const replyId = parentId ? parentId : comment.id;

  const [addComment] = useAddCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const handleReply = async (data) => {
    data.userId = '1';
    data.parentId = replyId.toString();
    console.log('data => ', data);

    try {
      await addComment({ data, slug: postSlug }).unwrap();
      reset();
      setActiveComment(null);
    } catch (err) {
      console.log('err => ', err.data?.message);
    }
  };

  const handleEdit = async (data) => {
    console.log('data => ', data);

    try {
      await updateComment({ data, id: comment.id }).unwrap();
      reset();
      setActiveComment(null);
    } catch (err) {
      console.log('err => ', err.data?.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure to remove this comment?')) {
      try {
        await deleteComment(comment.id).unwrap();
      } catch (err) {
        console.log('err => ', err.data?.message);
      }
    }
  };

  return (
    <>
      {/* Comment */}
      <div className="flex mb-3 w-full">
        {/* PP */}
        <div className="">
          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
            <Image
              src="http://localhost:3000/_next/image?url=http%3A%2F%2Flocalhost%3A8080%2Fuploads%2Fposts%2FPost-1649831856574.jpeg&w=1920&q=75"
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        {/* Right Side */}
        <div className="w-full">
          <div className="flex items-center">
            <h1 className="text-lg mr-3">{comment.username}</h1>
            <span className="opacity-30">{comment.createdAt}</span>
          </div>
          {!isEditing && <div className="mb-1">{comment.body}</div>}
          <FormProvider {...methods}>
            {/* Edit Input */}
            {isEditing && (
              <CommentInput
                name="body"
                setValueEdit={comment.body}
                handleSubmit={handleSubmit}
                onSubmit={handleEdit}
                isEditing
                hasCancelBtn
                handleCancel={() => setActiveComment(null)}
                btnText="Update"
              />
            )}
          </FormProvider>
          <div className="flex items-center mb-2 opacity-60 space-x-3">
            {canReply && (
              <button
                onClick={() =>
                  setActiveComment({ id: comment.id, type: 'replying' })
                }
              >
                Reply
              </button>
            )}
            {canEdit && (
              <button
                onClick={() =>
                  setActiveComment({ id: comment.id, type: 'editing' })
                }
              >
                Edit
              </button>
            )}
            {canDelete && <button onClick={handleDelete}>Delete</button>}
          </div>
          <FormProvider {...methods}>
            {isReplying && (
              <CommentInput
                name="body"
                handleSubmit={handleSubmit}
                onSubmit={handleReply}
                hasCancelBtn
                handleCancel={() => setActiveComment(null)}
                btnText="Reply"
              />
            )}
          </FormProvider>
        </div>
      </div>

      {/* Reply Comment */}
      {replyComments.length > 0 &&
        replyComments.map(
          (reply) =>
            reply.parentId === comment.id && (
              <div className="ml-16" key={reply.id}>
                <Comment
                  postSlug={postSlug}
                  loggedInUserId={1}
                  comment={reply}
                  replyComments={[]}
                  parentId={comment.id}
                  activeComment={activeComment}
                  setActiveComment={setActiveComment}
                />
              </div>
            )
        )}
    </>
  );
}
