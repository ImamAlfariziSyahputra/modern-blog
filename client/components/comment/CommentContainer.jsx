import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAddCommentMutation } from '@/redux/apis/commentApi';
import CommentList from '@/components/comment/CommentList';
import CommentInput from '@/components/comment/CommentInput';

const defaultValues = {
  body: '',
};

export default function Comment({ postSlug, comments, replyComments }) {
  const methods = useForm({
    mode: 'all',
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const [activeComment, setActiveComment] = useState(null);

  const [addComment] = useAddCommentMutation();

  const handleComment = async (data) => {
    data.userId = '1';
    console.log('data => ', data);

    try {
      await addComment({ data, slug: postSlug }).unwrap();
      reset();
    } catch (err) {
      console.log('err => ', err.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <section className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-20 pb-2">
        <CommentInput
          name="body"
          handleSubmit={handleSubmit}
          onSubmit={handleComment}
          btnText="Comment"
        />

        {comments &&
          comments.map((comment) => (
            <CommentList
              key={comment.id}
              postSlug={postSlug}
              comment={comment}
              replyComments={replyComments}
              loggedInUserId={1}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
            />
          ))}
      </section>
    </FormProvider>
  );
}
