import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Footer from '../components/layouts/Footer';
import Navbar from '../components/layouts/Navbar';
import PostDetail from '../components/post/PostDetail';
import { useGetPostQuery } from '@/redux/apis/postApi';
import { useGetCommentsByPostQuery } from '@/redux/apis/commentApi';
import LoadingBox from '@/components/box/LoadingBox';
import CommentContainer from '@/components/comment/CommentContainer';

export default function PostId() {
  const router = useRouter();
  const {
    query: { slug },
  } = router;

  const { data: post, isSuccess, isError, isLoading } = useGetPostQuery(slug);
  const commentApi = useGetCommentsByPostQuery(slug);
  const comments = commentApi.data?.comments;
  const replyComments = commentApi.data?.replyComments;
  // const [activeComment, setActiveComment] = useState(null);

  return (
    <div className="h-screen overflow-y-scroll bg-primary text-white">
      <Navbar />

      {isLoading ? <LoadingBox /> : null}
      {isError ? 'Error..' : null}
      {isSuccess && <PostDetail {...post} />}

      <CommentContainer
        postSlug={slug}
        comments={comments}
        replyComments={replyComments}
      />

      <Footer />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  // const {
  //   query: { id },
  // } = ctx;

  // const res = await fetch(`http://localhost:8000/posts/${id}`);
  // const post = await res.json();

  return {
    props: {
      post: [],
    },
  };
}
